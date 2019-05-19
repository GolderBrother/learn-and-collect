const less = require('less');
module.exports = function(source) {
    let css;
    less.render(source, (error, output) => {
        css = output.css;
    })
    return css.replace(/\n/g, '\\n', 'g')
}