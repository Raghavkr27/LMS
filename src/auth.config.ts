import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [
        // Providers added in auth.ts
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            const isOnAdmin = nextUrl.pathname.startsWith("/admin");
            const isProtected = ["/courses", "/pricing", "/about"].some(path => nextUrl.pathname.startsWith(path));

            if (isOnAdmin) {
                if (nextUrl.pathname === "/admin/login" || nextUrl.pathname === "/admin/register" || nextUrl.pathname === "/admin-login") return true;
                if (isLoggedIn && auth?.user?.role === "admin") return true;
                return Response.redirect(new URL("/", nextUrl)); // Redirect non-admins to home
            }

            // Redirect logged-in admins away from login pages
            if (isLoggedIn && auth?.user?.role === "admin" && (nextUrl.pathname === "/admin-login" || nextUrl.pathname === "/admin/login")) {
                return Response.redirect(new URL("/admin", nextUrl));
            }

            if (isOnDashboard || isProtected) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn && nextUrl.pathname === "/login") {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
} satisfies NextAuthConfig;
