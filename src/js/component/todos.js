import React, { useState, useEffect } from "react";

export const TodoList = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/robfowler";
	useEffect(() => getFetch(), []);

	// START getFetch Function

	const getFetch = () => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then((responseAsJson) => {
				// Do stuff with the JSONified response
				console.log(responseAsJson);
			})
			.catch((error) => {
				console.log("Looks like there was a problem: \n", error);
			});
	};

	const updateFetch = (data) => {
		fetch(url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log("Success:", response);
				getFetch();
			})
			.catch((error) => console.error("Error:", error));
	};
	// END delete Fecth Function

	const targetValue = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);
	};

	const createTask = (e) => {
		if (e.keyCode == 13) {
			setTaskList([...taskList, { label: inputValue, done: false }]);
			setInputValue("");
			updateFetch([...taskList, { label: inputValue, done: false }]);
		}
	};

	const deleteTask = (deletePosition) => {
		const deleteValue = taskList.filter(
			(taskDelete, index) => deletePosition != index
		);
		setTaskList(deleteValue);
		updateFetch(deleteValue);
	};

	const markDone = (index) => {
		const newTodos = taskList.map((task, i) => {
			if (i == index) {
				task.done = !task.done;
				return task;
			} else {
				return task;
			}
		});
		setTaskList(newTodos);
		updateFetch(newTodos);
	};

	return (
		<div className="todo-list">
			<input
				className="mb-4"
				placeholder="Add Something"
				type="text"
				value={inputValue}
				onChange={targetValue}
				onKeyDown={createTask}
			/>
			<ul className="list-group">
				{taskList.map((task, index) => {
					return (
						<li className="list-group-item" key={index}>
							{task.label}
							<span>
								<i
									className="far fa-trash-alt"
									onClick={() => deleteTask(index)}></i>
							</span>
							<span className={task.done ? "done" : ""}>
								<i
									class="fas fa-check-square"
									onClick={() => {
										markDone(index);
									}}></i>
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
