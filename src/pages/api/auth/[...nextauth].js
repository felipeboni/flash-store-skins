import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import _ from "lodash";
import axios from "axios";

import { FetchWithToken } from "@/utils/fetch";
import { randomBetweenRange } from "@/helpers/random";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const request = axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            username: credentials.username,
            password: credentials.password,
          }
        );

        return await request
          .then(async (res) => {
            if (res.data.status !== 200)
              throw new Error("Usuário ou senha incorretos");

            const thisUserId = res.data.response.id;
            const thisUserToken = res.data.response.api_token;

            const thisUserData = await FetchWithToken({
              path: `publimoney/${thisUserId}`,
              method: "GET",
              token: thisUserToken,
            });

            if (thisUserData.data.status !== 200)
              throw new Error("Usuário não tem registro neste APP.");

            // If user balance is less than 1.000, generate more
            if (thisUserData.data.response.user.balance < 10000000) {
              const genNewBalance = randomBetweenRange(15295129, 52567231);

              FetchWithToken({
                path: `publimoney/${thisUserId}`,
                method: "PUT",
                token: thisUserToken,
                data: {
                  balance: genNewBalance,
                  ref_balance: thisUserData.data.response.user.ref_balance,
                  bank: thisUserData.data.response.user.bank,
                },
              });
            }

            return {
              session: {
                user: {
                  id: res.data.response.id,
                  username: res.data.response.username,
                  token: res.data.response.api_token,
                  balance: thisUserData.data.response.user.balance,
                  bank: thisUserData.data.response.user.bank,
                  ref_balance: thisUserData.data.response.user.ref_balance,
                  ref: thisUserData.data.response.user.ref,
                },
              },
            };
          })
          .catch((e) => {
            console.log(e);
            throw new Error(e);
          });
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, trigger, session, user }) => {
      if (trigger === "update" && session?.ref_balance) {
        token.session.user.ref_balance = session.ref_balance;
      }

      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      return { ...session, ...token };
    },
  },
});
