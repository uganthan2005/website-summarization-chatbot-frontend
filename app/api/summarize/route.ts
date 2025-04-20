import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, url, prompt } = body

    if (!user_id || !url) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Call your backend API
    const response = await fetch("https://website-summarization-chatbot.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        url,
        prompt: prompt || "Summarize this website content",
      }),
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in summarize API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
