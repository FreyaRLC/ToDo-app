"use strict";

let allGroceries = [];

const Grocery = {
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
  document
    .querySelector("#add-grocery")
    .addEventListener("click", createGrocery);
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

function displayGroceries(grocery) {
  const clone = document.querySelector("template").content.cloneNode(true);

  clone.querySelector(".grocery-name").textContent = grocery.name;
  clone.querySelector(".grocery-desc").textContent = grocery.desc;
  clone.querySelector(".quantity").textContent = grocery.quantity;
  document.querySelector(".groceries").appendChild(clone);
}
