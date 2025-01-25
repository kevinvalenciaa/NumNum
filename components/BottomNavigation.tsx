import { Utensils, MessageCircle, User } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => setActiveTab("swipe")}
          className={`p-2 rounded-full ${activeTab === "swipe" ? "bg-yellow-100" : ""}`}
        >
          <Utensils className={`w-6 h-6 ${activeTab === "swipe" ? "text-yellow-500" : "text-gray-500"}`} />
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`p-2 rounded-full ${activeTab === "chat" ? "bg-yellow-100" : ""}`}
        >
          <MessageCircle className={`w-6 h-6 ${activeTab === "chat" ? "text-yellow-500" : "text-gray-500"}`} />
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`p-2 rounded-full ${activeTab === "profile" ? "bg-yellow-100" : ""}`}
        >
          <User className={`w-6 h-6 ${activeTab === "profile" ? "text-yellow-500" : "text-gray-500"}`} />
        </button>
      </div>
    </nav>
  )
}

