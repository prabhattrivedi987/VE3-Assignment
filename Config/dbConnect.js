const mongoose=require('mongoose');

const dbCoonect=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("database connected");
    } catch (error) {
        console.log('database not connected '+error.message);
    }
    
}
module.exports=dbCoonect();