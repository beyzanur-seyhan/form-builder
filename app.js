const spanTextChoices = document.getElementsByClassName("text-choices")[0];
const divParentEl = document.getElementById("custom-form-area");

let selectedFormElement;
let order = 0;
let listStyles = [];
let createdFormElement = "";

spanTextChoices.addEventListener("click", setBackgroundToSpan);
divParentEl.addEventListener("click", selectFormElement);

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

const createFormElement = (eventTarget, order="0") => {
  const formElement = eventTarget.tagName.toLocaleLowerCase();
  const element = document.createElement(formElement);
  
  if(formElement === "input") {
    if (!eventTarget.getAttribute("type")) return;

    element.type = eventTarget.getAttribute("type");
    element.id = `${formElement}-${element.type}-${order}`;
  }
  element.id = `${formElement}-${order}`;
  return element;
}

const appendElementToParent = (event) => {
  createdFormElement = createFormElement(event.target, ++order);
  divParentEl.appendChild(createdFormElement);
};

const selectFormElement = (event) => {
  if (event.target.tagName === "DIV") return;

  alert(
    event.target.tagName[0].toUpperCase() +
      event.target.tagName.slice(1).toLowerCase() +
      " Clicked!"
  );
  selectedFormElement = event.target;
};

const checkThereIsStyleSelector = () => {
  let isInclude = false;

  if (
    document.getElementsByTagName("style")[0]
      .innerHTML.includes(selectedFormElement.id)
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

  document.getElementsByTagName("style")[0].innerHTML = textStyle.slice(
    1,
    textStyle.length - 1
  );
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

const createListStyle = (targetSize, choiceType) => {
  if(!selectedFormElement) return;

  const elementId = selectedFormElement.id;
  const elementStyle = createStyleSelector({});

  if (!checkThereIsStyleSelector()) {
    elementStyle[choiceType] = `${targetSize}px`;
    listStyles.push(elementStyle);
  } else {
    listStyles[elementId[elementId.length - 1]-1][choiceType] = 
    `${targetSize}px`;
  }
};

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

  document.getElementsByClassName(event.target.getAttribute("class"))[1].
  value = event.target.value;
}