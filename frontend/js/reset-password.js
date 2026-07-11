const resetForm =
document.getElementById("resetPasswordForm");

const params =
new URLSearchParams(
window.location.search
);


const token =
params.get("token");



resetForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();

const password =
document.getElementById("resetPassword").value;

const confirmPassword =
document.getElementById("resetConfirmPassword").value;

if (password !== confirmPassword) {

  alert("Passwords do not match");

  return;

}


const result =
await authAPI.resetPassword({

token,

password

});



alert(
result.message
);


if(result.message==="Password updated"){

window.location.href =
"login.html";

}


});