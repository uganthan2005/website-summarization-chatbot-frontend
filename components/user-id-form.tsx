"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function UserIdForm() {
  const [userId, setUserId] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId.trim()) {
      setError("User ID cannot be empty")
      return
    }

    // Store user ID in localStorage for persistence
    localStorage.setItem("userId", userId)

    // Navigate to chat page with user ID as query parameter
    router.push(`/chat?user_id=${encodeURIComponent(userId)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="user_id">User ID</Label>
        <Input
          id="user_id"
          type="text"
          placeholder="Enter your user ID"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value)
            setError("")
          }}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <Button type="submit" className="w-full">
        Continue to Chat
      </Button>
    </form>
  )
}
