
export default (req,res,next) => {
    console.log(`Req:${req.method} Url:${req.url} Timestamp:${ new Date().toLocaleTimeString()}`)
    next()
}
