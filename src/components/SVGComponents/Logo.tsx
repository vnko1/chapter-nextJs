import { FC } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { links } from "@/utils";

import { type LogoProps } from "./logo.type";
import logo from "/public/svg/logo.svg";

const Logo: FC<LogoProps> = ({ className, alt }) => {
  return (
    <div className={cn("max-w-[120px]", className)}>
      <Link href={links.WELCOME}>
        <Image className="w-full" src={logo} alt={alt || "logo"} />
      </Link>
    </div>
  );
};

export default Logo;
