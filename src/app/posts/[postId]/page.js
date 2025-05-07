"use client";
import PostDetail from "@/components/moduls/PostDetail";

import Link from "next/link";
import { useParams } from "next/navigation";

function Page() {
  const { postId } = useParams();

  return (
    <div className="md:w-[1000px] h-[100vh] m-auto w-auto">
      <PostDetail id={postId} />
      <div className="flex gap-3.5 md:justify-end justify-center ">
        <Link
          className="bg-[#375559] hover:bg-[#89AEB2] transition text-white p-2 rounded-sm"
          href="/"
        >
          HomePage
        </Link>
        <Link
          className="border border-[#375559] hover:bg-[#89AEB2] hover:text-white transition text-black p-2 rounded-sm"
          href="/posts"
        >
          Posts List
        </Link>
      </div>
    </div>
  );
}

export default Page;
