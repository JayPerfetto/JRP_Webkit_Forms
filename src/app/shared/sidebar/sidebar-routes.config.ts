import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '',
        title: 'Home',
        adminOnly: false,
        icon: 'ft-home',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/info-page',
        title: 'Information Page',
        adminOnly: false,
        icon: 'ft-info',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/users/user-list',
        title: 'User Management',
        adminOnly: true,
        icon: 'ft-users',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/forms/questionnaire-list',
        title: 'Past Form Submissions',
        adminOnly: false,
        icon: 'ft-list',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
    {
        path: '/forms/questionnaire',
        title: 'Submit New Form',
        adminOnly: true,
        icon: 'ft-plus',
        class: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
    },
];
