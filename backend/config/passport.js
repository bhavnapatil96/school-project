var LocalStrategy=require("passport-local").Strategy;
const bcrypt=require('bcryptjs');
const {con}=require('./conn');
const jwt=require('jsonwebtoken');
//checking for security through passport strategy
module.exports=(passport)=>{
    passport.serializeUser((user,done)=>{
            console.log("In serialize ==>", user.token);
            return done(null,user.token);
    });
    passport.deserializeUser((user,done)=>{
        return done(null,user);
    });
    passport.use('local',new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },(email,password,done)=>{
        console.log("username", email,password);
        let query="select count(*) as cnt from user where email=?";
        query=mysql.format(query,email);
        con.query(query,(err,result)=>{
            if(result[0].cnt>0){
                let qry="select *  from user where email=?";
                qry=mysql.format(qry,email);
                con.query(qry,(err,result)=>{
                    if(bcrypt.compareSync(password,result[0].password)){
                        token= jwt.sign({ email: result[0].email}, 'token').toString();
                        obj=result[0];
                        obj.token=token;
                        console.log("User Obj", obj);
                        return done(null,obj);
                    }
                    else
                    {
                        return done(null,false)
                    }
                });
            }
            else{
               return done(null,false);
            }
        })
    }))
};