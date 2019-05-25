��һ����ǳ˵ JavaScript ���¼�ѭ��
ע����ƪ�������л���Ϊ��ǰ���°汾�Ĺȸ��������72.0.3626.109��

�����������һ���й��¼�ѭ����ǰ�������⣺

//��д���������
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');


/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```
�������Ҫ��������¼�ѭ���к���ִ��˳������⣬���а���async ��await��setTimeout��Promise������������˵һ�±������漰����֪ʶ�㡣

�������
����������Ҫ�������¼������飺

JS��Ϊͬ��������첽����
ͬ�����������߳���ִ�У��γ�һ��ִ��ջ
���߳�֮�⣬�¼������̹߳�����һ��������У�ֻҪ�첽�����������н���������������֮�з���һ���¼���
һ��ִ��ջ�е�����ͬ������ִ����ϣ���ʱJS������У���ϵͳ�ͻ��ȡ������У��������е��첽������ӵ���ִ��ջ�У���ʼִ�С�
���ݹ淶���¼�ѭ����ͨ��������еĻ���������Э���ġ�һ�� Event Loop �У�������һ�����߶���������(task queue)��һ��������б���һϵ����������(task)�ļ��ϣ�ÿ��������һ������Դ(task source)��Դ��ͬһ������Դ�� task ����ŵ�ͬһ��������У��Ӳ�ͬԴ��������ӵ���ͬ���С� setTimeout/Promise ��API��������Դ��������������е�������ָ���ľ���ִ������

�������

������
(macro)task���ֳ�֮Ϊ�����񣩣����������ÿ��ִ��ջִ�еĴ������һ�������񣨰���ÿ�δ��¼������л�ȡһ���¼��ص����ŵ�ִ��ջ��ִ�У���

�����Ϊ���ܹ�ʹ��JS�ڲ�(macro)task��DOM�����ܹ������ִ�У�����һ��(macro)taskִ�н���������һ��(macro)task ִ�п�ʼǰ����ҳ�����������Ⱦ���������£�

(macro)task->��Ⱦ->(macro)task->...
(macro)task��Ҫ������script(�������)��setTimeout��setInterval��I/O��UI�����¼���postMessage��MessageChannel��setImmediate(Node.js ����)

΢����
microtask���ֳ�Ϊ΢���񣩣�����������ڵ�ǰ task ִ�н���������ִ�е�����Ҳ����˵���ڵ�ǰtask�������һ��task֮ǰ������Ⱦ֮ǰ��

����������Ӧ�ٶ����setTimeout��setTimeout��task������죬��Ϊ�������Ⱦ��Ҳ����˵����ĳһ��macrotaskִ����󣬾ͻὫ����ִ���ڼ����������microtask��ִ����ϣ�����Ⱦǰ����

microtask��Ҫ������Promise.then��MutaionObserver��process.nextTick(Node.js ����)

���л���
���¼�ѭ���У�ÿ����һ��ѭ��������Ϊ tick��ÿһ�� tick ��������ģ���ǱȽϸ��ӵģ����ؼ��������£�

ִ��һ��������ջ��û�оʹ��¼������л�ȡ��
ִ�й������������΢���񣬾ͽ�����ӵ�΢��������������
������ִ����Ϻ�����ִ�е�ǰ΢��������е�����΢��������ִ�У�
��ǰ������ִ����ϣ���ʼ�����Ⱦ��Ȼ��GUI�߳̽ӹ���Ⱦ
��Ⱦ��Ϻ�JS�̼߳����ӹܣ���ʼ��һ�������񣨴��¼������л�ȡ��
����ͼ���£�

mark

Promise��async�е�����ִ��
����֪��Promise�е��첽������then��catch�У�����д��Promise�еĴ����Ǳ�����ͬ����������ִ�еġ�����async/await�У��ڳ���await����֮ǰ�����еĴ���Ҳ������ִ�еġ���ô������awaitʱ������ʲô�أ�

await����ʲô
��������˼�Ͽ�await���ǵȴ���await �ȴ�����һ�����ʽ��������ʽ�ķ���ֵ������һ��promise����Ҳ����������ֵ��

�ܶ�����Ϊawait��һֱ�ȴ�֮��ı��ʽִ����֮��Ż����ִ�к���Ĵ��룬ʵ����await��һ���ó��̵߳ı�־��await����ı��ʽ����ִ��һ�飬��await����Ĵ�����뵽microtask�У�Ȼ��ͻ���������async������ִ�к���Ĵ��롣


������Ϊasync await �������promise+generator���﷨�ǡ�����await����Ĵ�����microtask�����Զ��ڱ����е�

```
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
�ȼ���

async function async1() {
	console.log('async1 start');
	Promise.resolve(async2()).then(() => {
                console.log('async1 end');
        })
}
```
�ص�����
���Ͼͱ������漰�����������֪ʶ���ˣ����������ٻص��������һ��һ��������ô���¶���

���ȣ��¼�ѭ���Ӻ�����(macrotask)���п�ʼ�����ʱ�򣬺���������У�ֻ��һ��script(�������)���񣻵���������Դ(task source)ʱ������ȷַ����񵽶�Ӧ�����������ȥ�����ԣ��������ӵĵ�һ��ִ������ͼ��ʾ��



Ȼ�����ǿ������ȶ���������async�������������¿���Ȼ�������� console ��䣬ֱ����� script start�����֮��script �����������ִ�У����� setTimeout������Ϊһ��������Դ������Ƚ�������ַ�����Ӧ�Ķ����У�



script �����������ִ�У�ִ����async1()������ǰ�潲��async��������await֮ǰ�Ĵ���������ִ�еģ����Ի��������async1 start��

������awaitʱ���Ὣawait����ı��ʽִ��һ�飬���Ծͽ��������async2��Ȼ��await����Ĵ���Ҳ����console.log('async1 end')���뵽microtask�е�Promise�����У���������async1������ִ�к���Ĵ��롣



script�����������ִ�У�����Promiseʵ��������Promise�еĺ���������ִ�еģ��������� .then ��ᱻ�ַ��� microtask �� Promise ������ȥ�����Ի������ promise1��Ȼ��ִ�� resolve���� promise2 ���䵽��Ӧ���С�



script�����������ִ�У����ֻ��һ������� script end�����ˣ�ȫ�������ִ������ˡ�

����������ÿ��ִ����һ��������֮�󣬻�ȥ����Ƿ���� Microtasks������У���ִ�� Microtasks ֱ����� Microtask Queue��

�����script����ִ�����֮�󣬿�ʼ�������΢������С���ʱ��΢�����У� Promise �����е���������async1 end��promise2����˰��Ⱥ�˳����� async1 end��promise2�������е� Microtasks ִ�����֮�󣬱�ʾ��һ�ֵ�ѭ���ͽ����ˡ�

�ڶ���ѭ����ʼ�����ʱ��ͻ�����async1������ִ�к���Ĵ��룬Ȼ��������ͬ������ console ��䣬ֱ����� async1 end�������ڶ��ֵ�ѭ���ͽ����ˡ���Ҳ�������Ϊ�����뵽script��������У����Ի�����setTimeout����ִ�У�

�ڶ���ѭ�����ɴӺ�������п�ʼ����ʱ��������ֻ��һ�� setTimeout��ȡ��ֱ��������ɣ������������̽�����

�����һ�ı�һ�´���������ӡ��

��ʽһ
�ڵ�һ����ʽ���ҽ�async2�еĺ���Ҳ�����Promise�������������£�

```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    //async2�������¸��ģ�
    new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
    });
}
console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();

new Promise(function(resolve) {
    console.log('promise3');
    resolve();
}).then(function() {
    console.log('promise4');
});

console.log('script end');
```
�������Լ��������˳�����ʲô�����������������

```
script start
async1 start
promise1
promise3
script end
promise2
async1 end
promise4
setTimeout
```
�ڵ�һ��macrotaskִ����֮��Ҳ�������script end֮�󣬻�ȥ��������microtask�����Ի�������promise2�� async1 end ��promise4�����಻�ٶ�˵��

��ʽ��
�ڵڶ�����ʽ�У��ҽ�async1��await����Ĵ����async2�Ĵ��붼��Ϊ�첽�ģ��������£�

```
async function async1() {
    console.log('async1 start');
    await async2();
    //�������£�
    setTimeout(function() {
        console.log('setTimeout1')
    },0)
}
async function async2() {
    //�������£�
	setTimeout(function() {
		console.log('setTimeout2')
	},0)
}
console.log('script start');

setTimeout(function() {
    console.log('setTimeout3');
}, 0)
async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```
�������Լ��������˳�����ʲô�����������������

```
script start
async1 start
promise1
script end
promise2
setTimeout3
setTimeout2
setTimeout1
```
�����Ϊpromise2֮�󣬽������ᰴ�ռ���setTimeout���е�˳�������������ͨ���������ǿ��Կ�������˳��Ϊ3 2 1�����Իᰴ3��2��1��˳���������

��ʽ��
��ʽ��������һƪ�澭�п�����ԭ�⣬������˵��ͬС�죬�������£�

```
async function a1 () {
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2 () {
    console.log('a2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
    console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
    resolve('promise2.then')
    console.log('promise2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('promise3')
    })
})
console.log('script end')
```
�޷�����΢�����ǿ���������£�ǰ�����������㶼�����˵Ļ������һ��û����ģ�������£�

```
script start
a1 start
a2
promise2
script end
promise1
a1 end
promise2.then
promise3
setTimeout
```


// ����ͷ��������
```
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```
��Ŀ�ı��ʣ����ǿ���setTimeout��promise��async await��ʵ�ּ�ִ��˳���Լ�JS���¼�ѭ����������⡣

�𰸣�

script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
�����漰��Microtasks��Macrotasks��event loop �Լ�JS���첽���л��ơ�

һ��event loop
JS���̲߳��ϵ�ѭ�������Ĵ���������ж�ȡ����ִ�������������л��Ƴ�Ϊ�¼�ѭ����event loop����

����Microtasks��Macrotasks
Microtasks��Macrotasks���첽�����һ�����ͣ�Microtasks�����ȼ�Ҫ����Macrotasks��������������������api��

microtasks
process.nextTick
promise
Object.observe (����)
MutationObserver
macrotasks
setTimeout
setImmerdiate
setInterval
I/O
UI ��Ⱦ
ע�⣺

ÿһ�� event loop ����һ�� microtask queue
ÿ�� event loop ����һ������macrotaks queue ( Ҳ���Գ�Ϊtask queue )
һ������ task ���Է��� macrotask queue Ҳ���Է��� microtask queue��
ÿһ��event loop��������ִ�� microtask queue�� ִ����ɺ󣬻���ȡ macrotask queue ��һ��������� microtask queue�� ���ż���ִ��microtask queue������ִ����ȥֱ����������ִ�н�����
�����첽���л���
������֪�� JS �ǵ��̵߳ģ�����Ϊʲô�����https://blog.csdn.net/lunahaijiao/article/details/85329510��

���濴һ�����ӣ�

// 1. ��ʼִ��
console.log(1)	// 	2. ��ӡ 1
setTimeout(function () {	// 6. ������� 0ms �󣬽��ú��������������
    console.log(2)	// 7. ��ӡ 2
    Promise.resolve(1).then(function () {	// 8. �� resolve(1) �����������  9. �� function���������������
        cosole.log('ok')	// 10. ��ӡ ok
    })
})	// 3.���� setTimeout ����������������ɺ�ִ�еĻص�����
setTimeout(function (){		// 11. ����� 0ms �󣬽��ú��������������
    console.log(3)	// 12. ��ӡ 3
})  // 4. ���� setTimeout ����������������ɺ�ִ�еĻص�����
// 5. ���߳�ִ��ջ��գ���ʼ��ȡ ������� �е�����
// output�� 1  2 ok 3
JS ���߳�ӵ��һ�� ִ��ջ��ͬ������ �� һ�� ������У�microtasks queue�������̻߳�����ִ�д��룬

������������ͬ����ʱ�����Ƚ�������ջ���������н������ٽ��ú�����ջ��
������task�����첽��ʱ����Щ task �᷵��һ��ֵ�������̲߳��ڴ�������ʹ���̼߳���ִ����ȥ����������task���񽫽��� ������ں� ִ�У�������ں�ִ�н����󣬻Ὣ���������ȶ���õĻص�����������Ӧ��**������У�microtasks queue/ macrotasks queue��**�С�
��JS���߳����ִ��ջ֮�󣬻ᰴ�����ȳ���˳���ȡmicrotasks queue�еĻص������������ú�����ջ����������ִ��ջ��ֱ�����ִ��ջ����ȥ��ȡ������С�
��microtasks queue�е�����ִ����ɺ󣬻���ȡ macrotask queue ��һ��������� microtask queue�� ���ż���ִ��microtask queue������ִ����ȥֱ����������ִ�н�����
����� JS���첽ִ�л���

�ġ�async await��Promise��setTimeout
1.setTimeout

```
console.log('script start')	//1. ��ӡ script start
setTimeout(function(){
    console.log('settimeout')	// 4. ��ӡ settimeout
})	// 2. ���� setTimeout ����������������ɺ�ִ�еĻص�����
console.log('script end')	//3. ��ӡ script start
// ���˳��script start->script end->settimeout
```
2.Promise

Promise������ͬ��������ִ�к����� ����executor��ִ��resolve����reject��ʱ��, ��ʱ���첽������ ����ִ��then/catch�ȣ�����ջ��ɺ󣬲Ż�ȥ����resolve/reject�д�ŵķ���ִ�У���ӡp��ʱ���Ǵ�ӡ�ķ��ؽ����һ��Promiseʵ����

```
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// ���˳��: script start->promise1->promise1 end->script end->promise2->settimeout
```
��JS���߳�ִ�е�Promise����ʱ��

promise1.then() �Ļص�����һ�� task

promise1 �� resolved��rejected: ����� task �ͻ���뵱ǰ�¼�ѭ���غϵ� microtask queue

promise1 �� pending: ��� task �ͻ���� �¼�ѭ����δ����ĳ��(������һ��)�غϵ� microtask queue ��

setTimeout �Ļص�Ҳ�Ǹ� task �����ᱻ���� macrotask queue ��ʹ�� 0ms �����

3.async await
```
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')
// ���˳��script start->async1 start->async2->script end->async1 end
```

async ��������һ�� Promise ���󣬵�����ִ�е�ʱ��һ������ await �ͻ��ȷ��أ��ȵ��������첽������ɣ���ִ�к������ں������䡣�������Ϊ�����ó����̣߳������� async �����塣

�ٸ����ӣ�

```
async function func1() {
    return 1
}
```

console.log(func1())
���������ͼƬ����
����Ȼ��func1�����н����ʵ����һ��Promise�����������Ҳ����ʹ��then����������߼���

func1().then(res => {
    console.log(res);  // 30
})
await�ĺ���Ϊ�ȴ���Ҳ���� async ������Ҫ�ȴ�await��ĺ���ִ����ɲ������˷��ؽ����Promise����֮�󣬲��ܼ���ִ������Ĵ��롣awaitͨ������һ��Promise������ʵ��ͬ����Ч����
