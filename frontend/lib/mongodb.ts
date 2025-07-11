
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    // eslint-disable-next-line no-var
    var mongoose: any;
}

if( !MONGODB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null, promise:null};
}

async function dbConnect()
{
    if(cached.conn){
        return cached.conn;
    }


    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose)=>{
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
