"use client";

import { AxiosError } from "axios";
import { Save, Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import { IMAGE } from "@/constants/image.path";
import {
  changeAdminPassword,
  getAdminProfile,
  updateAdminProfile,
} from "@/service/admin/profile/admin-profile.service";
import { uploadSignedFile } from "@/service/files/signed-upload.service";
import { AdminProfileUser } from "@/types/admin/profile/admin-profile.types";

export default function AdminProfileSettingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [adminProfile, setAdminProfile] = useState<AdminProfileUser | null>(
    null,
  );
  const [fullName, setFullName] = useState("");
  const [profilePhotoFileId, setProfilePhotoFileId] = useState<string | null>(
    null,
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await getAdminProfile();

        setAdminProfile(response.data);
        setFullName(response.data.profile?.fullName ?? "");
        setProfilePhotoFileId(response.data.profile?.profilePhotoFileId ?? null);
      } catch {
        toast.error("Failed to load admin profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleProfilePhotoChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxFileSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or GIF files are allowed");
      return;
    }

    if (file.size > maxFileSize) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewImageUrl(localPreviewUrl);

    try {
      setIsUploadingPhoto(true);

      const uploadedFile = await uploadSignedFile(file, "profile-photos");

      setProfilePhotoFileId(uploadedFile.fileId);
      toast.success("Profile photo uploaded");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string | string[] }>;
      const message = axiosError.response?.data?.message;

      if (Array.isArray(message)) {
        toast.error(message[0]);
        return;
      }

      toast.error(message ?? "Failed to upload profile photo");
    } finally {
      setIsUploadingPhoto(false);
      event.target.value = "";
    }
  };

  const handleUpdateProfile = async () => {
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    try {
      setIsUpdating(true);

      const profileResponse = await updateAdminProfile({
        fullName: fullName.trim(),
        profilePhotoFileId,
      });

      if (currentPassword || newPassword) {
        if (!currentPassword || !newPassword) {
          toast.error("Current password and new password are required");
          return;
        }

        await changeAdminPassword({
          currentPassword,
          newPassword,
          confirmPassword: newPassword,
        });

        setCurrentPassword("");
        setNewPassword("");
      }

      setAdminProfile((currentProfile) => {
        if (!currentProfile) return currentProfile;

        return {
          ...currentProfile,
          profile: profileResponse.data,
        };
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string | string[] }>;
      const message = axiosError.response?.data?.message;

      if (Array.isArray(message)) {
        toast.error(message[0]);
        return;
      }

      toast.error(message ?? "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const email = adminProfile?.email ?? "";

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
            <div className="flex items-center gap-5">
              <Image
                src={previewImageUrl ?? IMAGE.profile_image}
                alt="Admin avatar"
                width={72}
                height={72}
                className="h-18 w-18 rounded-full object-cover"
              />

              <div>
                <h2 className="text-base font-bold">Avatar</h2>
                <p className="mt-1 text-sm text-[#6B7A75] dark:text-white/45">
                  JPG, GIF or PNG. Max size of 5MB.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={handleProfilePhotoChange}
                />

                <button
                  type="button"
                  disabled={isUploadingPhoto}
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 flex cursor-pointer items-center gap-2 text-sm font-bold text-secondary transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 dark:text-mint-green"
                >
                  <Upload size={14} />
                  {isUploadingPhoto ? "Uploading..." : "Change Profile Photo"}
                </button>
              </div>
            </div>

            <div className="my-8 h-px bg-[#DDE8E3] dark:bg-white/10" />

            <div>
              <h3 className="text-base font-bold">Personal Information</h3>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="my-8 h-px bg-[#DDE8E3] dark:bg-white/10" />

            <div>
              <h3 className="text-base font-bold">Security</h3>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) =>
                      setCurrentPassword(event.target.value)
                    }
                    placeholder="Enter current password"
                    className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none placeholder:text-[#6B7A75] focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#6B7A75] dark:text-white/45">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Enter new password"
                    className="h-11 w-full rounded-md border border-[#DDE8E3] bg-[#EAF3EF] px-4 text-sm text-[#10201B] outline-none placeholder:text-[#6B7A75] focus:border-secondary dark:border-white/10 dark:bg-[#25302B] dark:text-white dark:placeholder:text-white/40"
                  />
                </div>
              </div>
            </div>

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