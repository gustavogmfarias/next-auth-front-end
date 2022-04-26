import { GetServerSideProps } from "next";
import { FormEvent, useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";

import { AuthContext } from "../../contexts/AuthContext";
import { withSSRGuest } from "../../utils/withSSRGuest";
// import styles from "../../styles/Home.modules.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  useEffect(() => {});

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return { props: {} }; //caso não tenha o cookie, não é pra fazer nada
});
