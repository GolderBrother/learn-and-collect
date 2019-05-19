const {Tapable, SyncHook} = require("tapable");
const t = new Tapable();
t.hooks = {
    myHooks : SyncHook
}
let called = 0;
t.plugin('my-hook', () => called++);
t.hooks.myHooks.call();
t.plugin('my-hook', () => called += 10);
t.hooks.myHooks.call();
console.log(called);