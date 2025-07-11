


import dbConnect from "@/lib/mongodb";
import  Item from "@/models/Item"

export async function GET(){
    try{

        await dbConnect();
        const items = await Item.find({}).lean()
        // console.log("Fetched Items:", items);

        return new Response(JSON.stringify(items),{
            status:200,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }
    catch(error){
        return new Response(JSON.stringify({error:"Failed to fetch data"}),{
            status:500,
            headers:{
                "Content-Type":"application/json"
            }
        })
    }
}