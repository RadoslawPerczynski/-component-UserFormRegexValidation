document.getElementById("inputName").addEventListener("blur", validate);
document.getElementById("inputZipCode").addEventListener("blur", validate);
document.getElementById("inputEmail").addEventListener("blur", validate);
document.getElementById("inputPhone").addEventListener("blur", validate);
document.getElementById("inputPassword").addEventListener("blur", validate);
document.querySelector("form").addEventListener("submit", formSubmissionHandler);

document.addEventListener("DOMContentLoaded", showPage);

const submitButton = document.getElementById("submitBtn");
checkIfWasSubmitted();


function validate(e) {
  const inputElement = e.target;
  const inputText = inputElement.value;

  const re = returnRegexDependingOnTheInputId(inputElement.id);

  if (re.test(inputText)) {
    if (inputElement.classList.contains("is-invalid")) {
      inputElement.classList.remove("is-invalid");
    }
    inputElement.classList.add("is-valid");
    //console.log(`${inputText} matches ${re.source}`);
  } else {
    if (inputElement.classList.contains("is-valid")) {
      inputElement.classList.remove("is-valid");
    }
    inputElement.classList.add("is-invalid");
    //console.log(`${inputText} DOES NOT matches ${re.source}`);
  }

  validateForm();
}

function returnRegexDependingOnTheInputId(inputId) {
  let returnedRegEx = "";

  switch (inputId) {
    case "inputName":
      returnedRegEx = "^[A-Za-z0-9]{6,}$";
      break;
    case "inputZipCode":
      returnedRegEx = "^[A-Za-z0-9]{3}[-\\s]?[0-9]{4}$|\\d{2}-\\d{3}$";
      break;
    case "inputEmail":
      returnedRegEx =
        "^(?=\\w+)((?!&|=|_|'|\\s|-|\\+|,|<|>|(\\.{2,})).)*@(\\w+\\.(\\w){2,5})$";
      break;
    case "inputPhone":
      returnedRegEx =
        "^(\\(?\\+?\\d{3}\\)?)?([\\s-])?(\\d{4})([\\s-])?(\\d{4})$";
      break;
    case "inputPassword":
      const passwordField = document.getElementById(inputId);
      const password = passwordField.value;
      const feedback = getFeedbackFromPassword(password);

      if (feedback != "ok") {
        passwordField.nextElementSibling.textContent = feedback;
        returnedRegEx = "\\b\\B"; //do not match anything if the feedback is not ok.
      }

      break;
  }

  return new RegExp(returnedRegEx);
}

function getFeedbackFromPassword(str) {
  if (str.length == 0) {
    return "Password is empty";
  } else if (str.length < 6) {
    return "Password is too short";
  } else if (str.search(/\d/) == -1) {
    return "Password must contain a number";
  } else if (str.search(/[A-Z]/) == -1) {
    return "Password must contain a capital letter";
  } else if (str.search(/[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+]/) == -1) {
    return "Password must contain a special character";
  }
  return "ok";
}

function validateForm() {
  const listOfInputsToValidate = document.querySelectorAll("form input");

  for (i = 0; i < listOfInputsToValidate.length; i++) {
    let currentInput = listOfInputsToValidate[i];

    if (currentInput.classList.contains("is-invalid")) {
      submitButton.disabled = true;
      break;
    } else {
      submitButton.disabled = false;
    }
  }
}

function formSubmissionHandler(e) {
  e.preventDefault();

  let url = window.location.href;
  if (url.indexOf("?") > -1) {
    url += "&thankyou";
  } else {
    url += "?thankyou";
  }
  window.location.href = url;
}

function checkIfWasSubmitted() {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("thankyou")) {
    document.querySelector(".container").innerHTML = `
      <h1 class="mt-5">Thank you for submission!</h1>
      <p>Do you want to submit another one? Click <a href="/">here</a></p>
    `;
  }
}

function showPage() {
  document.body.style.opacity = 1;
}
