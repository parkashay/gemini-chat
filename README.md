# Gemini Chat

A real-time AI chat application built with the **Gemini API** and **Server-Sent Events (SSE)** to stream responses dynamically.

🚀 [Live Demo](https://master.d1i0bq0ta6os8r.amplifyapp.com/chat/)

---

## Features

- 🤖 Chat with an AI powered by Gemini API
- ⚡ Instant, streamed responses via Server-Sent Events (SSE)
- 🌐 Frontend + Backend architecture
- 🛠️ Deployed on AWS Amplify

---

## Tech Stack

- **Frontend**: React (TypeScript, TailwindCSS)
- **Backend**: Node.js (Express)
- **Streaming**: Server-Sent Events (SSE)
- **Hosting**: AWS Amplify

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/parkashay/gemini-chat.git
cd gemini-chat

# Install backend dependencies
cd backend
yarn install

# Install frontend dependencies
cd ../frontend
yarn install
```

## Running Locally

To get the application running on your local machine, follow these steps:

**Start the Backend:**

- Open your terminal and navigate to the `backend/` directory:

  ```bash
  cd backend
  ```

- Start the backend server:

  ```bash
  npm run dev
  ```

**Start the Frontend:**

- Open a new terminal window or tab.
- Navigate to the `frontend/` directory:

  ```bash
  cd frontend
  ```

- Start the frontend development server:

  ```bash
  npm run dev
  ```

**Access the Application:**

- Once both the backend and frontend servers are running, open your web browser and visit the following URL:

  ```
  http://localhost:3000
  ```

## Environment Variables

The backend requires an environment variable to access the Gemini API.

**Create `.env` File:**

- Inside the `backend/` directory, create a file named `.env`.

**Set the API Key:**

- Open the `.env` file and add your Gemini API key:

  ```
  GEMINI_API_KEY=your-gemini-api-key
  ```

- Replace `your-gemini-api-key` with your actual API key. You can obtain this key from [Google AI Studio](https://makersuite.google.com/).

## Project Structure

The project has the following directory structure:

gemini-chat/├── backend/ # Express server (handles API and SSE)└── frontend/ # React client (chat interface)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to contribute by:

- Opening a pull request with your changes.
- Submitting an issue to report bugs or suggest new features.

## License

This project is licensed under the [MIT License](LICENSE).
