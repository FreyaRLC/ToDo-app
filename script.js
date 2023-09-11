"use strict";

let allTasks = [];

const Task = {
  name: "",
  desc: "",
  quantity: 0,
  finished: false,
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("function: init");
  addEventListeners();
}

function addEventListeners() {
  console.log("function: addEventListeners");
  document.querySelector("#create-task").addEventListener("click", createTask);
}

function createTask() {
  console.log("function: createTask");
  let task = createObj();
  allTasks.push(task);
  console.log(allTasks);
  displayTasks(task);
}

function createObj() {
  const task = Object.create(Task);
  task.name = document.getElementById("taskName").value;
  task.desc = document.getElementById("taskDesc").value;
  task.quantity = document.getElementById("quantity").value;
  task.finished = false;
  return task;
}

function displayTasks(task) {
  const clone = document.querySelector("template").content.cloneNode(true);

  clone.querySelector(".task-name").textContent = task.name;
  clone.querySelector(".task-desc").textContent = task.desc;
  clone.querySelector(".task-quantity").textContent = task.quantity;
  document.querySelector(".unfinished-tasks").appendChild(clone);
}
