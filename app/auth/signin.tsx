import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
    const { data: session, status } = useSession()
    console.log("status", status);
    
    const Router = useRouter();
  if (status === "loading") {
        return <p className="flex justify-center items-center h-screen w-full text-4xl">Loading...</p>
    }

    if (status === "authenticated") {
        Router.push("/chooseuser")
    }

    
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: userInfo.username,
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
          value={userInfo.username}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, username: target.value })
          }
          type="text"
          placeholder="Username"
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