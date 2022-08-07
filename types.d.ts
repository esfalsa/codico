type Dispatch = {
	Title: string;
	Category: string;
	Subcategory: string;
	Text: string;
};

type Template = {
	"Template Name": string;
	"Template Content": string;
};

type Variable = {
	"Variable Name": string;
	"Variable Value": string;
};

type FormFields = {
	url: string;
	dispatches: Dispatch[];
	user: string;
	nation: string;
	password: string;
};
