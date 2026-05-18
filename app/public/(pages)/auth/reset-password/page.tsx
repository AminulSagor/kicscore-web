"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import OtpVerificationForm from "@/app/public/(pages)/auth/_components/otp-verification-form";
import { forgotPassword } from "@/service/auth/forgot-password.service";
import { verifyEmail } from "@/service/auth/verify-email.service";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [isLoading, setIsLoading] = useState(false);

  //======= Verify reset OTP =======//
  const handleVerifyResetOtp = async (otp: string) => {
    if (!email) {
      router.replace("/public/auth/forgot-password");
      return;
    }

    try {
      setIsLoading(true);

      const response = await verifyEmail({ email, otp });

      toast.success(response.message || "Code verified successfully");

      router.push(
        `/public/auth/set-new-password?email=${encodeURIComponent(
          email,
        )}&otp=${encodeURIComponent(otp)}`,
      );
    } catch {
      toast.error("Invalid reset code");
    } finally {
      setIsLoading(false);
    }
  };

  //======= Resend reset OTP =======//
  const handleResendResetOtp = async () => {
    if (!email) return;

    try {
      const response = await forgotPassword({ email });
      toast.success(response.message || "Reset code sent successfully");
    } catch {
      toast.error("Failed to resend reset code");
    }
  };

  if (!email) {
    router.replace("/public/auth/forgot-password");
    return null;
  }

  return (
    <OtpVerificationForm
      title="Reset your"
      highlightedTitle="password"
      email={email}
      isLoading={isLoading}
      onVerify={handleVerifyResetOtp}
      onResend={handleResendResetOtp}
    />
  );
}
