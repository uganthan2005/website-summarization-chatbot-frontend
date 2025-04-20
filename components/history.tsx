"use client"

import { useEffect, useState } from "react"
import { useUserContext } from "@/context/user-context"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface HistoryItem {
  id: string
  user_id: string
  url: string
  prompt: string
  summary: string
  timestamp: string
}

export function History() {
  const { userId } = useUserContext()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return

      try {
        setLoading(true)
        setError("")

        const response = await fetch(`/api/history/${userId}`)
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch history")
        }

        setHistory(data.data.history || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [userId])

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (history.length === 0) {
    return <div className="text-center p-8 text-gray-500">No conversation history found</div>
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <h4 className="font-medium">{new Date(item.timestamp).toLocaleString()}</h4>
              </div>
              <p className="text-sm text-gray-500">URL: {item.url}</p>
              <p className="text-sm font-medium">Prompt: {item.prompt}</p>
              <div className="mt-2 text-sm text-gray-700 line-clamp-3">{item.summary}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
