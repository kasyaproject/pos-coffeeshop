import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideProps } from "lucide-react";
import ProfileMenu from "@/components/commons/ProfileMenu";
import { cn } from "@/utils/cn";

interface SidebarItem {
  key: string;
  title: string;
  url: string;
  icon: React.ComponentType<LucideProps>;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
}

const SidebarDashboard = (props: PropTypes) => {
  const { sidebarItems } = props;
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/admin/dashboard"
          className="flex flex-col items-center justify-center"
        >
          <Image
            src="/img/logo.png"
            alt="logo"
            className="w-14"
            width={400}
            height={400}
          />

          <h1 className="font-heading text-center font-bold">
            POS Coffee Shop
          </h1>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={cn({
                    "cursor-none rounded-md bg-gray-200":
                      router.pathname.startsWith(item.url),
                  })}
                >
                  <SidebarMenuButton className="font-body" asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ProfileMenu />
      </SidebarFooter>
    </Sidebar>
  );
};
export default SidebarDashboard;
