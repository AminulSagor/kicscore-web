"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import { signin } from "@/service/auth/signin.service";
import { signinSchema, SigninFormValues } from "@/schema/auth/signin.schema";
import { setAccessToken } from "@/utils/token/cookie.utils";
import ButtonLoader from "@/components/UI/loaders/button-loader";
import { authStore } from "@/z_store/auth/auth.store";

type SigninErrors = Partial<Record<keyof SigninFormValues, string>>;

const initialFormValues: SigninFormValues = {
  email: "",
  password: "",
};

export default function SignInPage() {
  const router = useRouter();
  const setAuthUser = authStore((state) => state.setAuthUser);

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] =
    useState<SigninFormValues>(initialFormValues);
  const [errors, setErrors] = useState<SigninErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  //======= Update field value =======//
  const handleFieldChange = (field: keyof SigninFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  //======= Validate form =======//
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedFields = signinSchema.safeParse(formValues);

    if (!validatedFields.success) {
      const fieldErrors: SigninErrors = {};

      validatedFields.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof SigninFormValues;
        fieldErrors[fieldName] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);

      const response = await signin(validatedFields.data);
      setAccessToken(response.data.token.accessToken);
      setAuthUser(response.data.user);

      toast.success(response.message || "Signed in successfully");

      if (response.data.user.role === "ADMIN") {
        router.push("/dashboards/admin/home");
        return;
      }

      router.push("/public/home");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center px-4 py-10 text-foreground">
      <section
        className="
          w-full max-w-122 rounded-2xl border border-[#DDE8E3]
          bg-white px-6 py-10 shadow-sm
          dark:border-white/10 dark:bg-[#111d1a]
          sm:px-7 md:px-8
        "
      >
        <div className="mb-9 text-center">
          <h1 className="text-base font-bold text-[#10201B] dark:text-white sm:text-lg lg:text-2xl">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-secondary dark:text-mint-green/80">
            Sign in to your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B] dark:text-white/80">
              Email Address
            </label>

            <div
              className="
                flex h-12 items-center gap-3 rounded-xl
                bg-[#EAF3EF] px-4 text-[#10201B]
                dark:bg-[#25302B] dark:text-white
              "
            >
              <Mail size={18} className="text-secondary" />
              <input
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  handleFieldChange("email", event.target.value)
                }
                placeholder="name@example.com"
                className="
                  h-full w-full bg-transparent text-sm outline-none
                  placeholder:text-[#10201B]/35
                  dark:placeholder:text-white/20
                "
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B] dark:text-white/80">
              Password
            </label>

            <div
              className="
                flex h-12 items-center gap-3 rounded-xl
                bg-[#EAF3EF] px-4 text-[#10201B]
                dark:bg-[#25302B] dark:text-white
              "
            >
              <Lock size={18} className="text-secondary" />

              <input
                type={showPassword ? "text" : "password"}
                value={formValues.password}
                onChange={(event) =>
                  handleFieldChange("password", event.target.value)
                }
                placeholder="••••••••"
                className="
                  h-full w-full bg-transparent text-sm outline-none
                  placeholder:text-[#10201B]/35
                  dark:placeholder:text-white/20
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-secondary transition hover:opacity-80"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-xs font-medium text-red-500">
                {errors.password}
              </p>
            )}

            <div className="mt-2 flex justify-end">
              <button
                type="button"
                className="text-xs font-semibold text-secondary transition hover:opacity-80 dark:text-mint-green"
              >
                Forgot password?
              </button>
            </div>
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
                Signing In
                <ButtonLoader size="sm" />
              </>
            ) : (
              <>
                Sign In
                <LogIn size={15} />
              </>
            )}
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-[#10201B]/60 dark:text-white/55">
          New to Fotgram?{" "}
          <button
            type="button"
            className="font-bold text-secondary transition hover:opacity-80 dark:text-mint-green"
          >
            <Link href={"/public/auth/sign-up"}>Create Account</Link>
          </button>
        </p>
      </section>
    </main>
  );
}
