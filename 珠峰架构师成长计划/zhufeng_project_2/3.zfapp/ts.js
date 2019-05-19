let jQuery = {
    Callbacks() {
        let callBArr = [];

        function add(g) {
            callBArr.push(g)
        }

        function remove(g) {
            callBArr = callBArr.filter(item => item != g)
            console.log(888);
            console.log(callBArr === callBacks.callBArr);
            console.log(callBArr);
            console.log(callBacks.callBArr);

        }

        function fire() {
            callBArr.map(call => call())
        }
        return {
            add,
            remove,
            fire,
            callBArr
        }
    }
};
let callBacks = jQuery.Callbacks();
console.log(callBacks.callBArr.length);

let a = () => console.log('a');
let b = () => console.log('b');
let c = () => console.log('c');
callBacks.add(a)
console.log(callBacks.callBArr.length);

callBacks.add(b)
console.log(callBacks.callBArr.length);

callBacks.add(c)
console.log(callBacks.callBArr.length);

callBacks.remove(b)
console.log(callBacks.callBArr.length);


callBacks.fire()
// callBacks.callBArr.map(item=>item())
console.log(callBacks.callBArr.length);
