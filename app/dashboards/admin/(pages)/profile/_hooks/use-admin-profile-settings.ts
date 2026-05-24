"use client";

import { AxiosError } from "axios";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import {
    changeAdminPassword,
    getAdminProfile,
    updateAdminProfile,
} from "@/service/admin/profile/admin-profile.service";
import {
    deleteUploadedFile,
    getSignedReadUrl,
    uploadSignedFile,
} from "@/service/files/signed-upload.service";
import type { AdminProfileUser } from "@/types/admin/profile/admin-profile.types";

export const useAdminProfileSettings = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [adminProfile, setAdminProfile] = useState<AdminProfileUser | null>(
        null,
    );
    const [fullName, setFullName] = useState("");
    const [profilePhotoFileId, setProfilePhotoFileId] = useState<string | null>(
        null,
    );
    const [savedProfilePhotoUrl, setSavedProfilePhotoUrl] = useState<
        string | null
    >(null);
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
                const savedPhotoFileId =
                    response.data.profile?.profilePhotoFileId ?? null;

                setAdminProfile(response.data);
                setFullName(response.data.profile?.fullName ?? "");
                setProfilePhotoFileId(savedPhotoFileId);

                if (savedPhotoFileId) {
                    try {
                        const signedReadUrlResponse =
                            await getSignedReadUrl(savedPhotoFileId);

                        setSavedProfilePhotoUrl(signedReadUrlResponse.data.readUrl);
                    } catch {
                        setSavedProfilePhotoUrl(null);
                        toast.error("Failed to load profile photo");
                    }
                }
            } catch {
                toast.error("Failed to load admin profile");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminProfile();
    }, []);

    useEffect(() => {
        return () => {
            if (previewImageUrl) {
                URL.revokeObjectURL(previewImageUrl);
            }
        };
    }, [previewImageUrl]);

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

        try {
            setIsUploadingPhoto(true);

            const uploadedFile = await uploadSignedFile(file, "profile-photos");

            setProfilePhotoFileId(uploadedFile.fileId);
            setPreviewImageUrl(localPreviewUrl);
            toast.success("Profile photo uploaded");
        } catch (error) {
            URL.revokeObjectURL(localPreviewUrl);

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

        const previousSavedPhotoFileId =
            adminProfile?.profile?.profilePhotoFileId ?? null;

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

            setProfilePhotoFileId(profileResponse.data.profilePhotoFileId);

            if (profileResponse.data.profilePhotoFileId) {
                try {
                    const signedReadUrlResponse = await getSignedReadUrl(
                        profileResponse.data.profilePhotoFileId,
                    );

                    setSavedProfilePhotoUrl(signedReadUrlResponse.data.readUrl);
                    setPreviewImageUrl(null);
                } catch {
                    toast.error("Profile saved, but failed to load profile photo");
                }
            } else {
                setSavedProfilePhotoUrl(null);
                setPreviewImageUrl(null);
            }

            if (
                previousSavedPhotoFileId &&
                previousSavedPhotoFileId !== profileResponse.data.profilePhotoFileId
            ) {
                try {
                    await deleteUploadedFile(previousSavedPhotoFileId);
                } catch {
                    toast.error("Profile updated, but failed to remove previous photo");
                }
            }

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

    return {
        email: adminProfile?.email ?? "",
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
    };
};