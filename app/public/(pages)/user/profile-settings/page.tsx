"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import ProfileHeaderCard from "@/app/public/(pages)/user/profile-settings/_components/profile-header-card";
import EditProfileCard from "@/app/public/(pages)/user/profile-settings/_components/edit-profile-card";
import GeneralSettingsCard from "@/app/public/(pages)/user/profile-settings/_components/general-settings-card";
import SecurityCard from "@/app/public/(pages)/user/profile-settings/_components/security-card";
import DangerZoneCard from "@/app/public/(pages)/user/profile-settings/_components/danger-zone-card";
import { updateProfile } from "@/service/user/profile.service";
import { authStore } from "@/z_store/auth/auth.store";

export default function SettingsPage() {
  const user = authStore((state) => state.user);
  const setAuthUser = authStore((state) => state.setAuthUser);

  const [fullName, setFullName] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFullName(user?.fullName || "");
  }, [user?.fullName]);

  const handleFullNameChange = (value: string) => {
    setFullName(value);
    setIsDirty(value.trim() !== (user?.fullName || ""));
  };

  const handleSaveChanges = async () => {
    if (!user || !fullName.trim()) return;

    try {
      setIsSaving(true);

      const response = await updateProfile({
        fullName: fullName.trim(),
      });

      setAuthUser({
        ...user,
        fullName: response.data.fullName,
      });

      setIsDirty(false);
      toast.success(response.message);
    } catch {
      toast.error("Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="py-4 text-foreground md:py-8">
      <section className="mx-auto w-full">
        <h1 className="mb-7 text-lg font-bold text-[#10201B] dark:text-white">
          Settings
        </h1>

        <ProfileHeaderCard />

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <EditProfileCard
            fullName={fullName}
            onFullNameChange={handleFullNameChange}
          />
          <GeneralSettingsCard />
          <SecurityCard />
          <DangerZoneCard />
        </div>

        {isDirty && (
          <p className="mt-7 text-xs font-semibold text-orange">
            Changes have been made here, press save changes to apply
          </p>
        )}

        <Button
          disabled={!isDirty || isSaving}
          onClick={handleSaveChanges}
          className="mt-5 h-11 w-full text-xs font-bold"
          rounded="full"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </section>
    </main>
  );
}