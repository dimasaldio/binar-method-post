let Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({
            message:'content can not be empty!'
        });
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender
    });

    // save user
    user
        .save(user)
        .then(data=>{
            // res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || 'Some error occured'
            });
        });
}

// retrieve and return all users
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    message:'user not found'
                })
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: 'error retrieving user'
            })
        })
    }else{
        Userdb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || 'Some error occured'
        })
    })
    }

    
    }

// update a new idetified user by user id
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({
           message:'Data to update can not be empty'
        })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{
        useFIndandModify:false
    })
    .then(data =>{
        if(!data){
            res.status(400).send({
                message: 'User not found'
            })
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:'error update user information'
        })
    })
}

// delete a user with specified user id
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message: 'cannot deleted'
            })
        }else{
            res.send({
             message:'user was success deleted'   
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message:'could not delete user'   
        })
    })
}

