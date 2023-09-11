"use strict";

let allGroceries = [];

const Grocery = {
  name: "",
  desc: "",
  quantity: 0,
  finished: false,
};

const submitButton = document.querySelector("#add-grocery");
const checkboxes = document.querySelectorAll(".bought-or-not");

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("function: init");
  addEventListeners();
}

function addEventListeners() {
  console.log("function: addEventListeners");
  submitButton.addEventListener("click", createGrocery);
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", toggleBoughtStatus);
  });
}

function createGrocery() {
  console.log("function: createGrocery");
  let grocery = createObj();
  allGroceries.push(grocery);
  console.log(allGroceries);
  displayGroceries(grocery);
}

function createObj() {
  const grocery = Object.create(Grocery);
  grocery.name = document.getElementById("groceryName").value;
  grocery.desc = document.getElementById("groceryDesc").value;
  grocery.quantity = document.getElementById("quantity").value;
  grocery.finished = false;
  return grocery;
}

function toggleBoughtStatus(e) {
  const checkbox = e.target;
  const groceryItem = checkbox.closest(".grocery");
  // If the checkbox returns true, add the class. else, remove.
  if (groceryItem) {
    checkbox.checked
      ? groceryItem.classList.add("bought")
      : groceryItem.classList.remove("bought");
  }
}

function displayGroceries(grocery) {
  const clone = document.querySelector("template").content.cloneNode(true);

  clone.querySelector(".grocery-name").textContent = grocery.name;
  clone.querySelector(".grocery-desc").textContent = grocery.desc;
  clone.querySelector(".quantity").textContent = grocery.quantity;
  document.querySelector(".groceries").appendChild(clone);
}
