"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import PostList from "@/components/template/posts/PostsList";

function PostsPage() {
  const [posts, setposts] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 2;

  const fetchData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    if (!res.data) throw new Error("Failed to fetch posts");
    setposts(res.data);
    return res.data;
  };
  const { error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });


  return (
    <div className="p-4 m-auto flex flex-col justify-center items-center  h-[100vh] w-full">
      <PostList posts={posts} setposts={setposts} error={error} isLoading={isLoading} />
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-md ${
            page <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#375559] text-white hover:bg-[#89AEB2]"
          }`}
          disabled={page <= 1}
          onClick={() => {
            router.push(`/posts/?page=${page - 1}&per_page=${perPage}`);
          }}
        >
          Previous
        </button>

        <span className="mx-2">
          {page} / {perPage}
        </span>

        <button
          className={`px-4 py-2 rounded-md ${
            page >= perPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#375559] text-white hover:bg-[#89AEB2]"
          }`}
          disabled={page >= perPage}
          onClick={() => {
            router.push(`/posts/?page=${page + 1}&per_page=${perPage}`);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostsPage;
