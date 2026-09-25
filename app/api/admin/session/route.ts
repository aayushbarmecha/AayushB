import { auth, signOut } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const session = await auth();
  const hasBrowserSession = (await cookies()).get("admin-browser-session")?.value === "1";
  return new Response(null, { status: session?.user && hasBrowserSession ? 204 : 401 });
}

export async function POST() {
  await signOut({ redirect: false });
  (await cookies()).delete("admin-browser-session");
  return new Response(null, { status: 204 });
}
