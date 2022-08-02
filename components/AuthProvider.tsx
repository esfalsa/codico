import React, { useEffect, useState } from "react";
import { Auth } from "../lib/auth";

const auth = new Auth();

const redirectKey = "sign_in_redirect";

export const AuthContext = React.createContext<
	| {
			auth: Auth;
			initializing: boolean;
			user: string | null;
			error: { message: string } | null;
			setRedirect: (redirect: string) => void;
			getRedirect: () => string | null;
			clearRedirect: () => void;
	  }
	| undefined
>(undefined);

AuthContext.displayName = "AuthContext";

function setRedirect(redirect: string) {
	window.sessionStorage.setItem(redirectKey, redirect);
}

function getRedirect(): string | null {
	return window.sessionStorage.getItem(redirectKey);
}

function clearRedirect() {
	return window.sessionStorage.removeItem(redirectKey);
}
export function useAuth() {
	const auth = React.useContext(AuthContext);

	if (!auth) {
		throw new Error("useAuth must be used within AuthProvider");
	}

	return auth;
}

export function AuthProvider({ children }: { children: JSX.Element }) {
	const [user, setUser] = useState<string | null>(null);
	const [error, setError] = useState<{ message: string } | null>(null);
	const [initializing, setInitializing] = useState(true);

	/*
    NOTICE: this is not production ready code!
    just a quick demo of resolving the initial user
  */
	useEffect(() => {
		auth.resolveUser().onAuthStateChanged((user: string, error) => {
			if (user) {
				setUser(user);
				setError(null);
			} else {
				setUser(null);
				if (error) {
					setError(error);
				}
			}
			setInitializing(false);
		});
	}, []);

	const value = {
		user,
		error,
		auth,
		initializing,
		setRedirect,
		getRedirect,
		clearRedirect,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
