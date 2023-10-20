import { links } from "@/utils";
import styles from "./_components/RegisterPage.module.scss";

import { Delimiter } from "@/components/Delimiter";
import { AuthBy } from "@/components/AuthBy";
import { AuthLink } from "@/components/AuthLink";

export default function Register() {
  return (
    <div className={styles["register-page"]}>
      {/* <RegisterForm /> */}
      <Delimiter />
      <AuthBy />
      <AuthLink
        textMsg="Already have an account ?"
        linkMsg="Log in"
        link={links.LOG_IN}
      />
    </div>
  );
}
