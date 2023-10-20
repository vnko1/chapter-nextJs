import Image from "next/image";

import styles from "./_components/errorLayout/ErrorLayout.module.scss";

import { UIbutton } from "@/components";
import { ErrorLayout } from "./_components";
import image from "/public/images/page-404.webp";

export default function NotFound() {
  return (
    <ErrorLayout>
      <section className={styles["block-error"]}>
        <div className={styles["block-error__container"]}>
          <div className={styles["block-error__thumb"]}>
            <Image
              width="974"
              height="649"
              alt="error-404"
              src={image}
              className={styles["block-error__image"]}
            />
          </div>
          <div className={styles["block-error__content"]}>
            <div className={styles["block-error__wrapper"]}>
              <h1 className={styles["block-error__heading"]}>
                Oh no! Page not found
              </h1>
              <p className={styles["block-error__text"]}>
                Sorry, we couldn`t find the page you are looking for.
              </p>
            </div>
            <UIbutton
              href="/"
              variant="contained"
              dataAutomation="navigationButton"
              className={`${styles["block-error__button"]} ${styles["error__btn"]}`}
            >
              Go to home page
            </UIbutton>
          </div>
        </div>
      </section>
    </ErrorLayout>
  );
}
