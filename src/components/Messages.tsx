import { Message } from "./ChatInterface";

export function Messages({ message }: { message: Message }) {
    return (
      <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
            message.isUser
              ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
              : "bg-white text-gray-800 shadow-md"
          } transition-all duration-200`}
        >
          <p className="text-sm">{message.text}</p>
          <p className={`text-xs mt-1 ${message.isUser ? "text-purple-200" : "text-gray-400"}`}>
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    )
  }
  