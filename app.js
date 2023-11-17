const spanTextChoices = document.getElementsByClassName("text-choices")[0];
const inputTextEl = document.getElementById("inputText");
const divParentEl = document.getElementById("custom-form-area");

const styleSelectedElement = (event) => {
    const spanChoices = spanTextChoices.children;
    targetText = event.target.textContent;

    for (let i = 0; i < spanChoices.length; i++) {
        const spanChoice = spanChoices[i];
        inputTextEl.setAttribute("type",targetText);

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
    divParentEl.innerHTML += `<input type='${event.target.getAttribute("type")}' />`;
  } else if(targetText === "SELECT") {
    divParentEl.innerHTML += `<select></select>`; 
  } else if(targetText === "TEXTAREA") {
    divParentEl.innerHTML += ` <textarea cols="30" rows="10"></textarea>`;
  } else {
    alert("Invalid Selection");
  }
}

spanTextChoices.addEventListener("click", styleSelectedElement);