import os
import requests
import numpy as np
import faiss
from langchain_text_splitters import RecursiveCharacterTextSplitter
from utils import call_mistral

EMBED_URL = "http://localhost:11434/api/embeddings"
DATA_FILE = "medical_data.txt"

class AdvancedRAG:
    def __init__(self):
        self.chunks = []
        self.index = None
        self.load_data()
        self.build_index()

    def get_embedding(self, text):
        try:
            response = requests.post(
                EMBED_URL,
                json={
                    "model": "mistral",
                    "prompt": text
                }
            )
            return response.json()["embedding"]
        except Exception as e:
            print(f"Embedding error: {e}")
            return [0.0] * 4096 # Fallback dimension for mistral

    def load_data(self):
        if not os.path.exists(DATA_FILE):
            print(f"Error: {DATA_FILE} not found.")
            return
        
        with open(DATA_FILE, "r") as f:
            content = f.read()
        
        # 🔥 Step 1: Better Chunking
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=300,
            chunk_overlap=100
        )
        self.chunks = splitter.split_text(content)

    def build_index(self):
        if not self.chunks:
            return

        print("Building Advanced RAG index...")
        embeddings = []
        for chunk in self.chunks:
            embeddings.append(self.get_embedding(chunk))
        
        embeddings_array = np.array(embeddings).astype('float32')
        dimension = embeddings_array.shape[1]
        
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings_array)
        print(f"Index built with {len(self.chunks)} chunks.")

    def enhance_query(self, query):
        # 🔥 Step 2: Query Enhancement
        prompt = f"""
Rewrite this medical query to be more specific and detailed for retrieval:

Query: {query}

Improved Query:
"""
        enhanced = call_mistral(prompt).strip()
        return enhanced if enhanced else query

    def rerank_docs(self, query, retrieved_chunks):
        # 🔥 Step 4: Simple Re-ranking
        scored = []
        query_lower = query.lower()
        
        for chunk in retrieved_chunks:
            # Score based on keyword overlap
            score = 0
            words = query_lower.split()
            for word in words:
                if word in chunk.lower():
                    score += 1
            scored.append((score, chunk))
        
        # Sort by score descending
        scored.sort(reverse=True, key=lambda x: x[0])
        # Return top 3 after re-ranking
        return [chunk for _, chunk in scored[:3]]

    def query_pipeline(self, user_query):
        if not self.index or not self.chunks:
            return ""

        # 1. Enhance Query
        enhanced_query = self.enhance_query(user_query)
        print(f"Enhanced Query: {enhanced_query}")

        # 2. Retrieve Depth (k=6)
        query_embedding = np.array([self.get_embedding(enhanced_query)]).astype('float32')
        k = min(6, len(self.chunks))
        distances, indices = self.index.search(query_embedding, k)
        
        retrieved_chunks = [self.chunks[i] for i in indices[0] if i != -1]

        # 3. Re-ranking
        final_chunks = self.rerank_docs(user_query, retrieved_chunks)

        # 4. Context Selection
        context = "\n\n---\n\n".join(final_chunks)
        return context if context else ""

# Singleton instance
rag_system = AdvancedRAG()

def get_advanced_context(query):
    return rag_system.query_pipeline(query)
