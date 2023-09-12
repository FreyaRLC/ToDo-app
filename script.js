"use strict";

let allGroceries = [];

const Grocery = {
  name: "",
  desc: "",
  quantity: 0,
  bought: false,
  id: 0,
};

let groceryCounter = 1;

const submitButton = document.querySelector("#add");
const checkboxes = document.querySelectorAll(".checkbox");
const groceriesDest = document.querySelector(".grocery-dest");

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("function: init");
  addEventListeners();
}

function addEventListeners() {
  console.log("function: addEventListeners");
  submitButton.addEventListener("click", createGrocery);
  attachGroceryEventListeners();
}

function attachGroceryEventListeners() {
  // Checkboxes
  groceriesDest.addEventListener("change", toggleBoughtStatus);

  // Delete buttons
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const relevantGrocery = button.closest(".grocery");
      relevantGrocery.classList.add("deleted");
    });
  });
}

function createGrocery() {
  console.log("function: createGrocery");
  let grocery = createObj();
  allGroceries.push(grocery);
  console.log(allGroceries);
  displayGroceries(grocery);

  // adds 1 to groceryCounter every time a grocery is created
  groceryCounter++;

  // makes sure newly created groceries have eventlisteners
  attachGroceryEventListeners();
}

function createObj() {
  const grocery = Object.create(Grocery);
  grocery.name = document.getElementById("groceryName").value;
  grocery.desc = document.getElementById("groceryDesc").value;
  grocery.quantity = document.getElementById("quantity").value;
  grocery.bought = false;
  grocery.id = `grocery${groceryCounter}`;
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

  clone.querySelector(".grocery").setAttribute("id", grocery.id);
  clone.querySelector("[data-field='name']").textContent = grocery.name;
  clone.querySelector("[data-field='details']").textContent = grocery.desc;
  clone.querySelector("[data-field='quantity']").textContent = grocery.quantity;
  groceriesDest.appendChild(clone);
}
