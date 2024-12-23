import { NextResponse } from 'next/server'

// This would typically come from a database
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    comments: [
      {
        id: "1",
        text: "Great service!",
        date: "2024-03-20T10:00:00Z",
        userId: "1"
      }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    comments: [
      {
        id: "2",
        text: "Amazing experience",
        date: "2024-03-19T15:30:00Z",
        userId: "2"
      }
    ]
  }
]

export async function GET() {
  // In a real application, you would:
  // 1. Verify the user is authenticated and authorized
  // 2. Fetch users from your database
  return NextResponse.json(mockUsers)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')
  
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  // In a real application, you would:
  // 1. Verify the user is authenticated and authorized
  // 2. Delete the user from your database
  // 3. Handle any cascading deletes (e.g., comments)
  
  return NextResponse.json({ success: true })
} 