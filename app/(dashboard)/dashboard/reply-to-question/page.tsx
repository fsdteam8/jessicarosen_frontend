"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { 
  Package, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Send, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,  
  Calendar
} from "lucide-react";

interface Resource {
  _id: string;
  title: string;
  productId: string;
}

interface Sender {
  _id: string;
  firstName: string;
  role: string;
}

interface Reply {
  message: string;
  sender: Sender;
  createdAt: string;
}

interface Question {
  _id: string;
  resource: Resource;
  question: string;
  askedBy: { _id: string; firstName: string; role: string };
  isAnswered: boolean;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: Question[];
}

function Page() {
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;
  const queryClient = useQueryClient();
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [expandedResources, setExpandedResources] = useState<{ [key: string]: boolean }>({});

  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: ["question-ans"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qa`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch question and answers");
      }

      return res.json();
    },
    enabled: !!TOKEN,
  });

  const mutation = useMutation({
    mutationFn: async ({ questionId, reply }: { questionId: string; reply: string }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/qa/reply/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ answer: reply }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit reply");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question-ans"] });
      setReplyInputs({});
    },
  });

  const handleReplySubmit = (questionId: string) => {
    const reply = replyInputs[questionId]?.trim();
    if (reply) {
      mutation.mutate({ questionId, reply });
    }
  };

  const handleReplyChange = (questionId: string, value: string) => {
    setReplyInputs((prev) => ({ ...prev, [questionId]: value }));
  };

  const toggleResourceDetails = (questionId: string) => {
    setExpandedResources((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading questions...</p>
      </div>
    );
  }

  if (isError || !data?.status) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</p>
          <p className="text-gray-600">Failed to fetch questions. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
            <MessageCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Questions & Answers
          </h1>
          <p className="text-lg text-gray-600">
            Manage and respond to customer inquiries
          </p>
        </div>

        {data?.data?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Questions Yet</h3>
            <p className="text-gray-500">There are no questions available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data?.data?.map((question) => (
              <div
                key={question._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Status Bar */}
                <div className={`h-2 w-full ${
                  question.isAnswered ? 'bg-green-500' : 'bg-yellow-500'
                }`} />

                <div className="p-6">
                  {/* Resource Details Section - Improved */}
                  <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                    <div 
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => toggleResourceDetails(question._id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                          <Package className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Product Information</span>
                          <p className="text-sm text-gray-500">Click to {expandedResources[question._id] ? 'hide' : 'view'} details</p>
                        </div>
                      </div>
                      <div className="p-1 bg-white rounded-full shadow-sm">
                        {expandedResources[question._id] ? (
                          <ChevronUp className="w-5 h-5 text-indigo-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-indigo-600" />
                        )}
                      </div>
                    </div>
                    
                    {expandedResources[question._id] && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-indigo-200">
                        <div className="flex items-center space-x-2 bg-white p-3 rounded-lg">
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">ID</span>
                          <span className="text-gray-800 font-mono">{question.resource.productId}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white p-3 rounded-lg">
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">TITLE</span>
                          <span className="text-gray-800">{question.resource.title}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Question Section */}
                  <div className="mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {question.askedBy.firstName.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-2xl p-4">
                          <p className="text-lg font-medium text-gray-900 mb-2">{question.question}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="flex items-center text-gray-600">
                              <User className="w-4 h-4 mr-1" />
                              {question.askedBy.firstName}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                              {question.askedBy.role}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="flex items-center text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(question.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          question.isAnswered
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {question.isAnswered ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Answered
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Replies Section - Improved */}
                  {question.replies.length > 0 && (
                    <div className="ml-12 mb-6 space-y-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Replies ({question.replies.length})
                      </h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                        {question.replies.map((reply, index) => {
                          const isOwnMessage = reply.sender._id === session?.data?.user?.id;
                          return (
                            <div
                              key={index}
                              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex items-start space-x-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className={`flex-shrink-0 ${isOwnMessage ? 'ml-2' : 'mr-2'}`}>
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                                    isOwnMessage 
                                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                                      : 'bg-gradient-to-r from-gray-500 to-gray-600'
                                  }`}>
                                    {reply.sender.firstName.charAt(0)}
                                  </div>
                                </div>
                                <div>
                                  <div className={`rounded-2xl p-3 ${
                                    isOwnMessage
                                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    <p className="text-sm">{reply.message}</p>
                                  </div>
                                  <p className={`text-xs mt-1 ${
                                    isOwnMessage ? 'text-right' : 'text-left'
                                  } text-gray-500`}>
                                    {new Date(reply.createdAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })} • {reply.sender.firstName} ({reply.sender.role})
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Reply Input Section - Improved */}
                  <div className="mt-6 bg-gray-50 rounded-xl p-4">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <textarea
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-900 placeholder-gray-400 resize-none transition-all duration-200"
                          placeholder="Write your reply..."
                          value={replyInputs[question._id] || ""}
                          onChange={(e) => handleReplyChange(question._id, e.target.value)}
                          rows={2}
                        />
                      </div>
                      <button
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        onClick={() => handleReplySubmit(question._id)}
                        disabled={mutation.isPending || !replyInputs[question._id]?.trim()}
                      >
                        {mutation.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
}

export default Page;