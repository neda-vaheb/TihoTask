"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Search from "../moduls/Search";
import Loader from "@/app/Loader";
import { useRouter } from "next/navigation";

function PostList({ posts, isLoading, error }) {
  const router = useRouter();
  const limit = 5;
  const mySearchParams = useSearchParams();
  const page = mySearchParams.get("page") || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatePosts = posts.slice(startIndex, endIndex);

  const postsHandler = (id) => {
    router.push(`/posts/${id}`);
  };
  return (
    <div className="overflow-x-auto p-4  ">
      {isLoading && <Loader />}
      {error && (
        <p>
          Error loading users
          {error.message}
        </p>
      )}
      <div className="flex gap-[20px] flex-wrap justify-center items-center">
        {paginatePosts.map((posts) => (
          <div
            key={posts.id}
            className="hover:text-gray-500 transition border border-gray-400 w-[350px] h-[260px] p-4 rounded-md shadow-md"
            onClick={() => postsHandler(posts.id)}
          >
            <h3 className="text-center cursor-pointer font-bold">
              {posts.title}
            </h3>
            <p className="py-3 cursor-pointer text-center ">{posts.body}</p>

            <button
              onClick={() => postsHandler(posts.id)}
              className="cursor-pointer hover:bg-[#89AEB2] bg-[#375559] text-white my-3 px-2 rounded-sm"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
