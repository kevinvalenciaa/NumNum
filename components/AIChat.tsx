"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { analyzeInput } from "../utils/api"

interface Message {
  id: number
  text: string
  sender: "user" | "Num"
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Greetings! I am Num, your personal concierge.", sender: "Num" },
  ])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, sender: "user" }
      setMessages([...messages, newMessage])
      setInput("")

      try {
        // Analyze the user input using the external function
        const result = await analyzeInput(input)
        const aiResponse: Message = {
          id: messages.length + 2,
          text: result.message, // Use the response from the AI
          sender: "Num",
        }
        setMessages((prevMessages) => [...prevMessages, aiResponse])
      } catch (error) {
        console.error("Error connecting to the backend:", error)
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "Error connecting to the AI backend.",
          sender: "Num",
        }
        setMessages((prevMessages) => [...prevMessages, errorMessage]) // Handle error case
      }
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>AI Interaction</h1>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-3/4 p-3 rounded-lg ${
                  message.sender === "user" ? "bg-yellow-500 text-white" : "bg-gray-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
