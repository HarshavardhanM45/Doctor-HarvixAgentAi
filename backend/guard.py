import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def classify_query(query):
    prompt = f"""
You are a strict medical domain classifier.

Classify the query into:
- MEDICAL
- NON_MEDICAL

Rules:
- MEDICAL → health, disease, symptoms, treatment, medicine
- NON_MEDICAL → everything else

STRICT:
- Respond ONLY with MEDICAL or NON_MEDICAL

Query: {query}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"].strip()


def is_medical(query):
    result = classify_query(query)

    if result == "MEDICAL":
        return True

    return False
