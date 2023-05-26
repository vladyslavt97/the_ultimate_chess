// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import supabase from "@/lib/supabase";

// interface User {
//   id: string,
//   username: string;
//   role: string;
// }

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {},
//       authorize: async (credentials, req) => {
//         const { username, password } = credentials as {
//           id: string;
//           username: string;
//           password: string;
//         };
//         console.log('heelo fro auth');
        
//         try {
//           const { data, error } = await supabase
//             .from("users")
//             .select("*")
//             .eq("username", username)
//             .eq("password", password)
//             .single();

//           if (error) {
//             console.error("Error searching for user:", error);
//             return null;
//           }

//           if (data) {
//             // If the user is found
//             return {
//               id: "12",
//               username: data.username,
//               role: "admin",
//             } as User;
//           }
//         } catch (error) {
//           console.error("Error searching for user:", error);
//           return null;
//         }

//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//     error: '/auth/error',
//     // signOut: '/auth/signout'
//   },
//   // callbacks: {
//   //   jwt(params) {
//   //     // update token
//   //     if (params.user?.role) {
//   //       params.token.role = params.user.role;
//   //     }
//   //     // return final_token
//   //     return params.token;
//   //   },
//   // },
// };

// export default NextAuth(authOptions);
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
