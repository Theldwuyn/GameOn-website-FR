function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

/****************** Fonctions de validation des champs du formulaire ********************/

// RegExp
const textReg = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\-]{2,}");
const mailReg = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ0-9._\-]+\@[a-zA-Z]+\.[a-zA-Z]+");
const quantityReg = new RegExp("^[0-9]{1,2}$");

// DOM Elements
const everyAlphaNumFields = document.querySelectorAll(
  "input[type=text], input[type=email], input[type=date], input[type=number]");
const everyBtnRadio = document.querySelectorAll("input[type=radio]");
const requiredCheckboxBtn = document.getElementById("checkbox1");
const confirmationPopup = document.querySelector(".valid");

// Display popup form
function displayConfirmPopup() {
  confirmationPopup.style.display = "flex";
}

/**
 * Cette fonction récupère la valeur de l'element HTML
 * et la compare à l'expression régulière textReg
 * Si le test est false, ajoute une paire d'attribut à l'element parent
 * pour afficher un message d'avertissement et retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function parseTextInput(input) {
  let inputValue = input.value;
  if (!textReg.test(inputValue)) {
    input.parentElement.setAttribute("data-error", "Veuillez entrer 2 caractères alphabétique ou plus");
    input.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    input.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Cette fonction récupère la valeur de l'element HTML
 * et la compare avec l'expression régulière mailReg
 * Si le test est false, ajoute une paire d'attribut à l'element parent
 * pour afficher un message d'avertissement et retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function parseEmailInput(input) {
  let inputMail = input.value;
  if(!mailReg.test(inputMail)) {
    input.parentElement.setAttribute("data-error", "Veuillez renseigner une adresse mail valide");
    input.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    input.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Cette fonction récupère la valeur de l'element HTML et construit une 
 * instance Date "date" avec cette valeur. La fonction test si date est un nombre.
 * Si isNaN retourne true, la date est invalide, ajoute une paire d'attribut
 * à l'element parent pour afficher un message d'avertissement et retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function parseDateInput(input) {
  let date = new Date(input.value);
  if (isNaN(date.getTime())) {
    input.parentElement.setAttribute("data-error", "Veuillez entrer votre date de naissance");
    input.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    input.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Cette fonction récupère la valeur d'un element HTML et la compare avec
 * l'expression régulière quantityReg. Si le test retourne false,ajoute
 * une paire d'attribut à l'element parent pour afficher un message d'avertissement
 * et retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function parseNumberInput(input) {
  let inputValue = input.value;
  if (!quantityReg.test(inputValue)) {
    input.parentElement.setAttribute("data-error", "Veuillez entrer un nombrer compris entre 1 et 99");
    input.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    input.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Cette fonction récupère le type d'input et appel la fonction voulue
 * selon le type pour valider l'input
 * @param {HTMLElement} input input de type text, email, date ou number
 * @returns bool
 */
function parseAllAlphaNumField(input) {
  switch (input.getAttribute("type")) {
    case "text":
      return parseTextInput(input);
    case "email":
      return parseEmailInput(input);
    case "date":
      return parseDateInput(input);
    case "number":
      return parseNumberInput(input);
    default:
      return false;
  }
}

/**
 * Cette fonction récupère le bouton radio checked dans la nodelist des boutons radios.
 * S'il n'y en a pas, renvoie false et ajoute une paire d'attribut à l'element 
 * parent pour afficher un message d'avertissement
 * @param {NodeListOf<Element>} allRadioBtn nodelist de l'ensemble des boutons radios
 * @returns bool
 */
function parseRadioInput(allRadioBtn) {
  let radioChecked = null;
  for(let i = 0; i < allRadioBtn.length; i++) {
    if (allRadioBtn[i].checked) {
      radioChecked = allRadioBtn[i];
    }
  }
  if (radioChecked != null) {
    radioChecked.parentElement.setAttribute("data-error-visible", "false");
    return true;
  } else {
    allRadioBtn[0].parentElement.setAttribute("data-error", "Veuillez selectionner une ville");
    allRadioBtn[0].parentElement.setAttribute("data-error-visible", "true");
    return false;
  }
}

/**
 * Cette fonction test si la checkbox requise est checked. Si c'est faux,
 * ajoute une paire d'attribut à l'element parent pour afficher un message d'avertissement
 * et retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function isREquiredInputChecked(input) {
  if (!input.checked) {
    input.parentElement.setAttribute("data-error", "Vous devez accepter les conditions d'utilisation");
    input.parentElement.setAttribute("data-error-visible", "true");
    return false;
  } else {
    input.parentElement.setAttribute("data-error-visible", "false");
    return true;
  }
}

/**
 * Cette fonction s'assure que toutes les valeurs du tableau
 * array soit true
 * @param {boolean} array liste de valeur bool de l'ensemble des tests sur les inputs
 * @returns boolean
 */
function isAllTrue(array) {
  if (array.every((elem) => elem === true)){
    return true;
  } else {
    return false;
  }
}

/************** Event listener sur submit et fonction validate() associée **************/
/**
 * Cette fonction construit l'array boolFromValidation avec le résultat des validations
 * de l'ensemble des inputs et affiche le popup de confirmation si tout est validé
 * @param {NodeListOf<Element>} alphaNumFields nodelist des inputs alphanumérique
 * @param {NodeListOf<Element>} btnRadio nodelist des inputs radio
 * @param {HTMLElement} btnRequired checkbox checked requise
 */
function validate(alphaNumFields, btnRadio, btnRequired) {

  let boolFromValidation = [];

  for(let i = 0; i < alphaNumFields.length; i++) {
    boolFromValidation.push(parseAllAlphaNumField(alphaNumFields[i]));
  }
  boolFromValidation.push(parseRadioInput(btnRadio));
  boolFromValidation.push(isREquiredInputChecked(btnRequired));

  if (isAllTrue(boolFromValidation)) {
    displayConfirmPopup();
  }
}

let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  validate(everyAlphaNumFields, everyBtnRadio, requiredCheckboxBtn);
})
