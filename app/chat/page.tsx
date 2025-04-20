"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Summarizer } from "@/components/summarizer"
import { QuestionBox } from "@/components/question-box"
import { Comparison } from "@/components/comparison"
import { History } from "@/components/history"
import { AnalyticsDisplay } from "@/components/analytics-display"
import { UserContext } from "@/context/user-context"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    // Get user ID from URL query or localStorage
    const userIdFromQuery = searchParams.get("user_id")
    const userIdFromStorage = localStorage.getItem("userId")

    const id = userIdFromQuery || userIdFromStorage

    if (!id) {
      // Redirect to home if no user ID is found
      redirect("/")
    } else {
      setUserId(id)
      // Store in localStorage for persistence
      if (userIdFromQuery) {
        localStorage.setItem("userId", userIdFromQuery)
      }
    }
  }, [searchParams])

  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ userId }}>
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Website Summarizer</h1>

        <Tabs defaultValue="summarize" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="summarize">🔍 Summarize</TabsTrigger>
            <TabsTrigger value="question">❓ Ask a Question</TabsTrigger>
            <TabsTrigger value="compare">🔄 Compare</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="summarize">
            <Summarizer />
          </TabsContent>

          <TabsContent value="question">
            <QuestionBox />
          </TabsContent>

          <TabsContent value="compare">
            <Comparison />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDisplay />
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">📜 Conversation History</h2>
          <History />
        </div>
      </div>
    </UserContext.Provider>
  )
}
