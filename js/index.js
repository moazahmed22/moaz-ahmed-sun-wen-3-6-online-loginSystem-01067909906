const loginForm = document.querySelector("#loginForm");
const signUpForm = document.querySelector("#signUpForm");
const loginAlert = document.querySelector("#loginAlert");
const signUpAlert = document.querySelector("#signUpAlert");
const switchFormBtns = Array.from(document.querySelectorAll(".switchFormBtns"));
const loginBtn = document.querySelector("#loginBtn");
const signUpBtn = document.querySelector("#signUpBtn");
const whiteOverlay = document.querySelector(".whiteOverlay");
const loginFormInputs = Array.from(loginForm.querySelectorAll("input"));
const signUpFormInputs = Array.from(signUpForm.querySelectorAll("input"));
const overlayAlert = whiteOverlay.querySelector("p");
let alertMessages = {
  name: "name must be at least 2 characters",
  email: "email is not valid",
  password: "password is not valid",
  login: "email or password is not correct",
};

let usersDataBase = JSON.parse(localStorage.getItem("usersDataBase")) || [];
let LoggedUser = localStorage.getItem("LoggedUser");

// if user is logged the open the home page
if (LoggedUser) {
  window.open("./pages/home.html" , "_self");
} else if (!LoggedUser) {
  // handel input validation in both forms
  signUpFormInputs.forEach((element) => {
    element.addEventListener("input", (event) => {
      formValidation(event.target);
    });
  });
  loginFormInputs.forEach((element) => {
    element.addEventListener("input", (event) => {
      formValidation(event.target);
    });
  });

  // handel login button
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // evaluate inputs before the query
    if (
      loginFormInputs.every((element) => element.value !== "") &&
      loginFormInputs.every((element) =>
        element.classList.contains("success-input")
      )
    ) {
      // query on usersDataBase to find a match
      usersDataBase.forEach((user) => {
        if (
          user.email == loginFormInputs[0].value &&
          user.password == loginFormInputs[1].value
        ) {
          LoggedUser = user.name;
          localStorage.setItem("LoggedUser", LoggedUser);
          window.open("./pages/home.html", "_self");
        }
        // if user not found
        else {
          overlayAlert.textContent = alertMessages.login;
          loginAlert.textContent = alertMessages.login;
        }
      });
    } else {
      // handeling error messages on signup
      let errorFields = [...loginForm.querySelectorAll(".wrong-input")];
      let errorMsgs = "";
      errorFields.forEach((element) => {
        switch (element.id) {
          case "loginEmail":
            errorMsgs += `${alertMessages.email}, `;
            break;
          case "loginPassword":
            errorMsgs += `${alertMessages.password}, `;
            break;
        }
      });
      overlayAlert.textContent = errorMsgs || "one or more inputs are empty";
      loginAlert.textContent =
        errorFields.length > 0
          ? "one or more inputs are invalid"
          : "one or more inputs are empty";
    }
  });
  // handle signup button
  signUpBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // validate inputs before sign up
    if (
      signUpFormInputs.every((element) => element.value !== "") &&
      signUpFormInputs.every((element) =>
        element.classList.contains("success-input")
      )
    ) {
      addNewUser();
      overlayAlert.textContent = "success";
      signUpAlert.textContent = "success";
      setTimeout(() => {
        overlayAlert.textContent =
          "please signup using your name, account and password";
        signUpAlert.textContent = "";
      }, 1000);
    } else {
      // handeling error messages on signup
      let errorFields = [...signUpForm.querySelectorAll(".wrong-input")];
      let errorMsgs = "";
      errorFields.forEach((element) => {
        switch (element.id) {
          case "signUpName":
            errorMsgs += `${alertMessages.name}, `;
            break;
          case "signUpEmail":
            errorMsgs += `${alertMessages.email}, `;
            break;
          case "signUpPassword":
            errorMsgs += `${alertMessages.password}, `;
            break;
        }
      });
      overlayAlert.textContent = errorMsgs || "one or more inputs are empty";
      signUpAlert.textContent =
        errorFields.length > 0
          ? "one or more inputs are invalid"
          : "one or more inputs are empty";
    }
  });
}

// function to add new users to the usersDataBase
let addNewUser = () => {
  let newUser = {
    name: signUpFormInputs[0].value,
    email: signUpFormInputs[1].value,
    password: signUpFormInputs[2].value,
  };
  usersDataBase.push(newUser);
  cleanInputFields();
  addUserToLocalStorage();
};

// function to add usersDataBase to local storage
let addUserToLocalStorage = () => {
  localStorage.setItem("usersDataBase", JSON.stringify(usersDataBase));
};

// function to clear input fields
let cleanInputFields = () => {
  let fields = Array.from(document.querySelectorAll("input"));
  fields.forEach((element) => {
    element.value = null;
  });
};

// overlay slide animation
switchFormBtns.forEach((element) => {
  element.addEventListener("click", (event) => {
    whiteOverlay.classList.toggle("whiteOverlayAnimtation");
    loginForm.classList.toggle("d-none");
    loginForm.classList.toggle("d-flex");
    signUpForm.classList.toggle("d-none");
    signUpForm.classList.toggle("d-flex");
    overlayAlert.textContent = signUpForm.classList.contains("d-none")
      ? "please login using your email and password"
      : `please signup using your name, account and password`;
  });
});
// validating both forms
// validation styling on input
let formValidation = (target) => {
  let regex;
  switch (target.id) {
    case "signUpName":
      regex = /^[A-Za-z\s]{2,}$/m;
      if (regex.test(target.value)) {
        target.classList.remove("wrong-input");
        target.classList.add("success-input");
        // signup alert on mobile
        signUpAlert.classList.remove("text-alert");
        signUpAlert.textContent = null;
        // signup alert on overlay
        overlayAlert.classList.remove("text-alert");
        overlayAlert.textContent =
          "please signup using your name, account and password";
      } else {
        target.classList.remove("success-input");
        target.classList.add("wrong-input");

        signUpAlert.classList.add("text-alert");
        signUpAlert.textContent = alertMessages.name;

        overlayAlert.classList.add("text-alert");
        overlayAlert.textContent = alertMessages.name;
      }
      break;
    case "signUpEmail":
      regex = /^[A-Za-z]{2,}\@[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/m;
      if (regex.test(target.value)) {
        target.classList.remove("wrong-input");
        target.classList.add("success-input");
        // alert on mobile login and signup
        signUpAlert.classList.remove("text-alert");
        signUpAlert.textContent = null;
        // alert on overlay
        overlayAlert.classList.remove("text-alert");
        overlayAlert.textContent =
          "please signup using your name, account and password";
      } else {
        target.classList.remove("success-input");
        target.classList.add("wrong-input");
        // alert on mobile signup
        signUpAlert.classList.add("text-alert");
        signUpAlert.textContent = alertMessages.email;
        // alert on overlay
        overlayAlert.classList.add("text-alert");
        overlayAlert.textContent = alertMessages.email;
      }
      break;
    case "loginEmail":
      regex = /^[A-Za-z]{2,}\@[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/m;
      if (regex.test(target.value)) {
        target.classList.remove("wrong-input");
        target.classList.add("success-input");
        // alert on mobile login
        loginAlert.classList.remove("text-alert");
        loginAlert.textContent = null;
        // alert on overlay
        overlayAlert.classList.remove("text-alert");
        overlayAlert.textContent =
          "please signup using your name, account and password";
      } else {
        target.classList.remove("success-input");
        target.classList.add("wrong-input");
        // alert on mobile login
        loginAlert.classList.add("text-alert");
        loginAlert.textContent = alertMessages.email;
        // alert on overlay
        overlayAlert.classList.add("text-alert");
        overlayAlert.textContent = alertMessages.email;
      }
      break;
    case "signUpPassword":
      regex = /^\S+$/m;
      if (regex.test(target.value)) {
        target.classList.remove("wrong-input");
        target.classList.add("success-input");
        // alert on mobile login and signup
        signUpAlert.classList.remove("text-alert");
        signUpAlert.textContent = null;
        // alert on overlay
        overlayAlert.classList.remove("text-alert");
        overlayAlert.textContent =
          "please signup using your name, account and password";
      } else {
        target.classList.remove("success-input");
        target.classList.add("wrong-input");
        // alert on mobile login and signup
        signUpAlert.classList.add("text-alert");
        signUpAlert.textContent = alertMessages.password;
        // alert on overlay
        overlayAlert.classList.add("text-alert");
        overlayAlert.textContent = alertMessages.password;
      }
      break;
    case "loginPassword":
      regex = /^\S+$/m;
      if (regex.test(target.value)) {
        target.classList.remove("wrong-input");
        target.classList.add("success-input");
        // alert on mobile login and signup
        loginAlert.classList.remove("text-alert");
        loginAlert.textContent = null;
        // alert on overlay
        overlayAlert.classList.remove("text-alert");
        overlayAlert.textContent =
          "please signup using your name, account and password";
      } else {
        target.classList.remove("success-input");
        target.classList.add("wrong-input");
        // alert on mobile login and signup
        loginAlert.classList.add("text-alert");
        loginAlert.textContent = alertMessages.password;
        // alert on overlay
        overlayAlert.classList.add("text-alert");
        overlayAlert.textContent = alertMessages.password;
      }
      break;
  }
};
