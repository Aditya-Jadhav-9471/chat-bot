import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IncomingRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Mock incoming requests for now
  useEffect(() => {
    setRequests([
      { userId: "user123" },
      { userId: "user456" }
    ]);
  }, []);

  const handleAccept = (userId) => {
    // In real app: send socket emit to accept request
    navigate("/agent/chat"); // navigate to chat page
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req) => (
            <li key={req.userId} className="bg-white p-3 border rounded flex justify-between items-center">
              <span>User ID: {req.userId}</span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => handleAccept(req.userId)}
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncomingRequests;
