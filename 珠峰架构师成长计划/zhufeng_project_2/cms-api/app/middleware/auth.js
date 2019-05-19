const jwt = require('jsonwebtoken');
module.exports = (options,app)=>{
   return async function(ctx,next){
      let authorization = ctx.get('authorization');
      if(authorization){
        let token = authorization.split(' ')[1];
        let user = await verify(token);
        if(user){
            await next();
        }else{
            ctx.status = 401;
            ctx.body = 'Not Allowed';
        }
      }  else{
        ctx.status = 401;
        ctx.body = 'Not Allowed';
    }
   }
}

function verify(token){
    return new Promise(function(resolve,reject){
        jwt.verify(token, 'zfpx', function(err, decoded) {
            if(err){
                reject(err);
            }else{
                resolve(decoded)
            }
        });
    })
}