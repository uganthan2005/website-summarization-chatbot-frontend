"use client"

import { useState } from "react"
import { useUserContext } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Analytics {
  total_summaries: number
  frequent_domains: [string, number][]
  average_summary_length: number
  common_topics: string
  usage_over_time: Record<string, number>
}

export function AnalyticsDisplay() {
  const { userId } = useUserContext()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch analytics")
      }

      setAnalytics(data.data.analytics)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Button onClick={fetchAnalytics} disabled={loading} size="lg">
          {loading ? "Loading Analytics..." : "Get Analytics"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Summaries</p>
                  <p className="text-2xl font-bold">{analytics.total_summaries}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Average Summary Length</p>
                  <p className="text-2xl font-bold">{Math.round(analytics.average_summary_length)} words</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequent Domains</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analytics.frequent_domains.map(([domain, count], index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-700">{domain}</span>
                    <span className="font-medium">{count} summaries</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Common Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap">{analytics.common_topics}</div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Usage Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(analytics.usage_over_time).map(([date, count], index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-700">{date}</span>
                    <span className="font-medium">{count} summaries</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
