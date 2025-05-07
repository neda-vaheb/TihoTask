"use client"
import UserPost from '@/components/moduls/PostDetail';
import Link from 'next/link';
import { useParams } from 'next/navigation';

function page() {
    const { postId } = useParams();
   
  return (
    <div className='w-[1000px] h-[100vh] m-auto'>
       <UserPost id={postId}/>
       <div className="flex gap-3.5 justify-end">
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
  )
}

export default page
