function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// RegExp
const textReg = new RegExp("^[a-zA-Z\-]{2,}");
const mailReg = new RegExp("^[a-zA-Z0-9._\-]+\@[a-zA-Z]+\.[a-zA-Z]+");
const dateReg = new RegExp("^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$");
const quantityReg = new RegExp("^[0-9]{1,2}$");

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
/**
 * Cette fonction récupère la valeur de l'element HTML
 * et la compare à l'expression régulière textReg
 * Si le test est false, on ajoute une paire d'attribut à l'element parent
 * pour afficher un message d'avertissement et retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function validateName(input) {
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
 * On compare avec l'expression régulière mailReg
 * Si le test est false, on ajoute une paire d'attribut à l'element parent
 * pour afficher un message d'avertissement et retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function validateEmail(input) {
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

// var inputDate = document.querySelectorAll("input[type=date]");
// for (let d of inputDate) {
//   d.type='';
// }

/**
 * Cette fonction récupère la valeur de l'element HTML et on construit une 
 * instance Date avec cette valeur. La fonction test si date est un nombre
 * (si date est de type string ou null, NaN retourne true). Si isNaN retourne
 * true, la date est invalide, on ajoute une paire d'attribue à l'element parent
 * pour afficher un message d'avertissement et on retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function validateDate(input) {
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
 * l'expression régulière quantityReg. Si le test retourne false, on ajoute
 * une paire d'attribut à l'element parent pour afficher un message d'avertissement
 * et on retourne false
 * @param {HTMLElement} input 
 * @returns bool
 */
function validateQuantity(input) {
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
 * Cette fonction récupère l'ensemble des boutons radios du document et
 * stock dans la variable radioChecked le bouton radio "checked". Si
 * radioChecked est null, aucun bouton radio n'est selectionné, on ajoute
 * donc une paire d'attribut à l'element parent pour afficher un message
 * d'avertissement et on retourne false
 * @returns bool
 */
function validateRadio() {
  let radioBtn = document.querySelectorAll("input[type=radio");
  let radioChecked = document.querySelector("input[type=radio]:checked");
  if (radioChecked != null) {
    radioChecked.parentElement.setAttribute("data-error-visible", "false");
    return true;
  } else {
    radioBtn[0].parentElement.setAttribute("data-error", "Veuillez selectionner une ville");
    radioBtn[0].parentElement.setAttribute("data-error-visible", "true");
    return false;
  }
}

/**
 * Cette fonction test si une checkbox est checked. Si c'est faux,
 * on affiche un message d'avertissement
 * @param {HTMLElement} input 
 * @returns bool
 */
function isREquiredChecked(input) {
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
 * @param {array} array 
 */
function isAllTrue(array) {
  if (array.every((elem) => elem === true)){
    console.log("valid !");
  }
}

/************** Event listener sur submit et fonction validate() associée **************/
/**
 * Cette fonction est appelée lors du click sur l'input type submit dans form
 * Elle récupère les elements HTML des différents champs du formulaire et les test
 * Construit la liste des résultats des test (liste de booléen)
 */
function validate() {
  // Initialisation
  let listValidation = [];
  let inputFirst = document.getElementById("first");
  let inputLast = document.getElementById("last");
  let inputEmail = document.getElementById("email");
  let inputDate = document.getElementById("birthdate");
  let inputParticipation = document.getElementById("quantity");
  let btnRequired = document.getElementById("checkbox1");

  // Test des champs et construction de la liste
  listValidation.push(validateName(inputFirst));
  listValidation.push(validateName(inputLast));
  listValidation.push(validateEmail(inputEmail));
  listValidation.push(validateDate(inputDate));
  listValidation.push(validateQuantity(inputParticipation));
  listValidation.push(validateRadio());
  listValidation.push(isREquiredChecked(btnRequired));

  isAllTrue(listValidation);
}

let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
})
