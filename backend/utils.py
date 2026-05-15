import requests

OLLAMA_URL = "http://ollama:11434/api/generate"

def call_mistral(prompt, model="mistral"):
    """Generic function to call Mistral via Ollama."""
    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": model,
                "prompt": prompt,
                "stream": False
            }
        )
        return response.json()["response"].strip()
    except Exception as e:
        print(f"Error calling Mistral: {e}")
        return ""

def validate_answer(answer):
    """Validation layer to prevent short or low-confidence answers."""
    if "I don't know" in answer or "don't have" in answer.lower():
        return answer
    
    if len(answer) < 20:
        return "I apologize, but I don't have enough specific information in my dataset to provide a comprehensive answer."
    
    return answer
