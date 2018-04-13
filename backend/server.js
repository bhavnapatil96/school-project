let nodemailer=require('nodemailer')
let express = require('express');
let bodyParser = require('body-parser');
let bcrypt = require('bcryptjs')
let fileUpload = require('express-fileupload');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let token = '', userData = ''
let _ = require('lodash')
let conn = require('./config/conn')

let event = require('./models/events').event;
let users = require('./models/users').users;

let jwt = require('jsonwebtoken')
let app = express();

app.use(fileUpload());
app.use(express.static(__dirname + "/"));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(`Access-Control-Allow-Methods`, `*`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
})
//Passport Login......................
app.post('/api/users/loginp', passport.authenticate('local', {
    successRedirect: '/api/users/suc',
    failureRedirect: '/api/users/fail'
}));
app.get('/api/users/suc', (req, res) => {
    console.log('req.user===>', req.user);
    res.header('x-auth', token).send(userData)
});
app.get('/api/users/fail', (req, res) => {
    console.log("in fail");
    //res.send({"error":"failed"});
    res.status(401).send('Invalid Email or Password')
});
passport.serializeUser((user, done) => {
    console.log('serialize');
    return done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log('serialize');
    return done(null, user);
});
passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
        console.log('in passport', username, password);
        users.findOne({email: username}, (err, user) => {
            if (err) {
                console.log('in err');
                return done(err)
            }
            // User not found
            if (!user) {
                console.log("User Not Found.....");
                return done(null, false)
            }
            else {
                // console.log(user);
                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) {
                        return done(err)
                    }
                    if (!isValid) {
                        console.log("Invalid password.....");

                        return done(null, false)
                    }
                    else {

                        console.log("valid password.....");
                        console.log("User   : ", user);
                        userData = user
                        token = jwt.sign({email: user.email}, 'geet').toString()
                        console.log('res', token)

                        //token=user.tokens[0].token;
                        //console.log( "token   : ",token);
                    }
                    return done(null, user)
                });

            }

        })
    }
));
//..End Passport Login................
app.get('/', (res, resp) => {
    resp.sendFile(__dirname + '/');
});

function isLoggedIn(req, res, next) {
    let token = req.header('x-auth');
    users.findByToken(token).then((response) => {
        if (response) {
            next();
        }
        else {
            res.send("Invalid user");
        }
    }).catch(() => {
        res.send("User Is Invalid");
    })
}

app.post('/api/users/add', (req, res) => {
    console.log('add USer',req.body)
    users.findOne({email: req.body.email}).then((data) => {
        if (data) {
            res.send({'userexist': 'Email Already Register'})
        }
        else {
            let pass = bcrypt.hashSync(req.body.password, 10);
            let sampleFile = req.files.photo
            let filename = _.concat(req.body.email, '_', sampleFile.name);
            sampleFile.mv(__dirname + '/upload/' + filename)
            let user = new users({
                fullname: req.body.fullname,
                email: req.body.email,
                password: pass,
                photo: sampleFile.name,
                gender: req.body.gender,
                usertype: req.body.usertype
            });
            user.save().then((data) => {
                if(req.body.usertype==='faculty'){
                    nodemailer.createTestAccount((err, account) => {
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,
                            auth: {
                                user:'lanetteam.bhavna@gmail.com',
                                pass: 'lanetteam1'
                            }
                        });
                        let mailOptions = {
                            from: 'lanetteam.bhavna@gmail.com',
                            to: req.body.email,
                            subject:"Registration Password",
                            text:"Your password is="+ req.body.password,
                        };
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error)
                            }
                            console.log('Message sent: %s', info.messageId);
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            console.log("success")
                        });
                    });
                }
                res.send(data)
            }).catch((error) => {
                res.send(error)
            })
        }
    }).catch((error) => {

    })

});
app.get('/api/users/list', isLoggedIn, (req, res) => {
    users.find({isDelete: true}).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});
app.get('/api/student/list', (req, res) => {
    users.find({isDelete: true, usertype: 'student'}).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});
app.get('/api/faculty/list',isLoggedIn, (req, res) => {
    users.find({isDelete: true, usertype: 'faculty'}).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});
app.get('/api/faculty/count',isLoggedIn, (req, res) => {
    users.count({isDelete: true, usertype: 'faculty'}).then((data) => {
        console.log('count Faculty',data);
        res.send({data:data})
    }).catch((error) => {
        res.send(error)
    })
});
app.get('/api/student/count',isLoggedIn, (req, res) => {
    users.count({isDelete: true, usertype: 'student'}).then((data) => {
        console.log('count student',data);
        res.send({data:data})
    }).catch((error) => {
        res.send(error)
    })
});
app.get('/api/event/count',isLoggedIn, (req, res) => {
    event.count({isDelete: true}).then((data) => {
        console.log('count events',data);
        res.send({data:data})
    }).catch((error) => {
        res.send(error)
    })
});

app.delete('/api/users/delete', (req, res) => {
    users.findByIdUpdate(req.body.id, {isDelete: false}).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});
app.post('/api/users/login', (req, res) => {
    users.findOne({email: req.body.email}).then((data) => {
        if (data) {
            console.log('res1', data.password)
            if (bcrypt.compareSync(req.body.password, data.password)) {
                let token = jwt.sign({email: data.email}, 'geet').toString()
                console.log('res', token)
                res.header('x-auth', token).send(data)
            }
            else {
                res.status(401).send('Invalid Email or Password')
            }

        }
        else {
            res.send('Invalid Email or Password')
        }
    }).catch((error) => {
        res.send(error)
    })
});
app.post('/api/users/findByEmail', isLoggedIn, (req, res) => {
    users.findOne({email: req.body.email}).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});

app.post('/api/events/add',isLoggedIn, (req, res) => {
    console.log("Body", req.body.fullname);
    let eve = new event({
        name: req.body.name,
        date: req.body.date,
        organizer: req.body.organizer
    });
    eve.save().then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});
app.get('/api/events/list', (req, res) => {
    console.log("Body", req.headers['x-auth']);

    event.find({isDelete: true}).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});
app.delete('/api/events/delete', isLoggedIn, (req, res) => {

    event.findByIdAndUpdate(req.body.id, {$set: {isDelete: false}}).then((data) => {
        res.send(data)
    }).catch((error) => {
        res.send(error)
    })
});
app.post('/api/events/update', isLoggedIn, (req, res) => {

    // let body=_.pick(req.body,['id','name','date','organizer']);

    event.findById(req.body.id).then((data) => {
        data.name = req.body.name,
        data.date = req.body.date,
        data.organizer = req.body.organizer
        data.save().then((event) => {
            console.log('res....', event)
            res.send(event)
        }).catch(() => {
            res.status(404).send();
        })
        //     if (!data) {
        //         console.log(req.body.id, `Id Not Found`);
        //
        //     }
        //     else {
        //
        //         res.send(data)
        //     }
        }).catch((error) => {
            res.send(error)
        })
    });
    app.listen(5000, () => {
        console.log('Server is Running on 5000')
    })