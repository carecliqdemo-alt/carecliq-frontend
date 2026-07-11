const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


const password =
document.getElementById("registerPassword").value;


    const confirmPassword =
    document.getElementById("confirmPassword").value;


    if(password !== confirmPassword){

        alert("Passwords do not match");

        return;

    }


    const result = await authAPI.register({

        fullName:
        document.getElementById("fullName").value,


        organisation:
        document.getElementById("organisation").value,


        role:
        document.getElementById("role").value,


      email:
document.getElementById("registerEmail").value,

        phone:
        document.getElementById("phone").value,


        password

    });



    alert(
        result.message
    );

if(result.userId){

    window.location.href =
    "login.html";

    }


});