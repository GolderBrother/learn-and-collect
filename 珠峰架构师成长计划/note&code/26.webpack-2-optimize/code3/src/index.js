const getName = require('./base');
const getAge = require('./base2')
document.querySelector('#app').innerHTML = getName();
document.querySelector('#app2').innerHTML = getAge();
require('./index.css');