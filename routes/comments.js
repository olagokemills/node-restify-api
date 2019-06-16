const errors = require('restify-errors');
const Comment = require('../models/Comments');


module.exports = server =>{
   
    server.get('/comments', async (req, res, next) => {
    try{
        const comment = await Comment.find({});
        res.send(comment);
            next();
            }catch(err){
                return next(new errors.InvalidContentError(err));
            }
        
        });

     
        //Get single Cusstomer

        server.get('/comments/:email', async (req, res, next) => {
            try{
                const comment = await Comment.find({"email":req.params.email});
                res.send(comment);
                    next();
                    }catch(err){
                        return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.id}`));
                    }
                
            });

    //Post Comment

    server.post('/comments', async(req, res, next) => {
        if(!req.is('application/json'))
        {
            return next(new errors.InvalidContentError("Expects 'application/json' "));
        }
        const { user_email, commenter_name, commenter_email, description } = req.body;
        const comment = new Comment({
            user_email,
            commenter_name,
            commenter_email,
            description
        });

        try{
            const newCommenter = await comment.save();
            res.send(201);
            next();
        }catch(err) {
            return next(new errors.InternalError(err.message));
        }
    });
};