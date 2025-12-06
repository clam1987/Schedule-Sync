import NextAuth from "next-auth";
import { auth_options } from "@/utils/auth_options";

const handler = NextAuth(auth_options);

export { handler as GET, handler as POST };
