
import React from "react";
import Navbar from "./Navbar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, PieChart, Wallet, Goal, Banknote, BookOpen, HelpCircle } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Expenses", icon: PieChart, href: "/expenses" },
  { name: "Accounts", icon: Wallet, href: "/accounts" },
  { name: "Goals", icon: Goal, href: "/goals" },
  { name: "Budgets", icon: Banknote, href: "/budgets" },
  { name: "Learn", icon: BookOpen, href: "/learn" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.href} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/help" className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5" />
                        <span>Help & Support</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 overflow-auto">
            <div className="mx-auto max-w-7xl">
              <SidebarTrigger className="mb-4 lg:hidden" />
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
