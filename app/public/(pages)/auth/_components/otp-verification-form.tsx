"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/UI/buttons/button";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 55;

interface OtpVerificationFormProps {
  title: string;
  highlightedTitle: string;
  email: string;
  buttonText?: string;
  onVerify?: (code: string) => void;
  onResend?: () => void;
}

export default function OtpVerificationForm({
  title,
  highlightedTitle,
  email,
  buttonText = "Verify",
  onVerify,
  onResend,
}: OtpVerificationFormProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const isOtpComplete = otp.every(Boolean);

  /* ============ Handle OTP Change ============ */
  const handleChange = (value: string, index: number) => {
    const digit = value.replace(/\D/g, "");

    if (!digit) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = digit.slice(-1);
    setOtp(updatedOtp);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* ============ Handle Backspace ============ */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key !== "Backspace") return;

    if (otp[index]) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      return;
    }

    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /* ============ Handle OTP Paste ============ */
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) return;

    const updatedOtp = Array(OTP_LENGTH).fill("");

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const focusIndex =
      pastedValue.length >= OTP_LENGTH ? OTP_LENGTH - 1 : pastedValue.length;

    inputRefs.current[focusIndex]?.focus();
  };

  /* ============ Handle Resend Code ============ */
  const handleResend = () => {
    if (secondsLeft > 0) return;

    setOtp(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
    onResend?.();
  };

  /* ============ Handle Verify Code ============ */
  const handleVerify = () => {
    const code = otp.join("");
    onVerify?.(code);
  };

  return (
    <main className="flex items-center justify-center px-4 py-10 text-foreground">
      <section className="w-full max-w-77.5">
        <div>
          <h1 className="text-[26px] font-bold leading-tight text-[#10201B] dark:text-white lg:text-3xl">
            {title}
            <br />
            <span className="text-secondary">{highlightedTitle}</span>
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#6B7A75] dark:text-white/55">
            We’ve sent a 4-digit code to
            <br />
            <span className="font-semibold text-[#10201B] underline decoration-secondary underline-offset-4 dark:text-white">
              {email}
            </span>
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              value={digit}
              inputMode="numeric"
              maxLength={1}
              onChange={(event) => handleChange(event.target.value, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPaste={handlePaste}
              className="
                h-14.5 w-14.5 rounded-lg border border-transparent
                bg-[#d4e6de] text-center text-sm font-bold text-secondary
                outline-none transition
                focus:border-secondary focus:ring-2 focus:ring-secondary/20
                dark:bg-[#25302B]
              "
            />
          ))}
        </div>

        <Button
          type="button"
          rounded="xl"
          onClick={handleVerify}
          disabled={!isOtpComplete}
          className="mt-16 h-11 w-full text-xs font-bold uppercase tracking-[0.12em]"
        >
          {buttonText}
        </Button>

        <div className="mt-5 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#10201B]/50 dark:text-white/40">
            Didn’t receive the code?
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0}
            className="mt-2 text-xs text-[#6B7A75] transition enabled:hover:text-secondary disabled:cursor-not-allowed dark:text-white/50 dark:enabled:hover:text-mint-green"
          >
            Resend code{" "}
            {secondsLeft > 0 &&
              `in 00:${secondsLeft.toString().padStart(2, "0")}`}
          </button>
        </div>
      </section>
    </main>
  );
}
