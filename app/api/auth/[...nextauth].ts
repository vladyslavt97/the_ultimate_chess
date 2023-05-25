import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        
        if ((email === process.env.MY_EMAIL && password === process.env.MY_PWD) || 
        (email === process.env.MR_EMAIL && password === process.env.MR_PWD)
        ) {
          // if everything is fine
          return {
            id: "1234",
            name: "VT or MR",
            email: email,
            role: "admin",
          };
        }
        // throw new Error("invalid credentials");
        return null;

      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  // callbacks: {
  //   jwt(params) {
  //     // update token
  //     if (params.user?.role) {
  //       params.token.role = params.user.role;
  //     }
  //     // return final_token
  //     return params.token;
  //   },
  // },
};

export default NextAuth(authOptions);