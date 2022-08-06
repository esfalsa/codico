import { EventHandler, SetStateAction, useContext } from "react";
import { Formik, Field, Form } from "formik";
import { OptionsContext } from "./OptionsContext";
import clsx from "clsx";

export function PublishSection({
	continueHandler,
	backHandler,
}: {
	continueHandler?: SetStateAction<any>;
	backHandler?: EventHandler<any>;
}) {
	const { user, setUser, nation, setNation, password, setPassword } =
		useContext(OptionsContext);

	return (
		<div className="md:col-span-2 md:mt-0 dark:bg-slate-800 flex flex-col mt-8 overflow-hidden bg-white rounded-md shadow">
			<Formik
				initialValues={{ user, nation, password }}
				onSubmit={(values) => {
					setUser(values.user);
					setNation(values.nation);
					setPassword(values.password);
					if (continueHandler) continueHandler();
				}}
			>
				{({ values }) => {
					return (
						<Form className="flex flex-col h-full">
							<div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-scroll">
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
												This is how we’ll identify you to the NationStates site,
												so make sure it’s something identifiable to you.
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
											<span className="label-text">
												Dispatch owner nation password
											</span>
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
												Your password will be sent from your device to the
												NationStates site directly; we’ll never see it.
											</span>
										</label>
									</div>
								</div>
							</div>
							<div className="bg-slate-50 dark:bg-slate-900/50 flex flex-row justify-between p-4">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={backHandler}
								>
									Back
								</button>
								<button
									type="submit"
									className={clsx(
										"btn btn-primary",
										Object.values(values).some((value) => value.length == 0) &&
											"btn-disabled"
									)}
								>
									Continue
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}
