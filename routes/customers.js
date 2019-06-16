const errors = require('restify-errors');
const Customer = require('../models/Customers');


module.exports = server =>{
   
    server.get('/customers/all', async (req, res, next) => {
    try{
        const customer = await Customer.find({});
        res.send(customer);
            next();
            }catch(err){
                return next(new errors.InvalidContentError(err));
            }
        
        });

        //Get single Cusstomer

        server.get('/customers/:id', async (req, res, next) => {
            try{
                const customer = await Customer.findById(req.params.id);
                res.send(customer);
                    next();
                    }catch(err){
                        return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.id}`));
                    }
                
            });

            //Insert Customer

    server.post('/customers', async(req, res, next) => {
        if(!req.is('application/json'))
        {
            return next(new errors.InvalidContentError("Expects 'application/json' "));
        }
        const { name, email, balance } = req.body;
        const customer = new Customer({
            name,
            email,
            balance
        });

        try{
            const newCustomer = await customer.save();
            res.send(201);
            next();
        }catch(err) {
            return next(new errors.InternalError(err.message));
        }
    });

    //Update Cutomer
    server.put('/customers/:id', async(req, res, next) => {
        if(!req.is('application/json'))
        {
            return next(new errors.InvalidContentError("Expects 'application/json' "));
        }
        const { name, email, balance } = req.body;
        const customer = new Customer({
            name,
            email,
            balance
        });

        try{
            const customer = await Customer.findOneAndUpdate(
                {_id: req.params.id },
                req.body
            );
            res.send(201);
            next();
        }catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.id}`));
        }
    });

    //Delete Customer

    server.del('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findByIdAndRemove({ _id: req.params.id });
            res.send(204);
            next();
        }
        catch{
            new errors.ResourceNotFoundError(
                `There is no one witht that id`
            )
        };
    })
};