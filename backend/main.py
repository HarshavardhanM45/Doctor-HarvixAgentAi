from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from guard import is_medical
from model import get_medical_response

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Medical AI running"}

@app.post("/query")
def query_api(user_query: str):
    
    if not is_medical(user_query):
        return {
            "status": "blocked",
            "response": "I apologize, but as a specialized medical assistant, I am only authorized to provide information and guidance related to health, symptoms, treatments, and medical conditions. Please provide a medical or health-related query for further assistance."
        }

    # Get actual response from Mistral
    medical_answer = get_medical_response(user_query)
    
    return {
        "status": "allowed",
        "response": medical_answer
    }
