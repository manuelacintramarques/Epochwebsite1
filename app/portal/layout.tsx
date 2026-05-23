import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/portal/sidebar";
import SessionProvider from "@/components/portal/session-provider";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-[#080808]">
        <Sidebar />
        <main className="flex-1 ml-0 md:ml-[200px] min-h-screen">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
