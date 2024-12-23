"use client"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  comments: Comment[]
}

interface Comment {
  id: string
  text: string
  date: string
  userId: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete user")
      
      setUsers(users.filter(user => user.id !== userId))
      toast({
        title: "Success",
        description: "User deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const deleteComment = async (userId: string, commentId: string) => {
    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete comment")
      
      setUsers(users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            comments: user.comments.filter(comment => comment.id !== commentId)
          }
        }
        return user
      }))
      
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-display font-light mb-8">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-display font-light mb-8">Admin Dashboard</h1>
        
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="space-y-6">
          {filteredUsers.map(user => (
            <div key={user.id} className="bg-card rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-display font-light">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {user.comments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-display font-light">Comments</h3>
                  {user.comments.map(comment => (
                    <div key={comment.id} className="flex justify-between items-start bg-muted p-3 rounded">
                      <div>
                        <p className="text-sm">{comment.text}</p>
                        <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteComment(user.id, comment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-muted-foreground">No users found</p>
          )}
        </div>
      </div>
    </div>
  )
} 