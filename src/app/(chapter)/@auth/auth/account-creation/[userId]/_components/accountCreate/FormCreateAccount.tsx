import { ChangeEvent, FC, useState, useEffect } from "react";

import cn from "classnames";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";

import validationSchema from "./validationSchema";

import { IAccountCreate } from "./FormCreateAccount.type";
import api from "@/axios/api";
import { EndpointsEnum } from "@/axios/endpoints.types";
import { useDebounce } from "@/hooks/useDebounce";
import {
  checkIsCyrillic,
  deleteCookie,
  getDataFromLs,
  removeDataFromLS,
} from "@/utils";
import styles from "./FormCreateAccount.module.scss";

import UIbutton from "@/components/Buttons/UIbutton/UIbutton";
import { TextField, PasswordField } from "@/components/Fields";
import { links } from "@/utils";

const initialValues: IAccountCreate = {
  fullname: "",
  nickName: "",
  password: "",
  confirm_password: "",
};
type FormCreateAccountProps = { userId: string };

const FormCreateAccount: FC<FormCreateAccountProps> = ({ userId }) => {
  const [fullName, setFullName] = useState<string | null>(null);

  const fullname = fullName ? fullName : "";

  const [isLoadingNk, setIsLoadingNk] = useState<boolean>(false);
  const [nkErrorMessage, setNkErrorMessage] = useState<string | null>(null);
  const [errorMessageForm, setErrorMessageForm] = useState<
    string | null | undefined
  >(null);
  const [nickname, setNickname] = useState<string>("");
  const debouncedNickname = useDebounce(nickname, 500);
  const navigate = useRouter();

  function handleNicknameChange(nickname: string) {
    try {
      setIsLoadingNk(true);
      console.log("nickname", nickname);
    } catch (e) {
      if (e instanceof AxiosError) {
        setNkErrorMessage(e.response?.data || "nickname already exist");
      }
    } finally {
      setIsLoadingNk(false);
    }
  }

  async function handleCreateAccount(
    values: IAccountCreate,
    { setSubmitting }: FormikHelpers<IAccountCreate>
  ) {
    try {
      setErrorMessageForm(null);
      setSubmitting(true);

      const [firstName, lastName] = values.fullname.split(" ");
      const { nickName, confirm_password, password } = values;

      await api.patch(`${EndpointsEnum.REGISTRATION_FINALY}/${userId}`, {
        nickName: nickName,
        password,
        confirmPassword: confirm_password,
        firstName,
        lastName,
      });
      removeDataFromLS("fullName");
      deleteCookie("email", "userId");
      navigate.replace(links.LOG_IN);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorMessageForm(e.response?.data.message || e.response?.data.error);
      }
      setSubmitting(false);
    }
  }

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) =>
    e.currentTarget.value[0] === "@"
      ? setNickname(e.currentTarget.value.slice(1))
      : setNickname(e.currentTarget.value);

  useEffect(() => {
    if (debouncedNickname !== "") {
      handleNicknameChange(debouncedNickname);
    }
  }, [debouncedNickname]);

  useEffect(() => {
    getDataFromLs("fullName") && setFullName(getDataFromLs("fullName"));
  }, []);

  return (
    <div className={cn(styles["form-create-account"])}>
      <Formik
        initialValues={{ ...initialValues, fullname }}
        validationSchema={validationSchema}
        onSubmit={handleCreateAccount}
      >
        {({
          isSubmitting,
          isValid,
          dirty,
          values,
        }: FormikProps<IAccountCreate>) => (
          <Form>
            <TextField
              id="fullname"
              name="fullname"
              label="Full Name"
              value={values.fullname}
              placeholder="Full Name"
              dataAutomation="fullname"
              showSuccessIcon={true}
              className={
                checkIsCyrillic(values.fullname) ? styles["cyrillic"] : ""
              }
            />
            <TextField
              id="nickName"
              name="nickName"
              label="Nickname"
              value={nickname ? `@${nickname}` : ""}
              placeholder="nickname"
              dataAutomation="nickname"
              showSuccessIcon={true}
              onChange={onHandleChange}
              disabled={isLoadingNk}
              customErrorMessage={nkErrorMessage}
            />
            <PasswordField
              id="password"
              name="password"
              label="Create password"
              placeholder="Enter your password"
              strength
              dataAutomation="password"
            />
            <PasswordField
              id="confirm_password"
              name="confirm_password"
              label="Confirm password"
              placeholder="Re-enter your password"
              dataAutomation="confirm_password"
            />
            <UIbutton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className="p-[12px] text-sm"
              disabled={!isValid || !dirty}
              isLoading={isSubmitting}
            >
              Submit
            </UIbutton>
            {errorMessageForm ? (
              <p className="text-red text-s text-center mt-1 mr-2">
                {errorMessageForm}
              </p>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreateAccount;
