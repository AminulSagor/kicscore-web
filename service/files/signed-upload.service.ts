import axios from "axios";

import serviceClient from "@/service/base/service.client";
import {
  ConfirmUploadPayload,
  ConfirmUploadResponse,
  SignedUploadUrlPayload,
  SignedUploadUrlResponse,
  UploadedFileResult,
} from "@/types/files/signed-upload.types";

export const getSignedUploadUrl = async (
  payload: SignedUploadUrlPayload,
): Promise<SignedUploadUrlResponse> => {
  const response = await serviceClient.post<SignedUploadUrlResponse>(
    "/files/signed-upload-url",
    payload,
  );

  return response.data;
};

export const uploadFileToS3 = async (
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

export const confirmUpload = async (
  payload: ConfirmUploadPayload,
): Promise<ConfirmUploadResponse> => {
  const response = await serviceClient.post<ConfirmUploadResponse>(
    "/files/confirm-upload",
    payload,
  );

  return response.data;
};

export const uploadSignedFile = async (
  file: File,
  folder = "profile-photos",
): Promise<UploadedFileResult> => {
  const signedUploadResponse = await getSignedUploadUrl({
    fileName: file.name,
    contentType: file.type,
    sizeBytes: file.size,
    folder,
  });

  await uploadFileToS3(
    signedUploadResponse.data.uploadUrl,
    file,
    signedUploadResponse.data.headers["Content-Type"],
  );

  const confirmedUploadResponse = await confirmUpload({
    fileId: signedUploadResponse.data.fileId,
  });

  return {
    fileId: confirmedUploadResponse.data.id,
    fileKey: confirmedUploadResponse.data.fileKey,
  };
};
