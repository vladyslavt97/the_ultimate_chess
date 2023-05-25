import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const { data: session, status } = useSession()
    console.log("status", status);
    
    const Router = useRouter();
  if (status === "loading") {
        return <p className="flex justify-center items-center h-screen w-full text-4xl">Loading...</p>
    }

    if (status === "authenticated") {
        Router.push("/upcoming")
    }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    if(res?.status === 401){
      setError(true);
    }
  };
  return (
    <div >
      {error && <h1 className="absolute top-52 text-red-600 flex justify-center items-center w-full">Invalid Credentials</h1>}
      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col h-screen gap-3 bg-blue-200">
        <input
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
          type="email"
          placeholder="Email"
          className="rounded w-72 text-xl bg-white text-black"
        />
        <input
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
          type="password"
          placeholder="********"
          className="rounded w-72 text-xl bg-white text-black"
        />
        <input type="submit" value="Login" className="rounded bg-slate-400 py-1 px-2 text-2xl "/>
      </form>
    </div>
  );
};

export default SignIn;