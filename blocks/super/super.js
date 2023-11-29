import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  const form = document.createElement("form");
  form.setAttribute("id", "loginForm");
  form.setAttribute("action", "#");
  form.setAttribute("method", "post");

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "username");
  nameLabel.textContent = "Username:";

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "username");
  nameInput.setAttribute("name", "email");
  nameInput.setAttribute("required", "");

  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Password:";

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("required", "");

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Submit";

  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(passwordLabel);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);

  document.body.appendChild(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the values of all input fields
    const formData = new FormData(event.target);
    const values = {};

    for (const [name, value] of formData.entries()) {
      values[name] = value;
    }

    const email = values.email;
    const password = values.password;

    // Process the form data here
    console.log(values);

    // Fetch API for a query
    const query = `
    generateCustomerToken query {
            users {
                email
                password
            }
        }
        `;

    const url = "https://de.staging-5em2ouy-k3dxx3gc6vm22.eu-4.magentosite.cloud/graphql";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: {
            email,
            password
        } 
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.data.users));
  });
}
