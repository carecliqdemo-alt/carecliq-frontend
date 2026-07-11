const forgotForm =
document.getElementById("forgotForm");


forgotForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();


const result =
await authAPI.forgotPassword({

email:
document.getElementById("forgotEmail").value
});


alert(
result.message
);


});