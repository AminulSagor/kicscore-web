"use client";

import { AxiosError } from "axios";
import { Camera } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import { IMAGE } from "@/constants/image.path";
import {
  deleteUploadedFile,
  uploadSignedFile,
} from "@/service/files/signed-upload.service";
import { updateProfilePhoto } from "@/service/user/profile.service";
import { authStore } from "@/z_store/auth/auth.store";

export default function ProfileHeaderCard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const user = authStore((state) => state.user);
  const setAuthUser = authStore((state) => state.setAuthUser);

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleProfilePhotoChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file || !user) {
      event.target.value = "";
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxFileSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or GIF files are allowed");
      event.target.value = "";
      return;
    }

    if (file.size > maxFileSize) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }

    const previousPhotoFileId = user.profilePhotoFileId ?? null;
    let uploadedPhotoFileId: string | null = null;

    try {
      setIsUploadingPhoto(true);

      const uploadedFile = await uploadSignedFile(file, "profile-photos");
      uploadedPhotoFileId = uploadedFile.fileId;

      const response = await updateProfilePhoto({
        fileId: uploadedFile.fileId,
      });

      setAuthUser({
        ...user,
        profilePhotoFileId: response.data.profilePhotoFileId,
        photoReadUrl: response.data.photoReadUrl,
      });

      if (
        previousPhotoFileId &&
        previousPhotoFileId !== response.data.profilePhotoFileId
      ) {
        try {
          await deleteUploadedFile(previousPhotoFileId);
        } catch {
          toast.error("Photo updated, but previous photo could not be removed");
        }
      }

      toast.success(response.message);
    } catch (error) {
      if (uploadedPhotoFileId) {
        try {
          await deleteUploadedFile(uploadedPhotoFileId);
        } catch {
          // Newly uploaded unused file cleanup failed.
        }
      }

      const axiosError = error as AxiosError<{ message?: string | string[] }>;
      const message = axiosError.response?.data?.message;

      if (Array.isArray(message)) {
        toast.error(message[0]);
        return;
      }

      toast.error(message ?? "Unable to update profile photo");
    } finally {
      setIsUploadingPhoto(false);
      event.target.value = "";
    }
  };

  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
    >
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={user?.photoReadUrl || IMAGE.profile_avatar}
              alt={user?.fullName || "User"}
              width={68}
              height={68}
              className="h-[68px] w-[68px] rounded-full border-2 border-white object-cover dark:border-white"
            />

            <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white">
              <Camera size={10} />
            </span>
          </div>

          <div>
            <h2 className="text-sm font-bold">{user?.fullName || "User"}</h2>
            <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/60">
              {user?.email || "user@email.com"}
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif"
          className="hidden"
          onChange={handleProfilePhotoChange}
        />

        <Button
          rounded="full"
          size="sm"
          disabled={isUploadingPhoto}
          onClick={() => fileInputRef.current?.click()}
          className="text-xs font-semibold"
        >
          Change Photo
        </Button>
      </div>
    </Card>
  );
}