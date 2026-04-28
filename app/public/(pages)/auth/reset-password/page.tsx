"use client";

import OtpVerificationForm from "@/app/public/(pages)/auth/_components/otp-verification-form";

export default function ResetPasswordPage() {
  return (
    <OtpVerificationForm
      title="Reset your"
      highlightedTitle="password"
      email="user@email.com"
      onVerify={(code) => console.log("Reset Password OTP:", code)}
    />
  );
}
