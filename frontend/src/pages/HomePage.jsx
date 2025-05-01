import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ChatBot!</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Get instant help from AI or connect with a real agent — fast and easy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow-md text-center transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">⚡ Instant Answers</h3>
          <p className="text-gray-600">Get quick responses to your questions anytime.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">🧑‍💻 Real Agents</h3>
          <p className="text-gray-600">Talk to real people when you need personal support.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">🕓 24/7 Available</h3>
          <p className="text-gray-600">We’re here whenever you need help, day or night.</p>
        </div>
      </div>

      <button
        onClick={goToAuth}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition-all hover:scale-105"
        aria-label="Get Started"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
