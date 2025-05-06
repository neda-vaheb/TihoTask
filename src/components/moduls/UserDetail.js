"use client"
import Loader from '@/app/Loader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

function UserDetail({id}) {
    const [selectedUser, setSelectedUser] = useState([]);


    const { data, isLoading, error } = useQuery({
      queryKey: ["user", id],
      queryFn: async () => {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setSelectedUser(res.data);
        return res.data;
      },
    });
  
  
    if (isLoading) return <Loader />;
    if (error)
      return <div className="text-red-500 p-4">Error: {error.message}</div>;
  
  return (
    <>
          <h2 className="font-bold border-b border-b-gray-300 p-2">
          User Details
        </h2>
        <div className="flex flex-col gap-2 p-2">
          <p>
            Name : <span>{selectedUser.name}</span>
          </p>
          <p>
            Email : <span>{selectedUser.email}</span>
          </p>
          <p>
            Phone : <span>{selectedUser.phone}</span>
          </p>
          <p>
            Website : <span>{selectedUser.website}</span>
          </p>
          <p>
            Company : <span>{selectedUser.company.name}</span>
          </p>
          <p>
            Address : <span>{selectedUser.address.city} - {selectedUser.address.street} - {selectedUser.address.suite}  </span>
          </p>
        </div>
    </>
  )
}

export default UserDetail
