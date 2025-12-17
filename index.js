let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const localTasks = localStorage.getItem("tasks");
	if (localTasks == null) {
		items.forEach(element => {
			listElement.append(createItem(element));
		});
	} else {
		let tasks = JSON.parse(localTasks);
		tasks.forEach(element => {
			listElement.append(createItem(element));
		});
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");
		saveTasks(getTasksFromDOM());
	});  	

	textElement.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			textElement.blur();
		}
	});

	deleteButton.addEventListener("click", () => {
		clone.remove();
		saveTasks(getTasksFromDOM());
	});

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		saveTasks(getTasksFromDOM());
	});

	return clone
}


function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
	let tasks = [];
	itemsNamesElements.forEach(element => {
		tasks.push(element.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (e) => {
	e.preventDefault();
	if (inputElement.value == "") {
		return;
	}
	listElement.prepend(createItem(inputElement.value));
	inputElement.value = "";
	saveTasks(getTasksFromDOM());
});

loadTasks();