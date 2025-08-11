import {
  BookUser,
  LayoutDashboard,
  Store,
  TicketPercent,
  UtensilsCrossed,
} from "lucide-react";

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    title: "Dashboard",
    url: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "order",
    title: "Order",
    url: "/member/order",
    icon: Store,
  },
  {
    key: "menu",
    title: "Menu",
    url: "/member/menu",
    icon: UtensilsCrossed,
  },
  {
    key: "voucher",
    title: "Voucher",
    url: "/member/voucher",
    icon: TicketPercent,
  },
];

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "order",
    title: "Order",
    url: "/admin/order",
    icon: Store,
  },
  {
    key: "menu",
    title: "Menu",
    url: "/admin/menu",
    icon: UtensilsCrossed,
  },
  {
    key: "voucher",
    title: "Voucher",
    url: "/admin/voucher",
    icon: TicketPercent,
  },
  {
    key: "user",
    title: "User",
    url: "/admin/user",
    icon: BookUser,
  },
];

export { SIDEBAR_MEMBER, SIDEBAR_ADMIN };
