import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: 'dash/admin' },

    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'pages/profile' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            // { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            // Dashboards
            {
                path: 'dash/home',
                children: [
                    { path: 'documents/:id', loadChildren: () => import('app/modules/admin/apps/file-manager/file-manager.module').then(m => m.FileManagerModule) },
                    { path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule) },
                    { path: 'academy', loadChildren: () => import('app/modules/admin/apps/academy/academy.module').then(m => m.AcademyModule) },
                    // Profile
                    { path: 'profile', loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule) },

                    // Settings
                    { path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule) },
                    {
                        path: 'ui', children: [

                            // Material Components
                            { path: 'material-components', loadChildren: () => import('app/modules/admin/ui/material-components/material-components.module').then(m => m.MaterialComponentsModule) },

                            // Fuse Components
                            { path: 'fuse-components', loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.module').then(m => m.FuseComponentsModule) },

                            // Other Components
                            { path: 'other-components', loadChildren: () => import('app/modules/admin/ui/other-components/other-components.module').then(m => m.OtherComponentsModule) },

                            // TailwindCSS
                            { path: 'tailwindcss', loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.module').then(m => m.TailwindCSSModule) },

                            // Advanced Search
                            { path: 'advanced-search', loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule) },

                            // Animations
                            { path: 'animations', loadChildren: () => import('app/modules/admin/ui/animations/animations.module').then(m => m.AnimationsModule) },

                            // Cards
                            { path: 'cards', loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule) },

                            // Colors
                            { path: 'colors', loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule) },

                            // Confirmation Dialog
                            { path: 'confirmation-dialog', loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module').then(m => m.ConfirmationDialogModule) },

                            // Datatable
                            { path: 'datatable', loadChildren: () => import('app/modules/admin/ui/datatable/datatable.module').then(m => m.DatatableModule) },

                            // Forms
                            {
                                path: 'forms', children: [
                                    { path: 'fields', loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule) },
                                    { path: 'layouts', loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule) },
                                    { path: 'wizards', loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule) }
                                ]
                            },

                            // Icons
                            { path: 'icons', loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule) },

                            // Page Layouts
                            { path: 'page-layouts', loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule) },

                            // Typography
                            { path: 'typography', loadChildren: () => import('app/modules/admin/ui/typography/typography.module').then(m => m.TypographyModule) }
                        ]
                    },
                ]
            },
            {
                path: 'dash/admin',
                children: [

                    // Changelog
                    {
                        path: '',
                        loadChildren: () => import('app/modules/administration/administration.module').then(m => m.AdministrationModule)
                    },

                ]
            },

            //404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '**', redirectTo: '404-not-found' },

        ]
    }
];
