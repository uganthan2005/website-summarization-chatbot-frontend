import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, question, url } = body

    if (!user_id || !question) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Call your backend API
    const response = await fetch("http://localhost:8000/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        question,
        url,
      }),
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in question API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
