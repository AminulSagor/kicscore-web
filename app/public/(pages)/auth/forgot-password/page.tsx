"use client";

import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/schema/auth/forgot-password.schema";
import { forgotPassword } from "@/service/auth/forgot-password.service";

type ForgotPasswordErrors = Partial<
  Record<keyof ForgotPasswordFormValues, string>
>;

const initialFormValues: ForgotPasswordFormValues = {
  email: "",
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [formValues, setFormValues] =
    useState<ForgotPasswordFormValues>(initialFormValues);
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  //======= Update field value =======//
  const handleFieldChange = (
    field: keyof ForgotPasswordFormValues,
    value: string,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  //======= Send reset code =======//
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedFields = forgotPasswordSchema.safeParse(formValues);

    if (!validatedFields.success) {
      const fieldErrors: ForgotPasswordErrors = {};

      validatedFields.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ForgotPasswordFormValues;
        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);

      const response = await forgotPassword({
        email: validatedFields.data.email.trim(),
      });

      toast.success(response.message || "Reset code sent successfully");

      router.push(
        `/public/auth/reset-password?email=${encodeURIComponent(
          validatedFields.data.email.trim(),
        )}`,
      );
    } catch {
      toast.error("Failed to send reset code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center px-4 py-10 text-foreground">
      <section
        className="
          w-full max-w-121.5 rounded-[28px] border border-[#DDE8E3]
          bg-white px-6 py-10 shadow-sm
          dark:border-white/10 dark:bg-[#111d1a]
          sm:px-7 md:px-8
        "
      >
        <div className="mb-8 text-center">
          <h1 className="text-lg font-bold text-[#10201B] dark:text-white lg:text-2xl">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-secondary dark:text-mint-green/80">
            Enter your email to receive reset code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B] dark:text-white/80"
            >
              Email Address
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl bg-[#EAF3EF] px-4 text-[#10201B] dark:bg-[#25302B] dark:text-white">
              <Mail size={18} className="text-secondary" />

              <input
                id="email"
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  handleFieldChange("email", event.target.value)
                }
                placeholder="name@example.com"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/35 dark:placeholder:text-white/30"
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <Button
            type="submit"
            rounded="full"
            size="md"
            disabled={isLoading}
            className="mt-8 h-12 w-full text-xs font-bold uppercase tracking-[0.12em]"
          >
            {isLoading ? (
              <>
                Sending Code
                <ButtonLoader size="sm" />
              </>
            ) : (
              <>
                Send Code
                <ArrowRight size={15} />
              </>
            )}
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-[#10201B]/60 dark:text-white/55">
          Remember password?{" "}
          <Link
            href="/public/auth/sign-in"
            className="font-bold text-secondary transition hover:opacity-80 dark:text-mint-green"
          >
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}
