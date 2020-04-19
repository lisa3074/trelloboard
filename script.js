"use strict";

import "@babel/polyfill";
import { showFormDelegation } from "./modules/showForm";
import { changeDbDelegation } from "./modules/changeDB";
import { post } from "./modules/changeDB";
import { put } from "./modules/changeDB";

window.addEventListener("DOMContentLoaded", start);

const form = document.querySelector("form");
const elements = form.elements;
//DEBUG, FJERN EFTER
window.elements = elements;
window.form = form;

//
/////////////////// DELEGATION FUNCTION /////////////////////
//

function start() {
  console.log("start");
  changeDbDelegation();
  showFormDelegation();
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", (e) => {
    checkIfValid(e);
  });
  document.querySelector(".add_new").addEventListener("click", formToggle);
  document.querySelector(".close_it").addEventListener("click", formToggle);
}
function formToggle() {
  console.log("formTogle");
  document.querySelector(".form").classList.toggle("hide");
}

function checkIfValid(e) {
  let formIsValid;
  e.preventDefault();
  const isValid = form.checkValidity();
  const forElements = form.querySelectorAll("input");
  //remove all invalid calsses on inputs / clean slate
  forElements.forEach((el) => {
    el.classList.remove("invalid");
  });
  //make a nodeString into an array by adding square brackets three dots and the nodeString [...nodestring]
  const cbs = [...form.querySelectorAll(`[name=category]`)];
  const checked = cbs.filter((el) => el.checked);
  const cbError = form.querySelector(".check p");
  console.log(cbs);
  console.log(checked);
  if (checked.length === 0) {
    console.log("check invalid");
    formIsValid = false;
    cbError.classList.remove("hidden");
  } else {
    formIsValid = true;
    cbError.classList.add("hidden");
  }
  //check if valid
  if (isValid && formIsValid) {
    document.querySelector(".form").classList.toggle("hide");
    if (form.dataset.state === "post") {
      post({
        name: form.elements.name.value,
        description: form.elements.description.value,
        time_estimate: form.elements.time_estimate.value,
        duedate: form.elements.duedate.value,
        image: form.elements.image.value,
        //use map for creating an array (because of the multiple input option
        //Remember to put a fixed value on the checkboxes, oterwise its just gonna say "on")
        category: checked.map((el) => el.value),
        others: form.elements.others.value,
      });
    } else {
      put(
        {
          //Det objekt der skal sættes ind i stedet (redigering)
          name: form.elements.name.value,
          description: form.elements.description.value,
          time_estimate: form.elements.time_estimate.value,
          duedate: form.elements.duedate.value,
          image: form.elements.image.value,
          //use map for creating an array (because of the multiple input option
          //Remember to put a fixed value on the checkboxes, oterwise its just gonna say "on")
          category: checked.map((el) => el.value),
          others: form.elements.others.value,
        },
        //id sendes videre til put, så vi redigerer i det korrekte objekt.
        form.dataset.id
      );
      form.dataset.state = "post";
    }
    console.log("all good");
    form.reset();
    document.querySelector(".header span").textContent = "";
  } else {
    //check if any inputs are invalid
    forElements.forEach((el) => {
      if (!el.checkValidity()) {
        console.log("invalid");
        //If not valid add class invalid
        el.classList.add("invalid");
      }
    });
  }
  console.log("submitted");
}
