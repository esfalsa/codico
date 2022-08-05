import { createContext } from "react";

type ContextProps = {
	dispatches: Dispatch[];
	setDispatches: (dispatches: Dispatch[]) => void;
	user: string;
	setUser: (user: string) => void;
	nation: string;
	setNation: (user: string) => void;
	password: string;
	setPassword: (user: string) => void;
};

export const IdContext = createContext<ContextProps>({
	dispatches: [],
	setDispatches: (dispatches: Dispatch[]) => {},
	user: "",
	setUser: (user: string) => {},
	nation: "",
	setNation: (user: string) => {},
	password: "",
	setPassword: (user: string) => {},
});
