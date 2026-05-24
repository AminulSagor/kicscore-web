"use client";

import { Save } from "lucide-react";

import AdminAvatarSection from "@/app/dashboards/admin/(pages)/profile/_components/admin-avatar-section";
import AdminPersonalInformationSection from "@/app/dashboards/admin/(pages)/profile/_components/admin-personal-information-section";
import AdminSecuritySection from "@/app/dashboards/admin/(pages)/profile/_components/admin-security-section";
import { useAdminProfileSettings } from "@/app/dashboards/admin/(pages)/profile/_hooks/use-admin-profile-settings";
import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";

export default function AdminProfileSettingsPage() {
  const {
    email,
    fileInputRef,
    fullName,
    savedProfilePhotoUrl,
    previewImageUrl,
    currentPassword,
    newPassword,
    isLoading,
    isUpdating,
    isUploadingPhoto,
    setFullName,
    setCurrentPassword,
    setNewPassword,
    handleProfilePhotoChange,
    handleUpdateProfile,
  } = useAdminProfileSettings();

  return (
    <section className="text-[#10201B] dark:text-white">
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">
          Admin Profile Settings
        </h1>
        <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">
          Manage your administrative identity and security credentials.
        </p>
      </div>

      <Card
        variant="white"
        shadow="none"
        className="mt-8 border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
      >
        {isLoading ? (
          <p className="text-sm text-[#6B7A75] dark:text-white/45">
            Loading profile...
          </p>
        ) : (
          <>
            <AdminAvatarSection
              fileInputRef={fileInputRef}
              previewImageUrl={previewImageUrl}
              savedProfilePhotoUrl={savedProfilePhotoUrl}
              isUploadingPhoto={isUploadingPhoto}
              onProfilePhotoChange={handleProfilePhotoChange}
            />

            <div className="my-8 h-px bg-[#DDE8E3] dark:bg-white/10" />

            <AdminPersonalInformationSection
              fullName={fullName}
              email={email}
              onFullNameChange={(event) => setFullName(event.target.value)}
            />

            <div className="my-8 h-px bg-[#DDE8E3] dark:bg-white/10" />

            <AdminSecuritySection
              currentPassword={currentPassword}
              newPassword={newPassword}
              onCurrentPasswordChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              onNewPasswordChange={(event) =>
                setNewPassword(event.target.value)
              }
            />

            <div className="mt-10 flex justify-end">
              <Button
                size="base"
                disabled={isUpdating || isUploadingPhoto}
                onClick={handleUpdateProfile}
                className="min-w-[170px] text-sm font-bold"
              >
                <Save size={15} />
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </>
        )}
      </Card>
    </section>
  );
}