"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Question {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  date: string
  question: string
  replies?: Reply[]
}

interface Reply {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  date: string
  content: string
}

const sampleQuestions: Question[] = [
  {
    id: "1",
    user: {
      name: "Jalyn F",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JF",
    },
    date: "May 13, 2017",
    question: "What laminator, laminator sheets, and velcro do you suggest?",
    replies: [
      {
        id: "1-1",
        user: {
          name: "Mrs Jane Khan (Seller)",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "MK",
        },
        date: "May 16, 2017",
        content:
          "Laminator: http://amzn.to/2hCPqsl Velcro Dots: http://amzn.to/2qHjLu Strip Velcro: http://amzn.to/2tcOtDD You can also view the Q&A video on my FB page for other questions about supplies for AWBs.",
      },
    ],
  },
  {
    id: "2",
    user: {
      name: "Jalyn F",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JF",
    },
    date: "May 13, 2017",
    question: "What laminator, laminator sheets, and velcro do you suggest?",
  },
  {
    id: "3",
    user: {
      name: "MAKAYLA O",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MO",
    },
    date: "July 21, 2022",
    question: "What laminator, laminator sheets, and velcro do you suggest?",
    replies: [
      {
        id: "3-1",
        user: {
          name: "Mrs Jane Khan (Seller)",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "MK",
        },
        date: "May 16, 2017",
        content:
          "Laminator: http://amzn.to/2hCPqsl Velcro Dots: http://amzn.to/2qHjLu Strip Velcro: http://amzn.to/2tcOtDD You can also view the Q&A video on my FB page for other questions about supplies for AWBs.",
      },
    ],
  },
]

export default function QuestionsAnswers() {
  return (
    <div className="container p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Questions & Answers</h2>
        <p className="text-gray-600 mb-4">Don&apos;t see the resources you&apos;re looking for?</p>
        <Button variant="outline" className="mb-6 border-2 border-[#6C8CA7] text-[#6C8CA7]">
          Post A Question
        </Button>
      </div>

      <div className="space-y-6">
        {sampleQuestions.map((question) => (
          <Card key={question.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={question.user.avatar || "/placeholder.svg"} alt={question.user.name} />
                  <AvatarFallback className="bg-blue-500 text-white">{question.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">Question</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500 text-sm">
                      {question.date} from {question.user.name}
                    </span>
                  </div>
                  <p className="text-gray-700">{question.question}</p>
                </div>
              </div>

              <div className="ml-13">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                  Reply
                </Button>
              </div>

              {question.replies && question.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-3">
                  {question.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                          <AvatarFallback className="bg-orange-500 text-white text-xs">
                            {reply.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-gray-900 text-sm">Reply</span>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-500 text-sm">
                              {reply.date} from {reply.user.name}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
