import botReplies from '../data/BotReplies.json';
import { socket } from './socketService'; // Import socket for agent connection handling

// Function to get the bot reply based on user input
const getBotReply = (input) => {
  try {
    // Convert input to lowercase for case-insensitive comparison
    const userInput = input.toLowerCase();

    // Search for matching questions in botReplies
    for (const category in botReplies.common_questions) {
      const { questions, answer } = botReplies.common_questions[category];

      // Check if user input matches any of the questions (partial matches included)
      if (questions.some((question) => userInput.includes(question.toLowerCase()))) {
        return answer;
      }
    }

    // Default message if no match is found
    return "Thank you for your message! How can I assist you further?";
  } catch (error) {
    console.error("Error while getting bot reply:", error);
    return "Sorry, there was an error while processing your request. Please try again later.";
  }
};

// Function to connect user to an agent
const connectToAgent = (userId) => {
  try {
    // Emit the request to connect the user to an agent via Socket.IO
    socket.emit("sendRequestToAgent", { userId });

    // Return a message indicating the connection attempt
    return "Connecting you to an agent... Please wait.";
  } catch (error) {
    console.error("Error while connecting to agent:", error);
    return "Sorry, there was an error while connecting you to an agent. Please try again later.";
  }
};

export { getBotReply, connectToAgent };
