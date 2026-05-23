"use client";

import { Lock, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/schema/auth/reset-password.schema";
import { resetPassword } from "@/service/auth/reset-password.service";

type ResetPasswordErrors = Partial<
  Record<keyof ResetPasswordFormValues, string>
>;

const initialFormValues: ResetPasswordFormValues = {
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const [formValues, setFormValues] =
    useState<ResetPasswordFormValues>(initialFormValues);
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  //======= Update field value =======//
  const handleFieldChange = (
    field: keyof ResetPasswordFormValues,
    value: string,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  //======= Change password =======//
  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !otp) {
      router.replace("/public/auth/forgot-password");
      return;
    }

    const validatedFields = resetPasswordSchema.safeParse(formValues);

    if (!validatedFields.success) {
      const fieldErrors: ResetPasswordErrors = {};

      validatedFields.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ResetPasswordFormValues;
        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);

      const response = await resetPassword({
        email,
        otp,
        newPassword: validatedFields.data.newPassword,
      });

      toast.success(response.message || "Password changed successfully");
      router.push("/public/auth/reset-password-success");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !otp) {
    router.replace("/public/auth/forgot-password");
    return null;
  }

  return (
    <main className="flex items-center justify-center px-4 py-10 text-foreground">
      <section className="w-full max-w-[420px]">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-[#10201B] dark:text-white lg:text-3xl">
            Verified!
          </h1>
          <p className="text-base font-bold text-secondary dark:text-mint-green">
            Set new password
          </p>
        </div>

        <form onSubmit={handleChangePassword}>
          <div className="mt-14 rounded-xl bg-[#EAF3EF] p-4 dark:bg-[#111d1a]">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B]/45 dark:text-white/35">
                New Password
              </label>

              <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
                <Lock
                  size={15}
                  className="text-[#10201B]/35 dark:text-white/35"
                />

                <input
                  type="password"
                  value={formValues.newPassword}
                  onChange={(event) =>
                    handleFieldChange("newPassword", event.target.value)
                  }
                  placeholder="••••••••••••"
                  className="h-full w-full bg-transparent text-sm text-[#10201B] outline-none placeholder:text-[#10201B]/30 dark:text-white dark:placeholder:text-white/25"
                />
              </div>

              {errors.newPassword && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B]/45 dark:text-white/35">
                Confirm Password
              </label>

              <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
                <RotateCcw
                  size={15}
                  className="text-[#10201B]/35 dark:text-white/35"
                />

                <input
                  type="password"
                  value={formValues.confirmPassword}
                  onChange={(event) =>
                    handleFieldChange("confirmPassword", event.target.value)
                  }
                  placeholder="••••••••••••"
                  className="h-full w-full bg-transparent text-sm text-[#10201B] outline-none placeholder:text-[#10201B]/30 dark:text-white dark:placeholder:text-white/25"
                />
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            rounded="full"
            disabled={isLoading}
            className="mt-20 h-11 w-full text-xs font-bold uppercase tracking-[0.12em]"
          >
            {isLoading ? (
              <>
                Changing Password
                <ButtonLoader size="sm" />
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
}
