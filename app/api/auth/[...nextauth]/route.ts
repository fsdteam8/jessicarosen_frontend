import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginUser } from "@/app/actions/auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const result = await loginUser({
          email: credentials.email,
          password: credentials.password,
        })

        if (!result.success) {
          throw new Error(result.message || "Invalid credentials")
        }
          if (result.data.user.role === "ADMIN") {
          throw new Error("You can't log in as admin, please use admin dashboard")
        }

      console.log("User logged in:", result.data.user)
        return {
          id: result.data.user._id,
          name: `${result.data.user.firstName} ${result.data.user.lastName}`,
          email: result.data.user.email,
          role: result.data.user.role,
          profileImage: result.data.user.profileImage,
          accessToken: result.data.accessToken,
          refreshToken: result.data.user.refreshToken,
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.profileImage = user.profileImage
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      if(trigger === "update" && session) {
        token.role = session.User.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.profileImage = token.profileImage as string
        session.user.accessToken = token.accessToken as string
        session.user.refreshToken = token.refreshToken as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
