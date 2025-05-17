"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Search from "../moduls/Search";
import Loader from "@/app/Loader";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

function PostList({ posts, isLoading, error }) {
  const router = useRouter();
  const limit = 20;
  const mySearchParams = useSearchParams();
  const page = mySearchParams.get("page") || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatePosts = posts.slice(startIndex, endIndex);

  const postsHandler = (id) => {
    router.push(`/posts/${id}`);
  };
  // const deletecHandler = (id) => {
  //   const { data } = useQuery({
  //     queryKey: ["post", id],
  //     queryFn: async () => {
  //       const res = await axios.delete(
  //         `https://jsonplaceholder.typicode.com/posts/${id}`
  //       );

  //       return res.data;
  //     },
  //   });
  // };
  return (
    <div className="overflow-x-auto p-4  ">
      <Table>
        <TableCaption>A list of Posts</TableCaption>
        <TableHeader className="bg-[#89AEB2] rounded-md">
          <TableRow>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Details</TableHead>

            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan="3" className="px-6 py-4 ">
                <Loader />
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell
                colSpan="3"
                className="px-6 py-4 text-center text-sm text-red-500"
              >
                Error loading users
                {error.message}
              </TableCell>
            </TableRow>
          )}

          {paginatePosts.map((posts) => (
            <TableRow key={posts.id}>
              <TableCell className="text-left cursor-pointer font-bold text-[14px] md:text-[1.2rem]">
                {posts.title.split(" ").slice(0, 2).join(" ")}...
              </TableCell>
              <TableCell className="md:py-3 py-1 cursor-pointer text-left text-[12px] md:text-[1rem]">
                {posts.body.split(" ").slice(0, 4).join(" ")}...
              </TableCell>

              <Button
                onClick={() => postsHandler(posts.id)}
                className="cursor-pointer hover:bg-[#89AEB2] bg-[#375559] text-white "
              >
                See Details
              </Button>
              <Button
                className="cursor-pointer"
                variant={Link}
                onClick={() => postsHandler(posts.id)}
              >
                <FaRegEdit className="text-[#375559] " />
              </Button>
              <Button
                variant={Link}
                className="cursor-pointer"
                onClick={() => deletecHandler(posts.id)}
              >
                <FaRegTrashAlt className="text-red-500 " />
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PostList;
