"use client"

import type React from "react"

import { useState } from "react"
import { useUserContext } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function Comparison() {
  const { userId } = useUserContext()
  const [url1, setUrl1] = useState("")
  const [url2, setUrl2] = useState("")
  const [prompt, setPrompt] = useState("")
  const [comparison, setComparison] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url1) {
      setError("Please enter at least one website URL")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess(false)

      const response = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          url1,
          url2: url2 || undefined,
          comparison_prompt: prompt || undefined,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to compare websites")
      }

      setComparison(data.data.comparison)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url1">URL 1</Label>
              <Input
                id="url1"
                type="url"
                placeholder="https://example1.com"
                value={url1}
                onChange={(e) => setUrl1(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url2">URL 2 (Optional)</Label>
              <Input
                id="url2"
                type="url"
                placeholder="https://example2.com"
                value={url2}
                onChange={(e) => setUrl2(e.target.value)}
                disabled={loading}
              />
              <p className="text-sm text-gray-500">
                If not provided, the system will compare with a relevant previous summary
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comparison-prompt">Comparison Prompt (Optional)</Label>
              <Textarea
                id="comparison-prompt"
                placeholder="Compare these websites focusing on..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
                className="min-h-[80px]"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Comparing..." : "Compare"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">Comparison generated successfully!</AlertDescription>
        </Alert>
      )}

      {comparison && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Comparison</h3>
            <div className="whitespace-pre-wrap">{comparison}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
