/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Tableaux de bord',
        subtitle: 'Conceptions de tableaux de bord uniques',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.project',
                title: 'Statistique',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/dash/home/project'
            },
        ]
    },
    {
        id: 'Admin',
        title: 'Admin',
        subtitle: 'Administration',
        type: 'group',
        icon: 'admin_panel_settings',
        children: [

            {
                id: 'Admin.users',
                title: 'Utilisateurs',
                type: 'basic',
                icon: 'person_add',
                link: '/dash/admin/users'
            },
            {
                id: 'Admin.roles',
                title: 'Rôles',
                type: 'basic',
                icon: 'assignment_ind',
                link: '/dash/admin/roles'
            },

        ]
    },
    {
        id: 'apps',
        title: 'PROJETS',
        subtitle: "Conceptions d'applications sur mesure",
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'user-interface.forms',
                title: 'Projet',
                type: 'collapsable',
                icon: 'work',
                children: [
                    {
                        id: 'user-interface.forms.fields',
                        title: 'Ajouter un projet',
                        type: 'basic',
                        icon: 'playlist_add',
                        link: '/dash/home/ui/forms/fields'
                    },
                    {
                        id: 'user-interface.forms.layouts',
                        title: 'Axe de projet',
                        type: 'basic',
                        icon: 'edit',
                        link: '/dash/home/ui/forms/layouts'
                    },
                    {
                        id: 'apps.academy',
                        title: 'Suivi des projets',
                        type: 'basic',
                        icon: 'timeline',
                        link: '/dash/home/academy'
                    },
                ]
            },

        ]
    },
    {
        id: 'technicien',
        title: 'PROJETS',
        subtitle: "Conceptions d'applications sur mesure",
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'user-interface.forms',
                title: 'Projet',
                type: 'collapsable',
                icon: 'work',
                children: [
                    {
                        id: 'apps.academy',
                        title: 'Suivi des projets',
                        type: 'basic',
                        icon: 'timeline',
                        link: '/dash/home/academy'
                    },
                ]
            }
        ]
    },
    {
        id: 'apps.file-manager',
        title: 'Mes Documents',
        type: 'basic',
        icon: 'heroicons_outline:cloud',
        link: '/dash/home/documents/0'
    },
    {
        id: 'pages',
        title: 'Pages',
        subtitle: 'Conceptions de pages personnalisées',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [

            {
                id: 'pages.profile',
                title: 'Profile',
                type: 'basic',
                icon: 'heroicons_outline:user-circle',
                link: '/dash/home/profile'
            },
            {
                id: 'pages.settings',
                title: 'Paramètres',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/dash/home/settings'
            }
        ]
    },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'heroicons_outline:qrcode',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        tooltip: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group'
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        type: 'group',
        icon: 'heroicons_outline:qrcode',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'heroicons_outline:document-duplicate',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        type: 'group',
        icon: 'heroicons_outline:collection',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Misc',
        type: 'group',
        icon: 'heroicons_outline:menu',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
