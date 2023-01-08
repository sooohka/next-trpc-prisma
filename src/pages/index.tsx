import trpc from "@/server/utils/trpc";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { mutateAsync: login } = trpc.auth.login.useMutation();
  const { mutateAsync: logout } = trpc.auth.logout.useMutation();

  const handleLogin = () => {
    login({ id: 1, name: "sooho" });
    router.push("/todos");
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Home;
