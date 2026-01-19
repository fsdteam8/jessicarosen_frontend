"use client";

import ResourceForm from '@/components/AddResourceForm';
import SetupStripePage from './setupStripe';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="p-4 space-y-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-5/6 animate-pulse"></div>
        </div>
    );
};

const AddResourceComponent = () => {
    const { data: session, status } = useSession();
    const token = session?.user?.accessToken;

    const { data: me, isLoading, isError, error } = useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            if (!token) throw new Error("No token available");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/${session?.user?.id}`, 
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            return await response.json();
        },
        enabled: !!token,
        retry: false,
    });

    if (status === "loading" || isLoading) {
        return <SkeletonLoader />;
    }

    if (isError) {
        return <p className="text-red-500">Error: {error.message}</p>;
    }

    const hasStripe = me?.data?.stripeAccountId;

    return (
        <div>
            {hasStripe ? <ResourceForm /> : <SetupStripePage />}
        </div>
    );
};

export default AddResourceComponent;
