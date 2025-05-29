import AppSidebar from "@/components/modules/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" w-full mx-4 bg-white">
        <SidebarTrigger className="lg:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}
