import FollowingClient from "@/app/public/(pages)/user/following/_components/following-client";
import { Suspense } from "react";

export default function FollowingPage() {
  return (
    <Suspense fallback={null}>
      <FollowingClient />
    </Suspense>
  );
}
