//
/////////////////// DISPLAY FUNCTIONS ON FORM /////////////////////
//
export function showFormDelegation() {
  //Ændrer legend i takt med at input ændres i name
  elements.name.addEventListener("keyup", function (e) {
    changeHeader(e);
  });

  //multiple events attached to a single element
  ["keyup", "focusout", "focus"].forEach((evt) => {
    document.querySelector("#others").addEventListener(evt, setLenght);
  });
  document.querySelector("#unknown").addEventListener("change", toggleInputs);
  document.querySelector("#others").addEventListener("click", () => {
    elements.others.style.width = "150px";
  });
}

function changeHeader(e) {
  document.querySelector(".header span").textContent = e.target.value;
}

function toggleInputs() {
  console.log("theForm");
  const unknown = elements.unknown;
  const description = elements.description;
  //TOGGLE
  //Instead of writing if/else, then we now set the element to diabled, and when it is disabled, we set it to the opposite
  description.disabled = !description.disabled;
  unknown.focus = !unknown.focus;
  if (unknown.checked) {
    description.placeholder = "";
    description.value = "";
  } else {
    description.placeholder = "Type a description";
  }
}

function setLenght() {
  console.log("setLenght");
  const others = elements.others;
  if (others.value == "") {
    console.log("normal width");
    others.style.width = "20px";
  } else {
    console.log("long");
    others.style.width = "150px";
  }
}
