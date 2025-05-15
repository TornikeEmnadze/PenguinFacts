import { useState, useEffect } from 'react';
// import './App.css'; // Optional: if Vite created one

function App() {
  // Use type annotation for state for clarity in TypeScript
  const [latestAnswer, setLatestAnswer] = useState<string>('Loading...');

  // *** IMPORTANT: This URL needs to be updated on the EC2 instance ***
  const BACKEND_API_URL = 'http://localhost:3000';

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/api/answer`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Ensure the response JSON matches what the backend sends
        const data: { data?: string } = await response.json(); // Add type for safety
        console.log('Fetched data from backend:', data);
        setLatestAnswer(data.data || 'No data received yet.');
      } catch (error) {
        console.error("Error fetching answer:", error);
        // Type assertion or check for error handling
        if (error instanceof Error) {
            setLatestAnswer(`Error fetching data: ${error.message}`);
        } else {
            setLatestAnswer('An unknown error occurred.');
        }
      }
    };

    fetchAnswer();
  }, []);

  return (
    <div>
      <h1>Latest Answer Received:</h1>
      {/* --- Frontend Requirement --- */}
      {/* Display the data inside a span with the exact ID "answer" */}
      <span id="answer">{latestAnswer}</span>
      {/* -------------------------- */}

      <p>
        (This page displays the last piece of data sent to your backend's 
        <code>/api/create-answer</code> endpoint)
      </p>
    </div>
  );
}

export default App;