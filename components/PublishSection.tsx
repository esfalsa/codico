export function PublishSection() {
	return (
		<div className="space-y-2">
			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Your nation</span>
				</label>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full"
				/>
				<label className="label">
					<span className="label-text-alt">
						This is how we’ll identify you to the NationStates site, so make
						sure it’s something identifiable to you.
					</span>
				</label>
			</div>
			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Dispatch owner nation</span>
				</label>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full"
				/>
			</div>
			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Dispatch owner nation password</span>
				</label>
				<input
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full"
				/>
				<label className="label">
					<span className="label-text-alt">
						Your password will be sent from your device to the NationStates site
						directly; we’ll never see it.
					</span>
				</label>
			</div>
		</div>
	);
}
