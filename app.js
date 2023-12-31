const spanTextChoices = document.getElementsByClassName("text-choices")[0];
const divParentEl = document.querySelector("#custom-form-area");
const domStyles = document.getElementsByTagName("style")[0];

let selectedFormElement;
let order = 0;
let listStyles = [];
let createdFormElement = "";

const setBackgroundToSpan = (event) => {
  const spanChoices = spanTextChoices.children;
  const targetText = event.target.textContent;

  for (let i = 0; i < spanChoices.length; i++) {
    const spanChoice = spanChoices[i];
    document.getElementById("inputText").setAttribute("type", targetText);

    if (event.target.tagName == "SPAN") {
      if (spanChoices[i].textContent === targetText) {
        spanChoice.className = "bg-selected";
      } else {
        spanChoice.removeAttribute("class");
      }
    }
  }
};

const createFormElement = (eventTarget) => {
  const formElement = eventTarget.tagName.toLocaleLowerCase();
  let result = document.createElement(formElement);
  
  if(formElement === "input") {
    if (!eventTarget.getAttribute("type")) result = false;

    result.type = eventTarget.getAttribute("type");
    result.id = `${formElement}-${result.type}-${order}`;
  }
  if(formElement === "label" || formElement === "button") {
    result.textContent = formElement;
  }
  result.id = `${formElement}-${order}`;
  return result;
}

const appendElementToParent = (event) => {
  const createdFormElement = createFormElement(event.target);
  
  if(!createdFormElement) {
    alert("Please Select A Input Type!");
    return;
  };
  divParentEl.appendChild(createdFormElement);
  divParentEl.innerHTML += "<br/>";
  ++order;
  resetOptionValue();
};

const selectFormElement = (event) => {
  if (event.target.tagName === "DIV") return;

  alert(
    event.target.tagName[0].toUpperCase() +
      event.target.tagName.slice(1).toLowerCase() +
      " Clicked!"
  );
  selectedFormElement = event.target;
  resetOptionValue();
};

const checkThereIsStyleSelector = () => {
  let isInclude = false;
  if (
    domStyles.innerHTML.includes(selectedFormElement.id)
  )
    isInclude = true;

  return isInclude;
};

const writeStyleToDom = () => {
  if (listStyles.length === 0) return;

  const textStyle = JSON.stringify(listStyles)
    .replace(/"/g, "")
    .replaceAll("{selector:", "")
    .replace(/\\/g, '"')
    .replace(",", "")
    .replaceAll(",", ";")
    .replaceAll("{;", "{")
    .replaceAll("};", "}");

    domStyles.innerHTML = textStyle.slice(1,textStyle.length - 1);
};

const createStyleSelector = (elementProp) => {
  const selectedElement = selectedFormElement.tagName.toLocaleLowerCase();

  if (selectedFormElement.tagName !== "INPUT") {
    elementProp.selector = `${selectedElement}#${selectedFormElement.id}{`;
  } else {
    const elementType = `[type="${selectedFormElement.getAttribute("type")}"]`;
    elementProp.selector = 
    `${selectedElement}#${selectedFormElement.id}${elementType}{`;
  }

  return elementProp;
}

const createListStyle = (value, choiceType) => {
  if(!selectedFormElement) return;

  const elementId = selectedFormElement.id;
  const styleSelector = createStyleSelector({});

  if (!checkThereIsStyleSelector()) {
    styleSelector[choiceType] = value;
    listStyles.push(styleSelector);
  } else {
    const lastCharacter = elementId.slice(-1);
    listStyles[lastCharacter][choiceType] = value;
  }
};

const getSelectedOption = (option,index) => {
 return document.getElementsByClassName(option.getAttribute("class"))[index];
}

const selectBindStyleOption = (event) => {
  if (!selectedFormElement) {
    alert("Please Select A Form Element!");
    return;
  }

  document.getElementsByClassName(event.target.getAttribute("class"))[0].value =
  event.target.value;
};

const bindInputToRange = (event) => {
  if(event.target.value === 0) return;

  document.getElementsByClassName(event.target.getAttribute("class"))[0].
  value = event.target.value;
}

const setSizeToFormElement = (eventType, event, optionType) => {
  const option = event.target;
  const isBinded = optionType.includes("radius") 
  || optionType.includes("color") ? () => console.info(optionType) : bindInputToRange(event);

  let optionValue = option.value;
  optionValue += optionType != "background-color" ? "px" : "";

  getSelectedOption(option, 0).addEventListener(eventType,
  createListStyle(optionValue, optionType), isBinded, writeStyleToDom());
}

const outputDomElement = () => {
  return(
    `<html>
      <head>
        <style>
          ${domStyles.innerHTML}
        </style>
      </head>
      <body>
        ${divParentEl.innerHTML}
      </body>
  </html>`
  );
}

const outputDomElements = () => {
  if(divParentEl.children.length === 0) return;

  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
  encodeURIComponent(outputDomElement()));
  element.setAttribute('download', 'index.html');

  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
}

const resetOptionValue = () => {
  let inputPxElement = document.querySelectorAll('.inputPxSize');
  inputPxElement.forEach((element)=>{
    if(element.value) element.value = "";
  })
}

spanTextChoices.addEventListener("click", setBackgroundToSpan);
divParentEl.addEventListener("click", selectFormElement);
document.getElementById('btnOutput').addEventListener('click', outputDomElements);