export function isFormValidDelegation() {
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", (e) => {
    checkIfValid(e);
  });
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
    formIsValid = false;
    cbError.classList.remove("hidden");
  } else {
    formIsValid = true;
    cbError.classList.add("hidden");
  }
  //check if valid
  if (isValid && formIsValid) {
    console.log("all good");
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
