function displayModal() {
  const contactModal = document.getElementById("contact-modal");
  contactModal.style.display = "block";
}

function closeModal() {
  const contactModal = document.getElementById("contact-modal");
  contactModal.style.display = "none";
}

///// globals variables.
// form
const contactForm = document.getElementById("contact-form");
const invalidMessages = document.querySelectorAll(".invalid-fields");
// inputs
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");

///// tests functions
// tests the length of a string
function testLength(string, element) {
  if (string.length >= 2) {
    element.style.border = "none";
    return true;
  }
  element.style.border = "2px solid #901c1c";
  return false;
}

// tests email
function isEmail(email, element) {
  // regex : "RFC2822 Email Validation" by Tripleaxis on regexr.com
  const regExpMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (regExpMail.test(email.value)) {
    element.style.border = "none";
    return true;
  }
  element.style.border = "2px solid #901c1c";
  return false;
}

///// validation functions
// validates inputs
function isValid(callback, value, index, element) {
  if (callback(value, element)) {
    invalidMessages[index].classList.remove("invalid-field");
    return true;
  }
  invalidMessages[index].classList.add("invalid-field");
  throw new Error(`The field n°${index} isn't valid`);
}

// checks if all inputs are valid
function allValid() {
  wishedTournament = document.querySelector("#tournament .checkbox-input:checked");
  try {
    isValid(testLength, firstName.value, 0, firstName);
    isValid(testLength, lastName.value, 1, lastName);
    isValid(isEmail, email, 2, email);
    isValid(testLength, message.value, 3, message);
  } catch (err) {
    var error = err;
    console.error(err);
  }
  return !error;
}

///// launches submit
function validate(e) {
  e.preventDefault();

  if (allValid()) {
    closeModal(contactForm);

    // delete when production
    console.log(
      "this would be sent to the server :" +
        JSON.stringify({
          name: first.value,
          surname: last.value,
          email: email.value,
          message: message.value,
        })
    );

    /*
fetch("url", {
      method: "POST",
      headers: JSON.stringify({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
          name: first.value,
          surname: last.value,
          email: email.value,
          message: message.value,
      }),
    });
*/
  }
}

// submit event
contactForm.addEventListener("submit", validate);
