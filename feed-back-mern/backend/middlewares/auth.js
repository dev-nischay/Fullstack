import jwt from "jsonwebtoken";
let secret = process.env.JWT_SECRET;

const Verify = (token) => {
    return new Promise(resolve,reject => {
        jwt.verify(token,secret,(err,decoded) => {
            err ? reject(err) : resolve(decoded)
        })
    })

    
}


export default async(req,res,next) => {
    const  authHeader = req.headers.authorization;
    console.log(authHeader)

    const  token = authHeader.split(" ")[1];
    console.log(token)
    try{
        let decode = jwt.verify(token,secret);
        req.userId = decode.id
        next()
    } catch (error) {
      res.status(401).json({error:"Token Invalid"})  
    }
}


