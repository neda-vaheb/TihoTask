"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

function UserPost({ id }) {
  const [userPost, setUserPost] = useState([]);
  const { data } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setUserPost(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="font-bold border-b border-b-gray-300 p-2 my-2">Post</h2>

      <div className="border border-gray-300 p-4 my-8">
        <h4 className="font-bold text-center leading-10">{userPost.title}</h4>
        <p className="text-gray-500">{userPost.body}</p>
      </div>
    </div>
  );
}

export default UserPost;
