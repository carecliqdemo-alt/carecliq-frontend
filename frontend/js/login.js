
document.addEventListener("DOMContentLoaded", () => {

  const panels = {

    login:
      document.getElementById("loginPanel"),

    register:
      document.getElementById("registerPanel"),

    forgot:
      document.getElementById("forgotPanel"),

    reset:
      document.getElementById("resetPanel")

  };


  function showPanel(name) {

    const selected =
      panels[name]
        ? name
        : "login";


    Object.entries(panels).forEach(
      ([panelName, panel]) => {

        if (!panel) return;

        panel.hidden =
          panelName !== selected;

      }
    );


    const token =
      new URLSearchParams(
        window.location.search
      ).get("token");


    let newUrl =
      "login.html";


    if (selected !== "login") {

      newUrl =
        `login.html?view=${selected}`;

    }


    if (
      selected === "reset" &&
      token
    ) {

      newUrl =
        `login.html?view=reset&token=${encodeURIComponent(token)}`;

    }


    history.replaceState(
      {},
      "",
      newUrl
    );


    const card =
      document.querySelector(
        ".carecliq-login-card"
      );


    if (card) {

      card.scrollTop = 0;

    }

  }


  document
    .querySelectorAll("[data-show-panel]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          showPanel(
            button.dataset.showPanel
          );

        }
      );

    });


  document
    .querySelectorAll(".password-toggle")
    .forEach(toggle => {

      toggle.addEventListener(
        "click",
        () => {

          const input =
            document.getElementById(
              toggle.dataset.target
            );


          if (!input) return;


          input.type =
            input.type === "password"
              ? "text"
              : "password";

        }
      );

    });


  const params =
    new URLSearchParams(
      window.location.search
    );


  const resetToken =
    params.get("token");


  const requestedView =
    resetToken
      ? "reset"
      : params.get("view") || "login";


  showPanel(requestedView);


  const loginForm =
    document.getElementById("loginForm");


  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        try {

          const result =
            await authAPI.login({

              email:
                document
                  .getElementById("loginEmail")
                  .value
                  .trim(),

              password:
                document
                  .getElementById("loginPassword")
                  .value

            });


          if (result.token) {

            localStorage.setItem(
              "token",
              result.token
            );


            localStorage.setItem(
              "user",
              JSON.stringify(result.user)
            );


            window.location.href =
              "index.html";

            return;

          }


          alert(
            result.message ||
            "Login failed"
          );

        }
        catch (error) {

          console.error(
            "Login failed:",
            error
          );


          alert(
            "Unable to login. Please try again."
          );

        }

      }
    );

  }


  const registerForm =
    document.getElementById("registerForm");


  if (registerForm) {

    registerForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const password =
          document
            .getElementById("registerPassword")
            .value;


        const confirmPassword =
          document
            .getElementById("confirmPassword")
            .value;


        if (
          password !== confirmPassword
        ) {

          alert(
            "Passwords do not match"
          );

          return;

        }


        try {

          const result =
            await authAPI.register({

              fullName:
                document
                  .getElementById("fullName")
                  .value
                  .trim(),

              organisation:
                document
                  .getElementById("organisation")
                  .value
                  .trim(),

              role:
                document
                  .getElementById("role")
                  .value,

              email:
                document
                  .getElementById("registerEmail")
                  .value
                  .trim(),

              phone:
                document
                  .getElementById("phone")
                  .value
                  .trim(),

              password:
                password

            });


          alert(
            result.message ||
            "Account created"
          );


          if (result.userId) {

            showPanel("login");

          }

        }
        catch (error) {

          console.error(
            "Registration failed:",
            error
          );


          alert(
            "Unable to create account."
          );

        }

      }
    );

  }


  const forgotForm =
    document.getElementById("forgotForm");


  if (forgotForm) {

    forgotForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        try {

          const result =
            await authAPI.forgotPassword({

              email:
                document
                  .getElementById("forgotEmail")
                  .value
                  .trim()

            });


          alert(
            result.message ||
            "Reset instructions sent"
          );

        }
        catch (error) {

          console.error(
            "Forgot password failed:",
            error
          );


          alert(
            "Unable to send reset instructions."
          );

        }

      }
    );

  }


  const resetPasswordForm =
    document.getElementById(
      "resetPasswordForm"
    );


  if (resetPasswordForm) {

    resetPasswordForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const password =
          document
            .getElementById("resetPassword")
            .value;


        const confirmPassword =
          document
            .getElementById("resetConfirmPassword")
            .value;


        if (
          password !== confirmPassword
        ) {

          alert(
            "Passwords do not match"
          );

          return;

        }


        const token =
          new URLSearchParams(
            window.location.search
          ).get("token");


        if (!token) {

          alert(
            "Reset token is missing or invalid."
          );

          return;

        }


        try {

          const result =
            await authAPI.resetPassword({

              token:
                token,

              password:
                password

            });


          alert(
            result.message ||
            "Password updated"
          );


          if (
            result.message ===
            "Password updated"
          ) {

            showPanel("login");

          }

        }
        catch (error) {

          console.error(
            "Password reset failed:",
            error
          );


          alert(
            "Unable to reset password."
          );

        }

      }
    );

  }

});

