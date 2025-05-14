"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
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
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

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
  const deleteHandler = (id) => {
    const newUsers = filterUser.filter((user) => user.id !== id);
    SetFilterUser(newUsers);
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

      <Table>
        <TableCaption>A list of Users</TableCaption>
        <TableHeader className="bg-[#89AEB2] rounded-md">
          <TableRow >
            <TableHead>UserId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan="5" className="px-6 py-4 ">
                <Loader />
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell
                colSpan="5"
                className="px-6 py-4 text-center text-sm text-red-500"
              >
                Error loading users
                {error.message}
              </TableCell>
            </TableRow>
          )}
          {filterUser.length > 0 ? (
            paginateUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-2 py-1 md:px-4 md:py-2 cursor-pointer hover:opacity-40 transition-all md:block hidden">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell>
                  <Link
                    href={`mailto:${user.email}`}
                    className="link link-hover"
                  >
                    {user.email}
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => userHandler(user.id)}
                    className="cursor-pointer hover:bg-[#89AEB2] bg-[#375559] text-white"
                  >
                    See Details
                  </Button>
                  <Button variant="link" onClick={() => deleteHandler(user.id)}>
                    <FaRegTrashAlt className="text-red-500 cursor-pointer" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan="5"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                User not found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserList;
