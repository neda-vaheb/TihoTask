"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Search from "../moduls/Search";
import Loader from "@/app/Loader";
import { useRouter } from "next/navigation";

function UserList({ users, isLoading, error }) {
  const [search, setSearch] = useState("");
  const [searchFiled, setSearchFiled] = useState("name");
  const [filterUser, SetFilterUser] = useState([]);
  const router = useRouter();
  const limit = 5;
  const mySearchParams = useSearchParams();
  const page = mySearchParams.get("page") || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginateUsers = filterUser.slice(startIndex, endIndex);

  useEffect(() => {
    const results = users.filter((user) => {
      const fieldValue = user[searchFiled].toLowerCase();
      return fieldValue.includes(search.toLowerCase());
    });
    SetFilterUser(results);
  }, [search, searchFiled, users]);
  const userHandler = (id) => {
    router.push(`/users/${id}`);
  };
  return (
    <div className="overflow-x-scroll p-4">
      {/* search */}
      <Search
        search={search}
        setSearch={setSearch}
        searchFiled={searchFiled}
        setSearchFiled={setSearchFiled}
      />

      {/* table */}

      <table className="table  border-collapse border border-gray-400 table-auto  w-auto overflow-x-scroll md:w-[1000px] m-auto my-8">
        <thead className="bg-[#89AEB2] text-base-content text-left text-white">
          <tr className="bg-primary dark:bg-transparent ">
            <th className="px-4 py-4">UserId</th>
            <th className="px-4 py-4">Name</th>
            <th className="px-4 py-4">Company</th>
            <th className="px-4 py-4">Email</th>
            <th className="px-4 py-4"></th>
          </tr>
        </thead>
        <tbody className="border border-gray-400">
          {isLoading && (
            <tr>
              <td colSpan="5" className="px-6 py-4 ">
                <Loader />
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-sm text-red-500"
              >
                Error loading users
                {error.message}
              </td>
            </tr>
          )}
          {filterUser.length > 0 ? (
            paginateUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:text-gray-500 transition border border-gray-400"
                onClick={() => userHandler(user.id)}
              >
                <td className="px-4 py-2 cursor-pointer hover:opacity-40 transition-all">
                  {user.id}
                </td>
                <td className="px-4 py-2 cursor-pointer">{user.name}</td>
                <td className="px-4 py-2 cursor-pointer">
                  {user.company.name}
                </td>
                <td className="px-4 py-2  cursor-pointer">
                  <Link
                    href={`mailto:${user.email}`}
                    className="link link-hover"
                  >
                    {user.email}
                  </Link>
                </td>
                <td className="px-4 py-2  cursor-pointer">
                  <button
                    onClick={() => userHandler(user.id)}
                    className="cursor-pointer hover:bg-[#89AEB2] bg-[#375559] text-white px-2 rounded-sm"
                  >
                    See Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                User not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
