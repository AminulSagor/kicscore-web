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

  return imageUrl;
};
