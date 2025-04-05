from flask import Flask, request, Response
from twilio.twiml.voice_response import VoiceResponse, Gather
from langchain_groq import ChatGroq
from twilio.rest import Client
import os
from dotenv import load_dotenv
from virtual_tellecaller import get_response
from flask_cors import CORS

from flask import jsonify
import requests

# Initialize the Flask app
load_dotenv()
app = Flask(__name__)
CORS(app)

userdata = {}





TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TO_PHONE_NUMBER = os.getenv("TO_PHONE_NUMBER")

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

llm = ChatGroq(
    groq_api_key=os.getenv("GROQ_API_KEY"), model_name="llama-3.3-70b-versatile"
)

messages = [
    {
        "role": "system",
        "content": """
        You are a helpful AI assistant named NirmaBot who loves to help you with your queries.You can ask me anything and I will try my best to help you.""",
    }
]






#Define home route


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

        # print(f"Business Name: {business_name}")
        # print(f"Business Data: {business_data}") 
        # print(f"System Prompt: {system_prompt}")
        # print(f"Source Number: {source_Number}")
        # print(f"Destination Number: {destination_Number}")

        userdata["businessName"] = business_name
        userdata["businessInfo"] = business_data
        userdata["systemPrompt"] = system_prompt
        userdata["sourceNumber"] = source_Number
        userdata["destinationNumber"] = destination_Number


        return jsonify({"status": "success"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500






# Define the route for the voice endpoint
@app.route("/voice", methods=["POST"])
def voice():
    """Handles incoming voice calls from Twilio."""
    response = VoiceResponse()
    response.say(
        "Hi I am NirmaBot, please ask your query",
        language="en-US",
        voice="Polly.Matthew",
    )
    gather = Gather(
        input="speech",
        action="/process_voice",
        method="POST",
        language="en-US",
        speechTimeout="auto",
    )
    response.append(gather)
    return Response(str(response), content_type="text/xml")


@app.route("/process_voice", methods=["POST"])
def process_voice():
    """Processes the voice input from the user."""
    response = VoiceResponse()
    speech_text = request.form.get("SpeechResult", "")

    if not speech_text:
        response.say("I'm sorry, I didn't catch that. Please try again.")
        response.redirect("/voice")
        return Response(str(response), content_type="text/xml")

    print(f"User said: {speech_text}")

    # Get the response from the Groq API

    response.pause(length=5)
    ai_response = get_response(speech_text)
    res = ai_response["response"]
    print(f"AI Response: {res}")
    response.say(res, language="en-US", voice="Polly.Matthew")
    response.redirect("/voice")

    return Response(str(response), content_type="text/xml")





@app.route("/make_call", methods=["POST", "GET"])
def make_call():

    host = request.host

    """Initiate a call to the user's phone number."""



    source_number =userdata.get("sourceNumber")
    destination_number = userdata.get("destinationNumber")

    print(f"Host: {host}")
    print(f"Source Number: {source_number}")
    print(f"Destination Number: {destination_number}")


    try:
        call = client.calls.create(

        

            url="https://64bf-103-238-107-97.ngrok-free.app/voice",
            # url =f"https://{host}/voice",
            

            # to=TO_PHONE_NUMBER,
            # from_=TWILIO_PHONE_NUMBER,
            to=destination_number,
            from_=source_number,
        )

        print(f"Call initiated: {call.sid}")

        return "Call initiated successfully."

    except Exception as e:
        print(e)
        return "Failed to initiate the call."


if __name__ == "__main__":
    app.run(port=5000, debug=True)
