// import { IMAGE } from "@/constants/image.path";

// export const getValidImage = (imageUrl?: string | null) => {
//   const fallbackImage = IMAGE.fallback_image;

//   if (!imageUrl) return fallbackImage;

//   const invalidImagePatterns = ["favicon", ".ico", "sn_favicon"]; //you can add more

//   const isInvalidImage = invalidImagePatterns.some((pattern) =>
//     imageUrl.toLowerCase().includes(pattern),
//   );

//   return isInvalidImage ? fallbackImage : imageUrl;
// };

import { IMAGE } from "@/constants/image.path";

export const getValidImage = (imageUrl?: string | null): string => {
  if (!imageUrl) return IMAGE.fallback_image;

  const sportsnetFavicon = "https://www.sportsnet.ca/sn_favicon.ico";
  const replacement = "https://groundwater.org/wp-content/uploads/2022/07/news-placeholder-800x436.png";

  // strict replace for the specific Sportsnet favicon URL
  if (imageUrl === sportsnetFavicon) return replacement;

  // fallback check for obvious bad patterns
  const invalidImagePatterns = ["favicon", ".ico", "sn_favicon"];
  const isInvalidImage = invalidImagePatterns.some((pattern) =>
    (imageUrl ?? "").toLowerCase().includes(pattern),
  );

  return isInvalidImage ? IMAGE.fallback_image : imageUrl;
};
