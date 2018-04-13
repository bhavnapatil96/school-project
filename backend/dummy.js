app.post('/api/faculty/add',(req,res)=>{
    let pass=bcrypt.hashSync(req.body.password,10);
    let faculty=new faculty1({
        fullname:req.body.fullname,
        email:req.body.email,
        password:pass,
        qaulification:req.body.qaulification,
        doj:req.body.doj
    });
    faculty.save().then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
});
app.get('/api/faculty/list',(req,res)=>{
    faculty1.find({isDelete:true}).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
});
app.delete('/api/faculty/delete',(req,res)=>{
    faculty1.findByIdUpdate(req.body.id,{isDelete:false}).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
});
app.post('/api/faculty/login',(req,res)=>{
    faculty1.findOne({email:req.body.email}).then((data)=>{
        if(data){
            console.log('res1',data.password)
            if(bcrypt.compareSync(req.body.password,data.password))
            {
                let token= jwt.sign({email: data.email}, '123').toString()
                console.log('res',token)
                res.header('x-auth',token).send(data)
            }
            else{
                res.status(401).send('Invalid Email or Password')
            }

        }
        else{
            res.send('Invalid Email or Password')
        }
    }).catch((error)=>{
        res.send(error)
    })
});


app.post('/api/student/add',(req,res)=>{
    let pass=bcrypt.hashSync(req.body.password,10);
    let stud=new student({
        fullname:req.body.fullname,
        email:req.body.email,
        password:pass,
        photo:req.body.photo,
        gender:req.body.gender
    });
    stud.save().then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
});
app.get('/api/student/list',(req,res)=>{
    student.find({isDelete:true}).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
});
app.delete('/api/student/delete',(req,res)=>{
    student.findByIdUpdate(req.body.id,{isDelete:false}).then((data)=>{
        res.send(data)
    }).catch((error)=>{
        res.send(error)
    })
});
app.post('/api/student/login',(req,res)=>{
    student.findOne({email:req.body.email}).then((data)=>{
        if(data){
            console.log('res1',data.password)
            if(bcrypt.compareSync(req.body.password,data.password))
            {
                let token= jwt.sign({email: data.email}, '123').toString()
                console.log('res',token)
                res.header('x-auth',token).send(data)
            }
            else{
                res.status(401).send('Invalid Email or Password')
            }

        }
        else{
            res.send('Invalid Email or Password')
        }
    }).catch((error)=>{
        res.send(error)
    })
});