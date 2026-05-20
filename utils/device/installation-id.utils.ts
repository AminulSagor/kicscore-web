const INSTALLATION_ID_KEY = "kicscoreInstallationId";

export const getInstallationId = (): string | null => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(INSTALLATION_ID_KEY);
};

export const getOrCreateInstallationId = (): string => {
    const existingInstallationId = getInstallationId();

    if (existingInstallationId) return existingInstallationId;

    const installationId = crypto.randomUUID();
    localStorage.setItem(INSTALLATION_ID_KEY, installationId);

    return installationId;
};