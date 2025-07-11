import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({

    call_sid:{
        type:String,
        required:true
    },
    call_text:{
        type:String,
        required:true
    }
}
, {
    collection:"call_conversations",
}


);

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default Item;