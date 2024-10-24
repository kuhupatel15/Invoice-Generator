import mongoose from 'mongoose';
import { env_config } from './env-config';

export const connectDB = async ()=> {
    try{
        await mongoose.connect(env_config.mongodb_url!);
        console.log('MongoDb Connected');   
    }
    catch(err){
        console.log(err)
    }
}