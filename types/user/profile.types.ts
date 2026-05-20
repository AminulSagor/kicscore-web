export type UnitSystem = "METRIC" | "IMPERIAL";

export interface UpdateProfilePhotoPayload {
  fileId: string;
}

export interface UpdateProfilePhotoResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
  timestamp: string;
  path: string;
}

export interface UpdateProfilePayload {
  fullName: string;
}

export interface UpdateProfileData {
  fullName: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UpdateProfileData;
  timestamp: string;
  path: string;
}

export interface DeleteAccountPayload {
  fullName: string;
}

export interface DeleteAccountResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
  timestamp: string;
  path: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
  timestamp: string;
  path: string;
}

export interface UpdateUserSettingsPayload {
  unitSystem: UnitSystem;
}

export interface UserSettingsData {
  id: string;
  userId: string;
  unitSystem: UnitSystem;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserSettingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserSettingsData;
  timestamp: string;
  path: string;
}