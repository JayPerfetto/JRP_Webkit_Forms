// Sidebar route metadata
export interface RouteInfo {
    path: string;
    adminOnly: boolean;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu: RouteInfo[];
}
