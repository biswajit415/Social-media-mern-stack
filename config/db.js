const mongoose=require('mongoose');
const config=require('config');
const db=config.get('mongoURI');

const connectDB=async ()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true ,
            useUnifiedTopology: true
        });
        
        console.log('Mongodb connected') 

    }
    catch(err){
        console.log(err.message);
        
    }
}

module.exports= connectDB;