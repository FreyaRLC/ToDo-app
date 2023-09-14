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
const feedbackText = document.querySelector(".feedback-text");

document.addEventListener("DOMContentLoaded", init);

function init() {
  // console.log("function: init");
  addEventListeners();
}

function addEventListeners() {
  // console.log("function: addEventListeners");
  submitButton.addEventListener("click", createGrocery);

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
      feedbackText.textContent = "you deleted a grocery!";
      addAnimation();
    });
  });
}

function createGrocery() {
  let grocery = createObj();
  allGroceries.push(grocery);
  displayGroceries(grocery);

  // adds 1 to groceryCounter every time a grocery is created
  groceryCounter++;

  // makes sure newly created groceries have eventlisteners
  addEventListeners();
}

function createObj() {
  const grocery = Object.create(Grocery);
  grocery.name = document.getElementById("groceryName").value;
  grocery.desc = document.getElementById("groceryDesc").value;
  grocery.quantity = document.getElementById("quantity").value;
  grocery.bought = false;
  grocery.id = `grocery-${groceryCounter}`;
  feedbackText.textContent = "Great, you added a grocery!";
  addAnimation();
  return grocery;
}

function addAnimation() {
  feedbackText.classList.add("fade-animation");
  feedbackText.addEventListener("animationend", removeAnimation);
}

function removeAnimation() {
  feedbackText.classList.remove("fade-animation");
}

function toggleBoughtStatus(e) {
  // get the element that triggered the function (the checkbox)
  const checkbox = e.target;
  // get the checkbox's closest ancestor that has the grocery class.
  const groceryItem = checkbox.closest(".grocery");

  if (groceryItem) {
    const groceryId = groceryItem.getAttribute("id");
    // finds the correct object
    const grocery = allGroceries.find((grocery) => grocery.id === groceryId);

    // changes that object's bought property to match checkbox boolean value
    grocery.bought = checkbox.checked;
    if (checkbox.checked) {
      moveToBought(groceryItem);
      feedbackText.textContent = "Grocery marked as bought.";
      addAnimation();
    } else {
      moveToBuy(groceryItem);
      feedbackText.textContent = "Grocery marked as to-buy.";
      addAnimation();
    }
  }
}

function moveToBought(grocery) {
  // console.log("function: moveToBought");
  boughtDest.appendChild(grocery);
  grocery.classList.add("bought");
}

function moveToBuy(grocery) {
  // console.log("function: moveToBuy");
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
  resetInputFields();
}

function resetInputFields() {
  // "resets" the input fields so user doesn't have to waste time deleting their old input.
  document.getElementById("groceryName").value = "";
  document.getElementById("groceryDesc").value = "";
  document.getElementById("quantity").value = "";
}

/*
TO DO
-local storage, if i can figure it out
-make everything prettier :)
-edit / organize according to MVC?

*/
