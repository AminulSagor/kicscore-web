const invalidTeamLogoPatterns = ["favicon", ".ico", "sn_favicon"];

export const getValidTeamLogo = (logo?: string | null) => {
  if (!logo) return null;

  const isInvalidLogo = invalidTeamLogoPatterns.some((pattern) =>
    logo.toLowerCase().includes(pattern),
  );

  return isInvalidLogo ? null : logo;
};
