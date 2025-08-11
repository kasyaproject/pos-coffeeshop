import { ReactNode } from "react";
import SidebarDashboard from "./SidebarDashboard";
import PageHead from "@/components/commons/PageHead";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constant";

interface PropTypes {
  title?: string;
  desc?: string;
  children: ReactNode;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { title, desc, children, type = "admin" } = props;

  return (
    <SidebarProvider>
      <PageHead title={`POS CoffeShop | ${title}`} />

      <div className="max-w-screen-3xl 3xl:container flex min-h-screen">
        <SidebarDashboard
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
        />

        <div className="h-screen w-full overflow-y-auto p-4 lg:p-8">
          <div className="my-1 mb-10 flex items-center space-x-4 lg:space-x-2">
            <SidebarTrigger className="rounded p-1 hover:cursor-pointer hover:bg-gray-100" />
            <div className="h-10 w-0.5 rounded bg-gray-400 lg:h-5" />
            <p className="font-body text-sm text-gray-600">{desc}</p>
          </div>

          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};
export default DashboardLayout;
