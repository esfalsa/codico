import { useContext } from "react";
import { Formik, Field, Form } from "formik";
import { IdContext } from "./IdContext";

export function PublishSection() {
	const { setUser, setNation, setPassword } = useContext(IdContext);

	return (
		<div className="space-y-2">
			<Formik
				initialValues={{ user: "", nation: "", password: "" }}
				onSubmit={(values) => {
					setUser(values.user);
					setNation(values.nation);
					setPassword(values.password);
				}}
			>
				{() => (
					<Form>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Your nation</span>
							</label>
							<Field
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full"
								name="user"
							/>
							<label className="label">
								<span className="label-text-alt">
									This is how we’ll identify you to the NationStates site, so
									make sure it’s something identifiable to you.
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
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">
									Dispatch owner nation password
								</span>
							</label>
							<Field
								type="password"
								placeholder="Type here"
								className="input input-bordered w-full"
								name="password"
							/>
							<label className="label">
								<span className="label-text-alt">
									Your password will be sent from your device to the
									NationStates site directly; we’ll never see it.
								</span>
							</label>
						</div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
