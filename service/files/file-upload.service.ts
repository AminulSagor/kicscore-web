import axios from "axios";

import serviceClient from "@/service/base/service.client";
import {
    ConfirmFileUploadPayload,
    ConfirmFileUploadResponse,
    SignedUploadUrlPayload,
    SignedUploadUrlResponse,
} from "@/types/admin/profile/types/files/file-upload.types";

export const createSignedUploadUrl = async (
    payload: SignedUploadUrlPayload,
): Promise<SignedUploadUrlResponse> => {
    const response = await serviceClient.post<SignedUploadUrlResponse>(
        "/files/signed-upload-url",
        payload,
    );

    return response.data;
};

export const uploadFileToSignedUrl = async (
    uploadUrl: string,
    file: File,
    contentType: string,
): Promise<void> => {
    await axios.put(uploadUrl, file, {
        headers: {
            "Content-Type": contentType,
        },
    });
};

export const confirmFileUpload = async (
    payload: ConfirmFileUploadPayload,
): Promise<ConfirmFileUploadResponse> => {
    const response = await serviceClient.post<ConfirmFileUploadResponse>(
        "/files/confirm-upload",
        payload,
    );

    return response.data;
};