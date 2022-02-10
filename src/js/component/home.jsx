import React from "react";

//include images into your bundle
import { Main } from "./input";

//create your first component
export const Home = () => {
	return (
		<div className="container note-css">
			<h1 className="d-flex justify-content-center">Todo List</h1>
			<div className="d-flex justify-content-center">
				<Main />
			</div>
		</div>
	);
};
