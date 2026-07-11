// =====================================
// ROLES MODULE
// =====================================


let rolesCards = [];


// =====================================
// LOAD ROLES
// =====================================

function loadRoles(){


    if(!websiteData.homepage.roles){

        websiteData.homepage.roles = {
            title:"",
            subtitle:"",
            cards:[]
        };

    }


    const roles =
    websiteData.homepage.roles;



    document.getElementById("rolesTitle").value =
    roles.title || "";



    document.getElementById("rolesSubtitle").value =
    roles.subtitle || "";



    rolesCards = roles.cards || [];



    renderRoles();


}




// =====================================
// RENDER ROLE CARDS
// =====================================

function renderRoles(){


    const container =
    document.getElementById("rolesList");


    container.innerHTML = "";



    rolesCards.forEach((role,index)=>{


        const card =
        document.createElement("div");


        card.className =
        "role-editor-card";



        card.innerHTML = `


        <h3>
        Role ${index + 1}
        </h3>


        <label>
        Title
        </label>

        <input 
        class="role-title"
        value="${role.title || ""}"
        >



        <label>
        Subtitle
        </label>

        <input 
        class="role-subtitle"
        value="${role.subtitle || ""}"
        >



        <label>
        Image
        </label>

        <input 
        class="role-image"
        value="${role.image || ""}"
        >



        <label>
        Features (one per line)
        </label>


        <textarea class="role-features">${(role.features || []).join("\n")}</textarea>



        <button onclick="deleteRole(${index})">
        Delete Role
        </button>


        `;



        container.appendChild(card);


    });


}




// =====================================
// ADD ROLE
// =====================================


document
.getElementById("addRole")
.addEventListener("click",()=>{


    rolesCards.push({

        title:"",
        subtitle:"",
        image:"",
        features:[]

    });


    renderRoles();


});




// =====================================
// DELETE ROLE
// =====================================

function deleteRole(index){


    rolesCards.splice(index,1);


    renderRoles();

}




// =====================================
// COLLECT ROLES
// =====================================


function collectRoles(){


    const cards =
    document.querySelectorAll(".role-editor-card");



    rolesCards = [];



    cards.forEach(card=>{


        rolesCards.push({

            title:
            card.querySelector(".role-title").value,


            subtitle:
            card.querySelector(".role-subtitle").value,


            image:
            card.querySelector(".role-image").value,


            features:
            card.querySelector(".role-features")
            .value
            .split("\n")
            .filter(item=>item.trim() !== "")


        });


    });




    websiteData.homepage.roles.title =

    document.getElementById("rolesTitle").value;




    websiteData.homepage.roles.subtitle =

    document.getElementById("rolesSubtitle").value;




    websiteData.homepage.roles.cards =

    rolesCards;



}

window.loadRoles = loadRoles;
window.collectRoles = collectRoles;
window.deleteRole = deleteRole;