"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X } from "lucide-react"

interface Resource {
  id: string
  name: string
}

interface MessageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resource: Resource | null
}

interface Message {
  id: string
  text: string
  sender: "user" | "admin"
  timestamp: string
}

export function MessageModal({ open, onOpenChange, resource }: MessageModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi, Mandy",
      sender: "admin",
      timestamp: "09:41 AM",
    },
    {
      id: "2",
      text: "I've to know my resource information",
      sender: "admin",
      timestamp: "09:41 AM",
    },
    {
      id: "3",
      text: "Really?",
      sender: "user",
      timestamp: "09:42 AM",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!resource) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="bg-slate-600 text-white p-4 -m-6 mb-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium">{resource.id}: Resource Name Admissibility</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Messages */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === "user" ? "bg-slate-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex items-center space-x-2 pt-4 border-t">
          <Input
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-slate-600 hover:bg-slate-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
