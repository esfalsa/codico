export function WelcomeSection() {
	return (
		<div className="prose">
			<p>
				Welcome to <span className="font-bold text-teal-500">Codico</span>!
			</p>
			<p>
				Codico is a new tool that allows you to write dispatches with your own
				templates and variables, and then publish or update them on
				NationStates.
			</p>
			<p>
				Please keep in mind that Codico is currently in{" "}
				<strong>open alpha</strong>. This means that it remains under
				development. While it is functional, anything may change at any time and
				bugs are likely to be present.
			</p>
			<p>
				Click <kbd className="kbd">Continue</kbd> below to get started.
			</p>
		</div>
	);
}
