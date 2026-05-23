import { Suspense } from "react";

import ChangePasswordClient from "./change-password-client";

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={null}>
      <ChangePasswordClient />
    </Suspense>
  );
}
