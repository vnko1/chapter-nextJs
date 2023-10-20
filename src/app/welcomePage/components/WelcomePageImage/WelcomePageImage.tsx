import { FC } from "react";
import Image from "next/image";

import styles from "./WelcomePageImage.module.scss";
import girlImage from "/public/images/welcome-page-girl.webp";

const WelcomePageImage: FC = () => {
  return (
    <div className={styles["image-container"]}>
      <div className={styles["image__background"]} />
      <div className={styles["image"]}>
        <Image src={girlImage} alt="chapter-girl" />
      </div>
    </div>
  );
};

export default WelcomePageImage;
