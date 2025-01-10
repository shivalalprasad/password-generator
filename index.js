
document.getElementById("generate").addEventListener("click", generatePassword);

document.getElementById("CopyPassword").addEventListener("click", copyPassword);

function createErrorMessage(message) {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error');

  const errorIcon = document.createElement('div');
  errorIcon.classList.add('error__icon');
  errorIcon.innerHTML = `
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path>
    </svg>
  `;
  errorContainer.appendChild(errorIcon);

  const errorTitle = document.createElement('div');
  errorTitle.classList.add('error__title');
  errorTitle.textContent = message;
  errorContainer.appendChild(errorTitle);

  const closeButton = document.createElement('div');
  closeButton.classList.add('error__close');
  closeButton.innerHTML = `
    <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37"></path>
    </svg>
  `;
  closeButton.addEventListener('click', () => errorContainer.remove());
  errorContainer.appendChild(closeButton);

  return errorContainer;
}

function displayError(message) {
  const errorMessageElement = createErrorMessage(message);

  document.getElementById("err").appendChild(errorMessageElement);

  setTimeout(() => {
    errorMessageElement.remove();
  }, 2000);
}

function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  if (!length) {
    displayError("invalid password length");
    return;
  }
  const options = {
    lowercase: document.getElementById("lowercase").checked,
    uppercase: document.getElementById("uppercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("symbols").checked,
  };

  let charset = "";

  if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.numbers) charset += "0123456789";
  if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]\:;?><,./-=";

  if (!charset) {
    displayError("invalid complexity of password");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  document.getElementById("password").value = password;
  document.getElementById("CopyPassword").innerText = "📋";
}

function copyPassword() {
  const password = document.getElementById("password").value;
  if (!password) return;

  navigator.clipboard.writeText(password)
    .then(() => {
      document.getElementById("CopyPassword").innerText = "✔️";
    })
}

