import Image from "next/image";
import Link from "next/link";

import { IMAGE } from "@/constants/image.path";

interface AppLogoProps {
  href?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
}

export default function AppLogo({
  href = "/public/home",
  className,
  imageClassName,
  width = 140,
  height = 100,
}: AppLogoProps) {
  return (
    <Link href={href} className={className}>
      <Image
        src={IMAGE.logo}
        alt="KICSCORE"
        width={width}
        height={height}
        priority
        className={imageClassName}
      />
    </Link>
  );
}
