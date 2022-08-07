import { EventHandler, SetStateAction, useContext } from "react";
import { Field } from "formik";

export function PublishSection() {
	return (
		<div className="space-y-2">
			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Your nation</span>
				</label>
				<Field
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full"
					name="user"
					required
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
				<Field
					type="text"
					placeholder="Type here"
					className="input input-bordered w-full"
					name="nation"
					required
				/>
			</div>
			<div className="form-control w-full">
				<label className="label">
					<span className="label-text">Dispatch owner nation password</span>
				</label>
				<Field
					type="password"
					placeholder="Type here"
					className="input input-bordered w-full"
					name="password"
					required
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
