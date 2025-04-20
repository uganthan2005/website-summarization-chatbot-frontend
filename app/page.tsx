import { UserIdForm } from "@/components/user-id-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Website Summarizer</h1>
          <p className="mt-2 text-gray-600">Enter your user ID to get started with website summarization</p>
        </div>

        <UserIdForm />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Analyze, summarize, and compare websites with AI assistance</p>
        </div>
      </div>
    </div>
  )
}
