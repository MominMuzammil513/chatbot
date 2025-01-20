import ChatInterface from "@/components/ChatInterface"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100">
      {/* <div className="w-full max-w-3xl"> */}
        <ChatInterface />
      {/* </div> */}
    </main>
  )
}

