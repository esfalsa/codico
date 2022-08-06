import { createContext } from "react";

type ContextProps = {
	url: string;
	setUrl: (url: string) => void;
	dispatches: Dispatch[];
	setDispatches: (dispatches: Dispatch[]) => void;
	user: string;
	setUser: (user: string) => void;
	nation: string;
	setNation: (user: string) => void;
	password: string;
	setPassword: (user: string) => void;
};

export const OptionsContext = createContext<ContextProps>({
	url: "",
	setUrl: (url: string) => {},
	dispatches: [],
	setDispatches: (dispatches: Dispatch[]) => {},
	user: "",
	setUser: (user: string) => {},
	nation: "",
	setNation: (user: string) => {},
	password: "",
	setPassword: (user: string) => {},
});
