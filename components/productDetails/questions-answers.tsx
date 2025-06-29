"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Send, X } from "lucide-react";

interface QAItem {
  _id: string;
  resource: string;
  question: string;
  askedBy: {
    _id: string;
    firstName: string;
    role: "ADMIN" | "SELLER" | "USER" | string;
  };
  isAnswered: boolean;
  replies: QAReply[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface QAReply {
  message: string;
  sender: {
    _id: string;
    firstName: string;
    role: "ADMIN" | "SELLER" | "USER" | string;
  };
  createdAt: string;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper function to get user initials
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function QuestionsAnswers({
  resourceId,
  userId,
}: {
  resourceId: string;
  userId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;
  const queryClient = useQueryClient();

  console.log("resourceId & userId", resourceId, userId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["question", resourceId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qa/${resourceId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch question and answers");
      }
      return res.json();
    },
  });

  const postQuestion = useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qa/${resourceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ question: message }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to post question");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question", resourceId] });
    },
  });
  const handleSendQuestion = () => {
    console.log("Question submitted:", question);
    // Here you can add API call to submit the question
    postQuestion.mutate(question);
    setQuestion("");
    setIsModalOpen(false);
  };

  console.log("question ", data?.data);
  const sampleQuestions = data?.data || [];

  if (isLoading) {
    return <div className="container p-6">Loading questions...</div>;
  }

  if (isError) {
    return <div className="container p-6">Error loading questions.</div>;
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Questions & Answers
          </h2>
          <p className="text-gray-600 mb-4">
            Don&apos;t see the resources you&apos;re looking for?
          </p>
        </div>
        <div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="mb-6 border-2 border-[#6C8CA7] text-[#6C8CA7] hover:bg-[#6C8CA7] hover:text-white transition-colors"
              >
                Post A Question
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Ask a Question
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Have a question about this resource? Ask away and get answers
                  from the community.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="question"
                    className="text-sm font-medium text-gray-700"
                  >
                    Your Question
                  </Label>
                  <Textarea
                    id="question"
                    placeholder="Type your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[120px] resize-none border-gray-300 focus:border-[#6C8CA7] focus:ring-[#6C8CA7]"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-full p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSendQuestion}
                  disabled={!question.trim()}
                  className="p-2 rounded-full border border-green-700 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm "
                >
                  <Send className="w-4 h-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-6">
        {sampleQuestions.map((question: QAItem) => (
          <Card key={question._id} className="border-l-4 border-l-[#4f7695]">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="/placeholder.svg"
                    alt={question.askedBy.firstName}
                  />
                  <AvatarFallback className="bg-blue-[#4f7695] text-white">
                    {getInitials(question.askedBy.firstName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      Question
                    </span>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(question.createdAt)} from{" "}
                      {question.askedBy.firstName}
                    </span>
                  </div>
                  <p className="text-gray-700">{question.question}</p>
                </div>
              </div>

              <div className="ml-13">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                >
                  Reply
                </Button>
              </div>

              {question.replies && question.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-3">
                  {question.replies.map((reply, index) => (
                    <div
                      key={`${question._id}-reply-${index}`}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src="/placeholder.svg"
                            alt={reply.sender.firstName}
                          />
                          <AvatarFallback className="bg-orange-500 text-white text-xs">
                            {getInitials(reply.sender.firstName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-gray-900 text-sm">
                              Reply
                            </span>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-500 text-sm">
                              {formatDate(reply.createdAt)} from{" "}
                              {reply.sender.firstName}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {reply.message}
                          </p>
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
  );
}
