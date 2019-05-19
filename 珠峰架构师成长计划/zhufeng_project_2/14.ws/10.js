let b1 = Buffer.from('123');
let b2 = Buffer.alloc(6);
b2[0]=97;
b2[1]=98;
b2[2]=99;
b1.copy(b2,3);
console.log(b2.toString());