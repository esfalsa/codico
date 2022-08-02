import { useAuth } from "./AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: JSX.Element }) {
	const { user, initializing, setRedirect } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!initializing && !user) {
			setRedirect(router.route);
			router.push("/login");
		}
	}, [initializing, router, user, setRedirect]);

	if (!initializing && user) {
		return <>{children}</>;
	}

	return null;
}
