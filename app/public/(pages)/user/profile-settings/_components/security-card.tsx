"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Lock, RotateCcw } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import { changePassword } from "@/service/user/profile.service";

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialPasswordForm: PasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function SecurityCard() {
  const [passwordForm, setPasswordForm] =
    useState<PasswordFormState>(initialPasswordForm);
  const [isSaving, setIsSaving] = useState(false);

  const isPasswordFormEmpty =
    !passwordForm.currentPassword &&
    !passwordForm.newPassword &&
    !passwordForm.confirmPassword;

  const isSubmitDisabled =
    isSaving ||
    !passwordForm.currentPassword ||
    !passwordForm.newPassword ||
    !passwordForm.confirmPassword;

  const handlePasswordChange = (
    field: keyof PasswordFormState,
    value: string,
  ) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangePassword = async () => {
    if (isSubmitDisabled) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      setIsSaving(true);

      const response = await changePassword(passwordForm);

      toast.success(response.message);
      setPasswordForm(initialPasswordForm);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Unable to change password.",
        );
        return;
      }

      toast.error("Unable to change password.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.18em]">
          Security
        </h3>

        <Button
          rounded="full"
          size="sm"
          disabled={isSubmitDisabled || isPasswordFormEmpty}
          onClick={handleChangePassword}
          className="text-xs font-bold"
        >
          {isSaving ? "Saving..." : "Modify"}
        </Button>
      </div>

      <div className="mt-5 space-y-4 rounded-xl bg-[#EAF3EF] p-4 dark:bg-[#101915]">
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#10201B]/45 dark:text-white/35">
            Old Password
          </label>

          <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
            <Lock size={14} className="text-[#10201B]/35 dark:text-white/35" />
            <input
              type="password"
              value={passwordForm.currentPassword}
              placeholder="••••••••••••"
              onChange={(event) =>
                handlePasswordChange("currentPassword", event.target.value)
              }
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/40 dark:placeholder:text-white/50"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#10201B]/45 dark:text-white/35">
            New Password
          </label>

          <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
            <RotateCcw
              size={14}
              className="text-[#10201B]/35 dark:text-white/35"
            />
            <input
              type="password"
              value={passwordForm.newPassword}
              placeholder="••••••••••••"
              onChange={(event) =>
                handlePasswordChange("newPassword", event.target.value)
              }
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/40 dark:placeholder:text-white/50"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#10201B]/45 dark:text-white/35">
            Confirm Password
          </label>

          <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
            <RotateCcw
              size={14}
              className="text-[#10201B]/35 dark:text-white/35"
            />
            <input
              type="password"
              value={passwordForm.confirmPassword}
              placeholder="••••••••••••"
              onChange={(event) =>
                handlePasswordChange("confirmPassword", event.target.value)
              }
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/40 dark:placeholder:text-white/50"
            />
          </div>
        </div>

        <button
          type="button"
          className="cursor-pointer text-xs font-bold uppercase tracking-[0.16em] text-secondary"
        >
          Forgot Password?
        </button>
      </div>
    </Card>
  );
}