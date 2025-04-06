
from pymongo import MongoClient
import json
def save_data_to_mongo(business_name, business_data, system_prompt, source_Number, destination_Number):


    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["virtual_telecaller"]
        collection = db["user_data"]


        document = {
            "business_name": business_name,
            "business_data": business_data,
            "system_prompt": system_prompt,
            "source_number": source_Number,
            "destination_number": destination_Number
        }

        collection.insert_one(document)
        print("Data saved to MongoDB successfully.")
    except Exception as e:
        print(f"Error saving data to MongoDB: {e}")
    finally:
        client.close()



