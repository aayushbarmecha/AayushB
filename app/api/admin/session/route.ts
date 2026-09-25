import { auth, signOut } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  return new Response(null, { status: session?.user ? 204 : 401 });
}

export async function POST() {
  await signOut({ redirect: false });
  return new Response(null, { status: 204 });
}
