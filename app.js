const spanTextChoices = document.getElementsByClassName("text-choices")[0];
const divParentEl = document.getElementById("custom-form-area");
let selectedFormElement;

const setBackgroundToSpan = (event) => {
    const spanChoices = spanTextChoices.children;
    const targetText = event.target.textContent;

    for (let i = 0; i < spanChoices.length; i++) {
        const spanChoice = spanChoices[i];
        document.getElementById("inputText").setAttribute("type",targetText);

        if(event.target.tagName == "SPAN") {
            if(spanChoices[i].textContent === targetText) {
                spanChoice.className = "bg-selected";
            } else {
                spanChoice.removeAttribute("class");
            }
        }
    }
}

const appendElementToParent = (event) => {
  const targetText = event.target.tagName;

  if(targetText == "INPUT") {
    if(!event.target.getAttribute("type")) {
        alert("Please Select A Input Type");
     return;   
    }
    divParentEl.innerHTML += `<input type='${event.target.getAttribute("type")}' /><br/>`;
  } else if(targetText === "SELECT") {
    divParentEl.innerHTML += `<select></select><br/>`; 
  } else if(targetText === "TEXTAREA") {
    divParentEl.innerHTML += ` <textarea cols="30" rows="10"></textarea><br/>`;
  } else {
    alert("Invalid Selection!");
  }
}

const selectFormElement = (event) => {
  if(event.target.tagName === "DIV") return;

  alert(event.target.tagName[0].toUpperCase() + 
  event.target.tagName.slice(1).toLowerCase() + " Clicked!");
  selectedFormElement = event.target;
}

const selectStyleOption = (event) => {
  if(!selectedFormElement) {
    alert("Please Select A Form Element!");
    return;
  } 
  let selectedOptionClass;
  selectedOptionClass = event.target.getAttribute("class");
  document.getElementsByClassName(selectedOptionClass)[0].value = event.target.value;
}

spanTextChoices.addEventListener("click", setBackgroundToSpan);
divParentEl.addEventListener("click", selectFormElement);
