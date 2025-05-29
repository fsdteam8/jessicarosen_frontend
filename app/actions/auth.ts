"use server"

import { cookies } from "next/headers"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(userData: {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok || !data.status) {
      return {
        success: false,
        message: data.message || "Registration failed",
      }
    }

    return {
      success: true,
      data: data.data,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "An error occurred during registration",
    }
  }
}

export async function loginUser(credentials: {
  email: string
  password: string
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok || !data.status) {
      return {
        success: false,
        message: data.message || "Login failed",
      }
    }

    // Store refreshToken in cookie if needed
    const cookieStore = cookies()
    cookieStore.set("refreshToken", data.data.user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      data: data.data,
      accessToken: data.data.accessToken,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login",
    }
  }
}

export async function logout() {
  const cookieStore = cookies()
  const allCookies = cookieStore.getAll()
  // Delete each cookie
  allCookies.forEach((cookie) => {
    cookieStore.delete(cookie.name)
  })
}
