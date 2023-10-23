import axios from "axios";
import { signOut, getSession } from "next-auth/react";

import toast from "react-hot-toast";

const FetchWithToken = async ({ path, method, data, token }) => {
  if (!token) {
    const { session } = await getSession();
    token = session.user.token;
  }

  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/${path}`,
      method: method || "POST",
      data: data || {},
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err?.response?.status != 401) return reject();

        toast.error("Sua sessão expirou");
        signOut();
        reject();

        return;
      });
  });

  return;
};

export { FetchWithToken };
