import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { user_id: string } }) {
  try {
    const userId = params.user_id

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing user ID" }, { status: 400 })
    }

    // Call your backend API
    const response = await fetch(`https://website-summarization-chatbot.onrender.com`)
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in history API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
