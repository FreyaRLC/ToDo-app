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
const toBuyDest = document.querySelector(".to-buy");
const boughtDest = document.querySelector(".bought");

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

  const groceryTables = document.querySelectorAll("table");
  groceryTables.forEach((table) => {
    table.addEventListener("change", toggleBoughtStatus);
  });

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
    const groceryId = groceryItem.getAttribute("id");
    // finds the correct object
    const grocery = allGroceries.find((grocery) => grocery.id === groceryId);
    // changes that object's bought property to match checkbox boolean value
    grocery.bought = checkbox.checked;
    if (checkbox.checked) {
      moveToBought(groceryItem);
    } else {
      moveToBuy(groceryItem);
    }
  }
}

function moveToBought(grocery) {
  console.log("function: moveToBought");
  boughtDest.appendChild(grocery);
  grocery.classList.add("bought");
}

function moveToBuy(grocery) {
  console.log("function: moveToBuy");
  toBuyDest.appendChild(grocery);
  grocery.classList.remove("bought");
}

function displayGroceries(grocery) {
  const clone = document.querySelector("template").content.cloneNode(true);

  clone.querySelector(".grocery").setAttribute("id", grocery.id);
  clone.querySelector("[data-field='name']").textContent = grocery.name;
  clone.querySelector("[data-field='details']").textContent = grocery.desc;
  clone.querySelector("[data-field='quantity']").textContent = grocery.quantity;
  toBuyDest.appendChild(clone);
}

/*
TO DO
-local storage, if i can figure it out
-make everything prettier :)

*/
