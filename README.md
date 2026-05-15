# 🩺 Doctor Harvix – Medical AI Consultation System

Doctor Harvix is a sophisticated AI-powered Medical Consultation System designed with a strong focus on accuracy, safety, and premium user experience.

The system uses **Retrieval-Augmented Generation (RAG)** to provide grounded and context-aware medical responses while ensuring the AI remains strictly within the medical domain.

---

# ✨ Features

- 🩺 AI-powered medical consultation
- 🔒 Domain-restricted AI responses
- 📚 Retrieval-Augmented Generation (RAG)
- ⚡ Fast semantic search using FAISS
- 🤖 Local LLM execution using Ollama + Mistral
- 🧠 Query enhancement and re-ranking
- 🎨 Modern glassmorphism UI
- 📡 Real-time response streaming
- 🛡️ Medical safety disclaimer system
- 🐳 Docker support for deployment

---

# 🛠️ Technologies Used

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite | Fast and modern user interface |
| Styling | Tailwind CSS | Premium responsive styling |
| Icons | Lucide React | Modern icon system |
| Backend | FastAPI | High-performance Python API |
| AI Model | Ollama + Mistral | Local LLM execution |
| Vector Search | FAISS | High-speed semantic retrieval |
| AI Framework | LangChain | Text chunking and RAG pipeline |
| Computation | NumPy | Vector operations |
| Deployment | Docker | Containerized deployment |

---

# 🔄 System Workflow

## 1️⃣ User Interaction

The user enters a medical question into the React dashboard.

Example:
```text
"What are the symptoms of Type 2 Diabetes?"
```

The frontend sends the query to the FastAPI backend.

---

## 2️⃣ Guard Layer (Domain Filtering)

Before processing, the system checks whether the query is medical or non-medical.

### Example

| Query | Result |
|---|---|
| "Symptoms of asthma" | ✅ Allowed |
| "How to repair a car?" | ❌ Rejected |

This ensures the AI remains focused only on healthcare-related conversations.

---

## 3️⃣ Advanced RAG Pipeline

### 🔹 Query Enhancement
The system rewrites the question into a more search-optimized medical query.

### 🔹 Vector Retrieval
FAISS searches through the local medical dataset (`medical_data.txt`) to retrieve relevant clinical information.

### 🔹 Re-ranking
Retrieved chunks are re-evaluated to ensure the most accurate context is used.

---

## 4️⃣ Response Generation

The system creates a specialized **Doctor Harvix Prompt** containing:

- User query
- Retrieved medical context
- Safety instructions

The Mistral LLM generates:
- Professional responses
- Empathetic explanations
- Context-grounded medical advice

### 🛡️ Safety First
Every response automatically includes a medical disclaimer.

---

## 5️⃣ Response Delivery

The final response is streamed back to the frontend interface.

The UI displays:
- Verified dataset indicators
- Status labels
- Clean formatted medical answers

---

# 📂 Project Structure

```bash
Doctor-Harvix/
│
├── backend/
│   ├── rag.py
│   ├── guard.py
│   ├── model.py
│   ├── main.py
│   └── medical_data.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   └── package.json
│
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

# 📁 Key Files

## `backend/rag.py`
Handles:
- Query enhancement
- FAISS retrieval
- Chunk re-ranking

---

## `backend/guard.py`
Responsible for:
- Domain filtering
- Medical query validation
- Safety enforcement

---

## `backend/model.py`
Controls:
- Prompt engineering
- LLM interaction
- Response generation

---

## `frontend/src/App.jsx`
Contains:
- Main dashboard UI
- User interaction logic
- AI response rendering

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/doctor-harvix.git
cd doctor-harvix
```

---

## 2️⃣ Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

---

## 3️⃣ Install Ollama

Download Ollama from:

```bash
https://ollama.ai
```

Pull the Mistral model:

```bash
ollama pull mistral
```

Run the model:

```bash
ollama run mistral
```

---

## 4️⃣ Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

---

# 🐳 Docker Setup

Run the complete application using Docker:

```bash
docker-compose up --build
```

---

# 🚀 API Endpoint

## POST `/chat`

### Request

```json
{
  "query": "What are the symptoms of diabetes?"
}
```

### Response

```json
{
  "response": "Common symptoms of Type 2 Diabetes include increased thirst, fatigue, and frequent urination..."
}
```

---

# 🔒 Safety & Limitations

Doctor Harvix is intended for:
- Educational purposes
- General healthcare guidance

It is NOT a replacement for:
- Professional doctors
- Clinical diagnosis
- Emergency medical services

Always consult a licensed healthcare professional for medical decisions.

---

# 🎨 UI Highlights

- Glassmorphism design
- Smooth animations
- Responsive layout
- Streaming AI responses
- Clinical verification indicators
- Modern healthcare-inspired theme

---

# 🔮 Future Improvements

- Multi-language support
- Voice-based consultation
- Medical image analysis
- User authentication
- Cloud deployment
- Patient history memory
- Advanced medical datasets

---

# 👨‍💻 Author

Developed by **Harshavardhan M**

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Acknowledgements

- Ollama
- Mistral AI
- LangChain
- FAISS
- FastAPI
- React
- Tailwind CSS

---

# 📌 Final Note

Doctor Harvix demonstrates how modern AI systems can combine:
- Local LLMs
- Retrieval-Augmented Generation
- Safety filtering
- Premium UI/UX

to create a reliable and privacy-focused Medical AI Assistant.
