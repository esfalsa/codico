export type UserCB = (user: string | null, error?: string | null) => void;

async function NSgetter(resource: URL | string) {
	const endpoint = new URL(resource);
	endpoint.searchParams.append("user-agent", "Codico by Esfalsa");

	const response = await fetch(endpoint, {
		headers: {
			"User-Agent": "Codico by Esfalsa",
		},
	});

	return await response.text();
}

export class Auth {
	nation: string | null;
	error: string | null;
	cb: UserCB;

	constructor() {
		this.nation = null;
		this.error = null;
		this.cb = () => {};
	}

	onAuthStateChanged(cb: UserCB) {
		this.cb = cb;

		this.onUserChange(this.nation, this.error);

		return () => {
			this.cb = () => {};
		};
	}

	protected onUserChange(user: string | null, error?: string | null) {
		if (this.cb) {
			this.cb(user, error);
		}
	}

	signIn(nation: string, checksum: string) {
		return new Promise(async (resolve, reject) => {
			const response = (
				await NSgetter(
					`https://www.nationstates.net/cgi-bin/api.cgi?a=verify&nation=${nation}&checksum=${checksum}`
				)
			).trim();

			if (response !== "1") {
				setTimeout(() => {
					const error = "Verification failed.";
					this.error = error;
					reject(error);
					this.onUserChange(null, error);
					return;
				}, 600);
			} else {
				this.nation = nation;
				sessionStorage.setItem("user", this.nation);
				this.onUserChange(this.nation);
				resolve(this.nation);
			}
		});
	}

	signOut() {
		sessionStorage.removeItem("user");
		this.nation = null;
		this.onUserChange(this.nation);
	}

	resolveUser() {
		if (window) {
			const signedInUser = sessionStorage.getItem("user");
			if (signedInUser) {
				this.nation = signedInUser;
			}
		} else {
			this.nation = null;
		}
		this.onUserChange(this.nation);
		return this;
	}
}
