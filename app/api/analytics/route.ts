import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id } = body

    if (!user_id) {
      return NextResponse.json({ success: false, error: "Missing user ID" }, { status: 400 })
    }

    // Call your backend API
    const response = await fetch("https://website-summarization-chatbot.onrender.com/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
      }),
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in analytics API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
