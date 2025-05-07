"use client";

import UserDetail from "@/components/moduls/UserDetail";
import UserPost from "@/components/moduls/PostDetail";

import Link from "next/link";
import { useParams } from "next/navigation";

function Page() {
  const { userId } = useParams();

  return (
    <div className="w-full  h-[100vh]">
      <div className=" md:w-[1000px] w-fit mx-auto h-fit my-[20px] border border-gray-300 p-8 rounded-sm shadow-2xs">
        <UserDetail id={userId} />
        <UserPost id={userId} />
        <div className="flex gap-3.5 justify-end">
          <Link
            className="bg-[#375559] hover:bg-[#89AEB2] transition text-white p-2 rounded-sm"
            href="/"
          >
            HomePage
          </Link>
          <Link
            className="border border-[#375559] hover:bg-[#89AEB2] hover:text-white transition text-black p-2 rounded-sm"
            href="/users"
          >
            Users List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
