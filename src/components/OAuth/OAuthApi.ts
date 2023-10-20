import { AxiosError, AxiosPromise } from "axios";

import { AppDispatch } from "@/redux/store";
import {
  oAuthPending,
  oAuthFulfilled,
  oAuthRejected,
} from "@/redux/slices/user";

import { links, setDataToLS } from "@/utils";
import { SetIsLoadingType, UserData } from "./OAuth.type";
import { LocaleStorageArgs } from "@/utils/localStorage/localStorage.type";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

abstract class OAuthApi {
  constructor(
    protected token: string | undefined,
    private navigate: AppRouterInstance,
    private dispatch: AppDispatch,
    private setIsLoading: SetIsLoadingType
  ) {}

  private handleRequest() {
    this.setIsLoading(true);
    this.dispatch(oAuthPending());
  }

  protected handleData(user: UserData, cred: LocaleStorageArgs) {
    this.dispatch(oAuthFulfilled(user));
    setDataToLS(cred);
  }

  private handleError(error: string) {
    this.dispatch(oAuthRejected(error));
  }

  protected redirect(user: UserData, url?: string) {
    const redirectUrl = url ? url : `${links.ACCOUNT_CREATION}/${user.id}`;
    const fullName = `${user.firstName ? user.firstName : ""}${
      user.lastName ? ` ${user.lastName}` : ""
    }`;
    setDataToLS({
      fullName,
    });
    this.navigate.replace(redirectUrl);
  }

  protected tryCatchWrapper(cb: () => AxiosPromise<UserData>) {
    return async () => {
      this.handleRequest();
      try {
        await cb();
      } catch (error) {
        if (error instanceof AxiosError) this.handleError(error.message);
      } finally {
        this.setIsLoading(false);
      }
    };
  }
}

export default OAuthApi;
