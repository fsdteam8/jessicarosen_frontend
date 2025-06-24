//ts-ignore-file
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star} from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
}

interface ReviewItem {
  _id: string
  userId: User
  rating: number
  comment: string
  createdAt: string
}

interface RatingBreakdown {
  1: number
  2: number
  3: number
  4: number
  5: number
}

interface ReviewsApiResponse {
  averageRating: number
  ratingBreakdown: RatingBreakdown
  reviews: ReviewItem[]
  totalReviews: number
}

interface ReviewFormData {
  rating: number
  comment: string
  resourceId: string
  userId: string
}

interface ReviewsProps {
  resourceId: string
  userId: string
}

// API function to submit review
const submitReview = async (reviewData: ReviewFormData): Promise<ReviewItem> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  })

  if (!response.ok) {
    throw new Error("Failed to submit review")
  }

  return response.json()
}

function StarRating({
  rating,
  size = "sm",
  interactive = false,
  onRatingChange,
}: {
  rating: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
}) {
  const starSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          } ${interactive ? "cursor-pointer hover:fill-yellow-300" : ""}`}
          onClick={interactive ? () => onRatingChange?.(star) : undefined}
        />
      ))}
    </div>
  )
}

function WriteReviewModal({ resourceId, userId }: { resourceId: string; userId: string }) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", resourceId] })
      // Reset form and close modal
      setRating(0)
      setComment("")
      setOpen(false)
    },
    onError: (error) => {
      console.error("Error submitting review:", error)
    },
  })

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    if (!comment.trim()) {
      alert("Please enter a comment")
      return
    }

    console.log("userId", userId)

    const formData: ReviewFormData = {
      rating,
      comment: comment.trim(),
      resourceId,
      userId,
    }

    console.log("Form data:", formData)
    mutation.mutate(formData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center space-x-2">
              <StarRating rating={rating} size="lg" interactive={true} onRatingChange={setRating} />
              <span className="text-sm text-gray-600">
                {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Reviews({ resourceId, userId }: ReviewsProps) {
  console.log("resourceId", resourceId)
  console.log("userId", userId)

  const { data, isLoading, error } = useQuery<ReviewsApiResponse>({
    queryKey: ["reviews", resourceId],
    queryFn: async (): Promise<ReviewsApiResponse> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/get-all-reviews-resource/${resourceId}?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      if (!res.ok) {
        throw new Error("Failed to fetch reviews")
      }

      const response = await res.json()
      return response.data
    },
  })


  if (isLoading) {
    return (
      <div className="w-full container mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full container mx-auto">
        <div className="text-center py-8">
          <p className="text-red-600">Error loading reviews. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="w-full container mx-auto">
        <div className="text-center py-8">
          <p className="text-gray-600">No reviews available.</p>
        </div>
      </div>
    )
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
  }

  // Helper function to get user initials
  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  // Helper function to get full name
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`
  }

  return (
    <div className="w-full container mx-auto">
      {/* Overall Rating Section */}
      <div className="mb-8">
        <CardContent className="">
          <div className="flex justify-between gap-20">
            {/* Rating Summary */}
            <div className="space-y-4 w-[30%]">
              <p className="text-3xl font-semibold leading-[120%]">Review</p>
              <div className="flex items-center space-x-2">
                <StarRating rating={Math.round(data.averageRating)} size="lg" />
                <span className="text-3xl font-bold">{data.averageRating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600">Based on {data.totalReviews?.toLocaleString()} reviews</p>

              {/* Star Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = data.ratingBreakdown?.[stars as keyof RatingBreakdown] || 0
                  const percentage = data.totalReviews > 0 ? (count / data.totalReviews) * 100 : 0

                  return (
                    <div key={stars} className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-16">
                        {stars} Star{stars !== 1 ? "s" : ""}
                      </span>
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Reviews Section */}
      <div className="mb-6 flex items-center  justify-end gap-10">
        <WriteReviewModal resourceId={resourceId} userId={userId} />
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6 container">
        {data.reviews.length > 0 ? (
          data.reviews.map((review) => (
            <Card key={review._id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={review.userId.profileImage || "/placeholder.svg"}
                      alt={getFullName(review.userId.firstName, review.userId.lastName)}
                    />
                    <AvatarFallback className="bg-gray-500 text-white">
                      {getUserInitials(review.userId.firstName, review.userId.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {getFullName(review.userId.firstName, review.userId.lastName)}
                      </h4>
                      <span className="text-gray-500 text-sm">{formatDate(review.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                      <StarRating rating={review.rating} size="sm" />
                      <span className="font-medium text-gray-900">
                        {review.rating} star{review.rating !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  )
}
