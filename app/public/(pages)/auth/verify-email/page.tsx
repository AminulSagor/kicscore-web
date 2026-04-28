"use client";

import OtpVerificationForm from "@/app/public/(pages)/auth/_components/otp-verification-form";

export default function VerifyEmailPage() {
  return (
    <OtpVerificationForm
      title="Verify your"
      highlightedTitle="email"
      email="user@email.com"
      onVerify={(code) => console.log("Verify Email OTP:", code)}
    />
  );
}
