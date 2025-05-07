import UsersPage from "@/components/template/UsersPage";
import { Suspense } from "react";
import Loader from "../Loader";

function page() {
 
  return (
    <Suspense fallback={<div><Loader/></div>}>
<UsersPage />
    </Suspense>
  );
}

export default page;
