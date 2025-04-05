import asyncio
import os
from dotenv import load_dotenv
from deepgram import (
    DeepgramClient,
    DeepgramClientOptions,
    LiveTranscriptionEvents,
    LiveOptions,
    Microphone,
)

# Load environment variables
load_dotenv()
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")  # Ensure this is set in your .env file

class TranscriptCollector:
    def __init__(self):
        self.transcript = ""

    def reset(self):
        self.transcript = ""

    def add(self, text):
        self.transcript += f" {text}".strip()

    def get(self):
        return self.transcript

async def get_transcript():
    try:
        if not DEEPGRAM_API_KEY:
            print("Error: Deepgram API key is missing!")
            return

        deepgram = DeepgramClient(DEEPGRAM_API_KEY, DeepgramClientOptions(options={"keepalive": "true"}))
        dg_connection = deepgram.listen.asyncwebsocket.v("1")

        collector = TranscriptCollector()

        async def on_message(self, result, **kwargs):  # FIXED: Added `self`
            if text := result.channel.alternatives[0].transcript:
                collector.add(text)

        async def on_error(self, error, **kwargs):  # FIXED: Added `self`
            print(f"Error: {error}")

        # Attach event handlers
        dg_connection.on(LiveTranscriptionEvents.Transcript, on_message)
        dg_connection.on(LiveTranscriptionEvents.Error, on_error)

        options = LiveOptions(
            model="nova-2", punctuate=True, language="en-US",
            encoding="linear16", sample_rate=16000
        )

        await dg_connection.start(options)

        # Open a microphone stream
        microphone = Microphone(dg_connection.send)
        microphone.start()

        while True:
            print("Listening...")
            await asyncio.sleep(5)  # Listen for 10 seconds
            print(f"Transcription: {collector.get()}\n")

            if "exit" in collector.get().lower():
                print("Exiting...")

                break
            collector.reset()  # Reset transcript for the next cycle

    except Exception as e:
        print(f"Error: {e}")

                # Cleanup
    microphone.finish()
    dg_connection.finish()

if __name__ == "__main__":
    asyncio.run(get_transcript())


