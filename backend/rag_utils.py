import os
import dotenv
from dotenv import load_dotenv
from pinecone import Pinecone
import uuid
from langchain_community.document_loaders import PyMuPDFLoader
load_dotenv()

os.environ["PINECONE_API"] = os.getenv("PINECONE_API")
os.environ["PINECONE_ENV"] = os.getenv("PINECONE_ENV")
os.environ["PINECONE_HOST"] = os.getenv("PINECONE_HOST")

file = "history.pdf"

loader = PyMuPDFLoader(file)

docs = loader.load()
text = ""
for doc in docs:
    text+=doc.page_content

print(text)

pc = Pinecone(api_key=os.environ["PINECONE_API"])

index = pc.Index(
    host=os.environ["PINECONE_HOST"],
)

print(f"Connected to Pinecone index: {index}")

def split_text(text, chunk_size=1000, overlap=200):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks


def upload_chunks_to_pinecone(chunks):
    records = []
    for i, chunk in enumerate(chunks):
        records.append({
            "_id": str(uuid.uuid4()),
            "text": chunk,         # <--- Use "text" instead of "chunk_text"
            "chunk_index": i       # optional metadata field
        })

    index.upsert_records(namespace="documents", records=records)
    print(f"Uploaded {len(records)} records to Pinecone ')")



data_chunks = split_text(text,chunk_size=1000,overlap=200)



upload_chunks_to_pinecone(data_chunks)