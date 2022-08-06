import categoryCodes from "./categoryCodes";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export class DispatchPoster {
	dispatches: Dispatch[];
	userAgent: string;
	nation: string;
	password: string;
	publishedDispatches: { title: string; id: string }[] = [];
	pin: string = "";
	progress: string[];
	callback: (progress: string[]) => void = () => {};

	constructor(
		dispatches: Dispatch[],
		userAgent: string,
		nation: string,
		password: string,
		callback: (progress: string[]) => void
	) {
		this.dispatches = dispatches;
		this.userAgent = userAgent;
		this.nation = nation;
		this.password = password;
		this.progress = Array(this.dispatches.length).fill("queued");
		this.callback = callback;
	}

	private createNSSearch(searchParams: Record<string, string>) {
		return new URLSearchParams({
			...searchParams,
			"user-agent": this.userAgent,
		});
	}

	private createNSEndpoint(searchParams: Record<string, string>) {
		let endpoint = new URL("https://www.nationstates.net/cgi-bin/api.cgi");
		endpoint.search = this.createNSSearch(searchParams).toString();

		return endpoint;
	}

	private onStateChange() {
		if (this.callback) {
			this.callback(this.progress);
		}
	}

	async deployAll() {
		let response = await fetch(
			this.createNSEndpoint({
				nation: this.nation,
				q: "dispatchlist+ping",
			}),
			{
				headers: {
					"User-Agent": this.userAgent,
					"X-Password": this.password,
				},
			}
		);

		const parser = new DOMParser();

		const parsed = parser.parseFromString(await response.text(), "text/xml");

		this.publishedDispatches = [...parsed.querySelectorAll("DISPATCH")].map(
			(dispatch) => {
				return {
					title: dispatch.querySelector("TITLE")?.textContent ?? "",
					id: dispatch.id,
				};
			}
		);

		this.pin = response.headers.get("x-pin") ?? "";

		await sleep(600);

		for (const [index, dispatch] of this.dispatches.entries()) {
			this.progress[index] = "pending";
			this.onStateChange();

			const action = this.publishedDispatches
				.map((dispatch) => dispatch.title)
				.includes(dispatch.Title)
				? "edit"
				: "add";

			const category = categoryCodes[dispatch.Category].value;
			const subcategory =
				categoryCodes[dispatch.Category][dispatch.Subcategory];

			let prepare = await fetch(
				"https://www.nationstates.net/cgi-bin/api.cgi",
				{
					method: "POST",
					headers: {
						"X-Password": this.password,
						"X-Pin": this.pin,
					},
					body: this.createNSSearch({
						nation: this.nation,
						c: "dispatch",
						dispatch: action,
						...(action == "edit" && {
							dispatchid: this.publishedDispatches.find(
								({ title }) => title == dispatch.Title
							)?.id,
						}),
						title: dispatch.Title,
						text: dispatch.Text,
						category: category.toString(),
						subcategory: subcategory.toString(),
						mode: "prepare",
					}),
				}
			);

			let token: string =
				parser
					.parseFromString(await prepare.text(), "text/xml")
					.querySelector("SUCCESS")?.textContent ?? "";

			await sleep(600);

			let execute = await fetch(
				"https://www.nationstates.net/cgi-bin/api.cgi",
				{
					method: "POST",
					headers: {
						"X-Password": this.password,
						"X-Pin": this.pin,
					},
					body: this.createNSSearch({
						nation: this.nation,
						c: "dispatch",
						dispatch: action,
						...(action == "edit" && {
							dispatchid: this.publishedDispatches.find(
								({ title }) => title == dispatch.Title
							)?.id,
						}),
						title: dispatch.Title,
						text: dispatch.Text,
						category: category.toString(),
						subcategory: subcategory.toString(),
						mode: "execute",
						token: token,
					}),
				}
			);

			let executeDocument = parser.parseFromString(
				await execute.text(),
				"text/xml"
			);

			if (executeDocument.querySelector("SUCCESS")) {
				this.progress[index] = "published";
			} else {
				this.progress[index] = "error";
			}

			this.onStateChange();

			await sleep(600);
		}
	}
}
