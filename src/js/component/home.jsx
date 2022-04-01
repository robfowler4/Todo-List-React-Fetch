import React from "react";
import { TodoList } from "./todos";
//include images into your bundle

//create your first component
export const Home = () => {
	return (
		<div className="container note-css">
			<h1 className="d-flex justify-content-center">Todo List</h1>
			<div className="d-flex justify-content-center">
				<TodoList />
			</div>
		</div>
	);
};
