const INSTALLATION_ID_KEY = "kicscoreInstallationId";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const getCookieValue = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1] ?? "") : null;
};

const setCookieValue = (name: string, value: string): void => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`;
};

export const getInstallationId = (): string | null => {
  return getCookieValue(INSTALLATION_ID_KEY);
};

export const getOrCreateInstallationId = (): string => {
  const existingInstallationId = getInstallationId();

  if (existingInstallationId) return existingInstallationId;

  const installationId = crypto.randomUUID();

  setCookieValue(INSTALLATION_ID_KEY, installationId);

  return installationId;
};
