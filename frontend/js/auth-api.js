const API_BASE = "https://carecliq.onrender.com";


async function authRequest(endpoint, data){

    const response = await fetch(
        `${API_BASE}/api/auth/${endpoint}`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
    );


    return await response.json();

}



window.authAPI = {


register(data){

    return authRequest(
        "register",
        data
    );

},


login(data){

    return authRequest(
        "login",
        data
    );

},


forgotPassword(data){

    return authRequest(
        "forgot-password",
        data
    );

},


resetPassword(data){

    return authRequest(
        "reset-password",
        data
    );

}


};