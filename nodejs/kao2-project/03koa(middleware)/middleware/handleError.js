const handleError = async (err,ctx) => {
    if(process.env.NODE_ENV !== "test"){
        // 将错误记录到日志中
        ctx.logger.error(err)
    }
}

module.exports = {
    handleError
}