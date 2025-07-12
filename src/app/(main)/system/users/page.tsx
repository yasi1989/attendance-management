import { Suspense } from "react";
import UsersContainer from "./container";
import CommonSkeleton from "@/components/CommonSkeleton";

const UsersPage = () => {
  return (
    <Suspense fallback={<CommonSkeleton />}>
      <UsersContainer />
    </Suspense>
  )
};

export default UsersPage;
