function times(done, total) {
    let count = 0;
    return function() {
        if (++count == total) {
            done();
        }
    }
}

function d() {
    console.log('done');
}
let f = times(d, 4);
f();
f();
f();
f();