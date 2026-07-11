const AUTH_API =
  "https://carecliq.onrender.com/api/admin-auth/login";

console.log(
  "Admin endpoint loaded:",
  AUTH_API
);

document.addEventListener("DOMContentLoaded", () => {

  const form =
    document.getElementById("adminLoginForm");

  const emailInput =
    document.getElementById("adminEmail");

  const passwordInput =
    document.getElementById("adminPassword");

  const loginButton =
    document.getElementById("adminLoginButton");

  const status =
    document.getElementById("adminLoginStatus");

  const passwordToggle =
    document.getElementById("toggleAdminPassword");


  passwordToggle.addEventListener("click", () => {

    passwordInput.type =
      passwordInput.type === "password"
        ? "text"
        : "password";

  });


  form.addEventListener("submit", async event => {

    event.preventDefault();

    status.textContent = "";

    loginButton.disabled = true;
    loginButton.textContent = "Signing in...";

    try {

      const response =
        await fetch(AUTH_API, {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            email:
              emailInput.value.trim(),

            password:
              passwordInput.value

          })

        });


      const result =
        await response.json();


      if (!response.ok) {

        throw new Error(
          result.message ||
          "CMS login failed"
        );

      }


      if (!result.token) {

        throw new Error(
          "No authentication token was returned"
        );

      }


      localStorage.setItem(
        "adminToken",
        result.token
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(
          result.user || {}
        )
      );


      window.location.href =
        "dashboard.html";

    }
    catch (error) {

      status.textContent =
        error.message ||
        "Unable to sign in.";

    }
    finally {

      loginButton.disabled = false;
      loginButton.textContent =
        "Sign in to CMS";

    }

  });

});