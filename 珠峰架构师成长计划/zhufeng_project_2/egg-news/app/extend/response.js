module.exports = {
    get isSuccess(){
        return this.status == 200;
    },
    get isNotFound(){
        return this.status == 404;
    },
    get isServerError(){
        return this.status == 500;
    }
}