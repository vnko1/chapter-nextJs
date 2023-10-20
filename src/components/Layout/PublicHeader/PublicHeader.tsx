import { FC } from "react";

import styles from "./PublicHeader.module.scss";

import { Logo } from "@/components";

export default function PublicHeader() {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        <Logo alt="chapter" />
      </div>
    </header>
  );
}
