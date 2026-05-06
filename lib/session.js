import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export function auth() {
  return getServerSession(authOptions);
}

export async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

export async function isAuthenticated() {
  const session = await auth();
  return !!session?.user;
}
