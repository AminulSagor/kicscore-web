"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import OtpVerificationForm from "@/app/public/(pages)/auth/_components/otp-verification-form";
import { resendOtp } from "@/service/auth/resend-otp.service";
import { verifyEmail } from "@/service/auth/verify-email.service";
import { setAccessToken } from "@/utils/token/cookie.utils";
import { authStore } from "@/z_store/auth/auth.store";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const setAuthUser = authStore((state) => state.setAuthUser);

  const [isLoading, setIsLoading] = useState(false);

  //======= Verify email =======//
  const handleVerifyEmail = async (otp: string) => {
    if (!email) {
      router.replace("/public/auth/sign-up");
      return;
    }

    try {
      setIsLoading(true);

      const response = await verifyEmail({ email, otp });

      setAccessToken(response.data.token.accessToken);
      setAuthUser(response.data.user);

      toast.success(response.message || "Email verified successfully");
      router.push("/public/auth/verify-profile");
    } catch {
      toast.error("Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  //======= Resend OTP =======//
  const handleResendOtp = async () => {
    if (!email) return;

    try {
      const response = await resendOtp({ email });
      toast.success(response.message || "OTP sent successfully");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  if (!email) {
    router.replace("/public/auth/sign-up");
    return null;
  }

  return (
    <OtpVerificationForm
      title="Verify your"
      highlightedTitle="email"
      email={email}
      isLoading={isLoading}
      onVerify={handleVerifyEmail}
      onResend={handleResendOtp}
    />
  );
}
