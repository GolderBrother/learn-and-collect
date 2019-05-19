module.exports = {
    get isChrome(){
        let userAgent = this.get('User-Agent').toLowerCase();
        return userAgent.includes('chrome');
    }
}
