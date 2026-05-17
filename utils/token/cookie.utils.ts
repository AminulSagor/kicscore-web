const ACCESS_TOKEN_KEY = "accessToken";

export const getCookieValue = (key: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));

  if (!cookie) return null;

  return decodeURIComponent(cookie.substring(key.length + 1));
};

export const getAccessToken = (): string | null => {
  return getCookieValue(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
  document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 30}`;
};

export const removeAccessToken = (): void => {
  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0`;
};
