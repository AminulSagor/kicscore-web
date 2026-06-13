export type AdsterraNativeZone = {
  scriptSrc: string;
  containerId: string;
};

export type AdsterraBannerZone = {
  adKey: string;
  width: number;
  height: number;
};

const MAIN_NATIVE_BANNER = {
  scriptSrc:
    "https://pl29712888.effectivecpmnetwork.com/d8a9299fd850795af22158824803dd9a/invoke.js",
  containerId: "container-d8a9299fd850795af22158824803dd9a",
} satisfies AdsterraNativeZone;

export const ADSTERRA_NATIVE_ZONES = {
  homeAfterLive: MAIN_NATIVE_BANNER,
  newsListAfterFeaturedNewsCard: MAIN_NATIVE_BANNER,
  newsDetailTitleAd: MAIN_NATIVE_BANNER,
  matchFactsAfterTopStats: MAIN_NATIVE_BANNER,
  matchH2HAfterOverview: MAIN_NATIVE_BANNER,
} satisfies Record<string, AdsterraNativeZone>;

export const ADSTERRA_BANNER_ZONES = {
  banner300x250: {
    adKey: "0d1315a804dcb99f1fa45e0f3560fd3f",
    width: 300,
    height: 250,
  },

  banner320x50: {
    adKey: "63ed730b142047f986317c6c2770f6c4",
    width: 320,
    height: 50,
  },

  banner728x90: {
    adKey: "8cf81391860286cc53bbed2f47292dd6",
    width: 728,
    height: 90,
  },
} satisfies Record<string, AdsterraBannerZone>;
