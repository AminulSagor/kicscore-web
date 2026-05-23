"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type FooterHomeTopLinkProps = {
    children: ReactNode;
    className?: string;
};

const HOME_ROUTE = "/public/home";

export default function FooterHomeTopLink({
    children,
    className,
}: FooterHomeTopLinkProps) {
    const pathname = usePathname();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== HOME_ROUTE) {
            return;
        }

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Link href={HOME_ROUTE} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}