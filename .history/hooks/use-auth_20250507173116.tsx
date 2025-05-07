"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // In a real app, this would make an API call to authenticate
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock successful login for demo purposes
          if (email === "demo@example.com" && password === "password") {
            set({
              user: {
                id: "1",
                name: "Demo User",
                email: "demo@example.com",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              token: "mock-jwt-token",
              isAuthenticated: true,
            })
            return true
          }
          return false
        } catch (error) {
          console.error("Login error:", error)
          return false
        }
      },

      register: async (name, email, password) => {
        // In a real app, this would make an API call to register
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock successful registration
          set({
            user: {
              id: "2",
              name,
              email,
              avatar: "/placeholder.svg?height=40&width=40",
              // password: 'fsa'
            },
            token: "mock-jwt-token",
            isAuthenticated: true,
          })
          return true
        } catch (error) {
          console.error("Registration error:", error)
          return false
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
