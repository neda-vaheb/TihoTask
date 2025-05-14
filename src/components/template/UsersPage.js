"use client";
import { useRouter, useSearchParams } from "next/navigation";

import UserList from "./UserList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("per_page")) || 2;

  const fetchData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    if (!res.data) throw new Error("Failed to fetch users");
    setUsers(res.data);
    return res.data;
  };
  const { error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });

  return (
    <div className="p-4 m-auto flex flex-col justify-center items-center  h-[100vh] w-full">
      <UserList
        users={users}
        setUsers={setUsers}
        error={error}
        isLoading={isLoading}
      />
      <div className="flex justify-center items-center gap-4 md:mt-4">
        <Button
          className={`md:px-4 px-2 md:py-2 py-1 rounded-md text-[12px] md:text-[16px] ${
            page <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#375559] text-white hover:bg-[#89AEB2]"
          }`}
          disabled={page <= 1}
          onClick={() => {
            router.push(`/users/?page=${page - 1}&per_page=${perPage}`);
          }}
        >
          Previous
        </Button>

        <span className="mx-2">
          {page} / {perPage}
        </span>

        <Button
          className={`md:px-4 px-2 md:py-2 py-1 rounded-md text-[12px] md:text-[16px] ${
            page >= perPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#375559] text-white hover:bg-[#89AEB2]"
          }`}
          disabled={page >= perPage}
          onClick={() => {
            router.push(`/users/?page=${page + 1}&per_page=${perPage}`);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default UsersPage;
