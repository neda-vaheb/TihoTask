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
            className="hover:text-gray-500 transition flex flex-col justify-between border border-gray-400 w-[250px] md:w-[350px] h-[270px] p-4 rounded-md shadow-md"
            onClick={() => postsHandler(posts.id)}
          >
            <h3 className="text-center cursor-pointer font-bold text-[14px] md:text-[1.2rem]">
              {posts.title}
            </h3>
            <p className="md:py-3 py-1 cursor-pointer text-center text-[12px] md:text-[1rem]">{posts.body.split(" ").slice(0,8).join(" ")}...</p>

            <button
              onClick={() => postsHandler(posts.id)}
              className="cursor-pointer hover:bg-[#89AEB2] bg-[#375559] text-white md:my-3 my-1 text-[12px] md:text-[1rem] px-2 rounded-sm"
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
