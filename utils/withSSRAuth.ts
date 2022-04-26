import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  //fn: GetServerSideProps significa que a função vai receber como parametro uma outra função

  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx); //ctx é o contexto, no caso, next page context

    if (!cookies["nextauth.token"])
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    return await fn();
  };
}
