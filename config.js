module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'HTTP://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mills:olufisayo@cluster0-shard-00-00-jqygf.mongodb.net:27017,cluster0-shard-00-01-jqygf.mongodb.net:27017,cluster0-shard-00-02-jqygf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=truemongodb://olagoke:olufisayo08@restify1-shard-00-00-rumqn.mongodb.net:27017,restify1-shard-00-01-rumqn.mongodb.net:27017,restify1-shard-00-02-rumqn.mongodb.net:27017/test?ssl=true&replicaSet=Restify1-shard-0&authSource=admin&retryWrites=true',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}