from flask import Flask, request, Response
from twilio.twiml.voice_response import VoiceResponse, Gather
from langchain_groq import ChatGroq
from twilio.rest import Client
import os
from dotenv import load_dotenv
from virtual_tellecaller import  generate_output 
from flask_cors import CORS
from urllib.parse import quote_plus

from flask import jsonify

# Initialize the Flask app
load_dotenv()
app = Flask(__name__)
CORS(app)


userdata = {}

# just start the langgraph code by calling the function and then call the function in the main function

ai_response = generate_output("","")




TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TO_PHONE_NUMBER = os.getenv("TO_PHONE_NUMBER")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"), model_name="llama-3.1-8b-instant"
)

exit_words = ["bye", "goodbye", "see you later", "thank you", "byebye", "thank you for your time", "thanks", "thank you for having a conversation with me", "thank you for your help", "thank you for your assistance", "thank you for your support", "thank you for your time and assistance", "thank you for your time and support"]

messages = [
    {
        "role": "system",
        "content": """
        You are a helpful AI assistant named NirmaBot who loves to help you with your queries.You can ask me anything and I will try my best to help you.""",
    }
]

# Define the list of phone numbers to call




call_queue = []

with open("data/rag_data.txt", "r", encoding="utf-8", errors="ignore") as f:
    business_data = f.read()


intro = llm.invoke(f"""
You are an AI advertiser who generate a catchy introduction for a business based on the   and business data{business_data}.The introduction should be short and catchy should describe the business and its services in a few lines.At last just ask the user for specific query related to the business. Answer in a friendly tone and make it sound like a real person. Answer should be in a single line and should not contain any new line or bullet points it should be 40-50 words long.
""")


intro = intro.content





@app.route("/",methods=["GET"])
def home():
    """Handles home page UI"""
    return "Welcome to the Nirma bot your AI-powered Tellecaller"


@app.route("/information", methods=["POST"])
def information():
    # give correct host url to frontend
    
    try:
        data = request.get_json(force=True) # Get JSON data from the request
        # print(data)

        business_name = data.get("businessName")
        business_data = data.get("businessInfo")
        system_prompt = data.get("systemPrompt")
        source_Number = data.get("sourceNumber")
        destination_Number = data.get("destinationNumber")
        # first create empty file and then write to it


      


        
        with open("data/rag_data.txt","w", encoding="utf-8", errors="ignore") as f:
            f.write(business_data)

        with open("data/system_prompt.txt","w", encoding="utf-8", errors="ignore") as f:
            f.write(system_prompt)

        if destination_Number:

            destination_Number = destination_Number.strip() # Remove leading and trailing spaces
            destination_Number = destination_Number.split(" ")
            call_queue.extend(destination_Number)
            print(call_queue)

        userdata["businessName"] = business_name
        userdata["businessInfo"] = business_data
        userdata["systemPrompt"] = system_prompt
        userdata["sourceNumber"] = source_Number

        return jsonify({"status": "success"}), 200
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/voice", methods=["POST"])
def voice():
   
    print("intro ",intro)
    """Handles incoming voice calls from Twilio."""

    response = VoiceResponse()
    
    response.say(

        intro,
        language="en-US",
        voice="Polly.Matthew",
    )
    gather = Gather(
        input="speech",
        action="/process_voice",
        method="POST",
        language="en-US",
        speechTimeout="auto",
        actionOnEmptyResult=True,
    )
    response.append(gather)

    return Response(str(response), content_type="text/xml")




@app.route("/process_voice", methods=["POST"])
def process_voice():


    business_name = userdata.get("businessName")

    """Processes the voice input from the user."""
    response = VoiceResponse()
    speech_text = request.form.get("SpeechResult", "").strip()

    if not speech_text:
        response.say("I'm sorry, I didn't catch that. Please try again.")
        # response.redirect("/voice")

        gather =Gather(
            input="speech",
            action="/process_voice",
            method="POST",
            language="en-US",
            speechTimeout="auto",
            actionOnEmptyResult =True,
        )
        response.append(gather)

        return Response(str(response), content_type="text/xml")

    print(f"User said: {speech_text}")


    # if any ending word is detected, end the call


    if any(word in speech_text.lower() for word in exit_words):
        response.say("Thank you for having a conversation with me." , language="en-US", voice="Polly.Matthew")
        response.hangup()
        return Response(str(response), content_type="text/xml")

    # ai_response = get_response(business_name, speech_text, business_info, system_prompt)

    #pause for 15 seconds to get the response from the AI model
    response.pause(length=6)
    ai_response = generate_output(business_name,speech_text)

    if not ai_response or ai_response["response"] == "":
        response.say("Thank you for having a conversation with me.", language="en-US", voice="Polly.Matthew")
        response.hangup()

        return Response(str(response), content_type="text/xml")

    res = ai_response["response"]
    print(f"AI Response: {res}")


    response.say(res, language="en-US", voice="Polly.Matthew")
    # response.redirect("/voice")

    gather = Gather(
        input="speech",
        action ="/process_voice",
        method="POST",
        language="en-US",
        speechTimeout="auto",
        actionOnEmptyResult=True,
    )
    response.append(gather)

    response.pause(length=6)

    return Response(str(response), content_type="text/xml")



@app.route("/make_call", methods=["POST", "GET"])
def make_call():

    host = request.host

    """Initiate a call to the user's phone number."""



    source_number =userdata.get("sourceNumber")


    print(f"Host: {host}")
    print(f"Source Number: {source_number}")



    try:
        call = client.calls.create(

        

            url="https://7a4c-103-238-107-97.ngrok-free.app/voice",
            # url =f"https://{host}/voice",
            # to=TO_PHONE_NUMBER,
            from_=TWILIO_PHONE_NUMBER,
            # from_=source_number,
            # to=destination_number,
            to= call_queue[0],
            status_callback=f"https://7a4c-103-238-107-97.ngrok-free.app/call_status",
            status_callback_event=["completed"],
            status_callback_method="POST",
            
        )

        print(f"Call initiated: {call.sid}")

        return "Call initiated successfully."

    except Exception as e:
        print(e)
        return "Failed to initiate the call."
    

@app.route("/call_status", methods=["POST"])
def call_status():

    print("Call Complete checking next call in queue")

    if call_queue:
        next_number = call_queue.pop(0)
        

        client.calls.create(
            url= "https://64bf-103-238-107-97.ngrok-free.app/voice",

            # url=f"https://{request.host}/voice",
            to=next_number,
            from_=TWILIO_PHONE_NUMBER,
            status_callback=f"https://64bf-103-238-107-97.ngrok-free.app/call_status",
            status_callback_event=["completed"],
            status_callback_method="POST"
        )
        print(f"Next call initiated to: {next_number}")
    else:
        print("No more numbers in the queue.")
    
    return ("All calls completed", 200)

if __name__ == "__main__":
    app.run(port=5000, debug=False, use_reloader=False)
