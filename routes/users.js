const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

module.exports = server => {

    server.get('/users/all', async (req, res, next) => {
        try{
            const user = await User.find({});
            res.send(user);
                next();
                }catch(err){
                    return next(new errors.InvalidContentError(err));
                }
            
            });

    //Register User
    server.post('/users/register', (req, res, next) => {
        const { name, email, password, city, level, phone, interests} = req.body;
        
        const user = new User({
            name,
            email,
            password,
            city,
            city,
            level,
            phone,
            interests
        });

        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(user.password, salt, async(err, hash)=>{

                //Hash Password

                user.password = hash;
                //Save User
                try{
                    const newUser = await user.save();
                    res.send(201);
                }catch(err){

                    return next(new errors.InternalError(err.message));
                }
            });
        });
        
    });
           //Get single User
    
            server.get('/users/:id', async (req, res, next) => {
                try{
                    const user = await User.findById(req.params.id);
                    res.send(user);
                        next();
                        }catch(err){
                            return next(new errors.ResourceNotFoundError(`There is no user with the id of ${req.id}`));
                        }
                    
                });

              //Update User
            server.put('/users/:id', async(req, res, next) => {
                if(!req.is('application/json'))
                {
                    return next(new errors.InvalidContentError("Expects 'application/json' "));
                }
                const {  
                    
                    name,
                    email,
                    city,
                    level,
                    phone,
                    interests 
                } = req.body;

                const user = new User({
                    name,
                    email,
                    city,
                    city,
                    level,
                    phone,
                    interests 
                });

                try{
                    const user = await User.findOneAndUpdate(
                        {_id: req.params.id },
                        req.body
                    );
                    res.send(201);
                    next();
                }catch(err) {
                    return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.id}`));
                }
            });

             //Delete User

            server.del('/users/:id', async (req, res, next) => {
                try {
                    const user = await User.findByIdAndRemove({ _id: req.params.id });
                    res.send(204);
                    next();
                }
                catch{
                    new errors.ResourceNotFoundError(
                        `There is no one witht that id`
                    )
                };
            })
}