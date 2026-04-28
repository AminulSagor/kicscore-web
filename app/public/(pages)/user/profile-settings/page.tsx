"use client";

import { useState } from "react";

import Button from "@/components/UI/buttons/button";
import ProfileHeaderCard from "@/app/public/(pages)/user/profile-settings/_components/profile-header-card";
import EditProfileCard from "@/app/public/(pages)/user/profile-settings/_components/edit-profile-card";
import GeneralSettingsCard from "@/app/public/(pages)/user/profile-settings/_components/general-settings-card";
import SecurityCard from "@/app/public/(pages)/user/profile-settings/_components/security-card";
import DangerZoneCard from "@/app/public/(pages)/user/profile-settings/_components/danger-zone-card";

export default function SettingsPage() {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <main className="px-4 py-8 text-foreground">
      <section className="mx-auto w-full">
        <h1 className="mb-7 text-lg font-bold text-[#10201B] dark:text-white">
          Settings
        </h1>

        <ProfileHeaderCard />

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <EditProfileCard onChange={() => setIsDirty(true)} />
          <GeneralSettingsCard onChange={() => setIsDirty(true)} />
          <SecurityCard onChange={() => setIsDirty(true)} />
          <DangerZoneCard />
        </div>

        {isDirty && (
          <p className="mt-7 text-xs font-semibold text-orange">
            Changes have been made here, press save changes to apply
          </p>
        )}

        <Button
          disabled={!isDirty}
          className="mt-5 h-11 w-full text-xs font-bold"
          rounded="full"
        >
          Save Changes
        </Button>
      </section>
    </main>
  );
}
