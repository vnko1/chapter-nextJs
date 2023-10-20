"use client";
import { FC } from "react";
import cn from "classnames";

import { BlockAuthProps } from "./BlockAuth.type";

import styles from "./BlockAuth.module.scss";
import Link from "next/link";

const BlockAuth: FC<BlockAuthProps> = ({
  className,
  heading,
  showBottomText = false,
  typePageText,
  children,
}) => (
  <section className={cn(styles["block-auth"], className)}>
    <div className={styles["block-auth__container"]}>
      <div className={styles["block-auth__body"]}>
        {heading && (
          <h1 className={styles["block-auth__heading"]}>{heading}</h1>
        )}
        {children}
      </div>
      {showBottomText ? (
        <div className={styles["block-auth__bottom-text"]}>
          <p>
            By clicking {typePageText ? `"${typePageText}"` : null} above, you
            acknowledge that you have read and understood, and agree to
            Chapter&apos;s
            <Link href="/">Terms & Conditions and Privacy Policy.</Link>
          </p>
        </div>
      ) : null}
    </div>
  </section>
);

export default BlockAuth;
