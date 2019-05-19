export default function createSagaMiddleware(){
    function createChannel(){
        let events={};
        function subscribe(actionType,listener){
            events[actionType]=listener;
        }
        function publish(action){
           let listener = events[action.type];
           if(listener){
              delete events[action.type];
              listener(action);
           }
        }
        return {subscribe,publish}
    }
    let channel = createChannel();
    function times(done, total) {
        let count = 0;
        return function() {
            if (++count == total) {
                done();
            }
        }
    }
    function sagaMiddleware(store){
        function run(generator,finish){
            //执行生成器，得到迭代器
            let it = typeof generator == 'function'?generator():generator;
            function next(action){
                let {value:effect,done} = it.next(action);
                if(!done){
                    if(typeof effect[Symbol.iterator]=='function'){
                        run(effect);
                        next();
                    }else if(effect.then){
                        effect.then(next);
                    }else{
                        switch(effect.type){
                            case 'take'://订阅某个动作类型
                                channel.subscribe(effect.actionType,next);
                                break;
                            case 'put':
                                store.dispatch(effect.action);
                                next();
                                break;
                            case 'fork':
                                run(effect.task);
                                next();
                                break;
                            case 'call':
                                effect.fn(...effect.args).then(next);
                                break;
                            case 'all':
                                let final = times(next, effect.fns.length);
                                effect.fns.forEach(fn=>run(fn,final));
                                break;    
                            default:
                                break;    
                      }
                    }
                }else{
                    finish&&finish();
                }
            }
            next();
        }
        sagaMiddleware.run = run;
        return function(next){
            return function(action){//store.dispatch(action)
                channel.publish(action);//派发action
                next(action);
            }
        }
    }
    return sagaMiddleware;
}