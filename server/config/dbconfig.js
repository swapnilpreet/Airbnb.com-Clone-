const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const connections = mongoose.connection;

connections.on('connected',()=>{
    console.log('mongo Db connection successfully connected')
})

connections.on('error',(err)=>{
    console.log(`mongo error Db connection ${err}`)
})


module.exports = connections;