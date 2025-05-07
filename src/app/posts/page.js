import PostsPage from "@/components/template/PostsPage";
import { Suspense } from "react";
import Loader from "../Loader";

function Page() {
  

  return (
    <Suspense fallback={<div><Loader/></div>}>
    <PostsPage/>
    </Suspense>
  );
}

export default Page;
