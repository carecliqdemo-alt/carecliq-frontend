// =====================================
// TRANSLATION MODULE
// =====================================


let translationLanguages = [];


// LOAD

function loadTranslation(){


    if(!websiteData.homepage.translation){

        websiteData.homepage.translation = {

            badge:"",
            title:"",
            description:"",
            languages:[]

        };

    }


    const translation =
    websiteData.homepage.translation;



    document.getElementById("translationBadge").value =
    translation.badge || "";



    document.getElementById("translationTitle").value =
    translation.title || "";



    document.getElementById("translationDescription").value =
    translation.description || "";



    translationLanguages =
    translation.languages || [];


    renderLanguages();

}



// RENDER

function renderLanguages(){


    const container =
    document.getElementById("translationLanguages");


    container.innerHTML="";



    translationLanguages.forEach((lang,index)=>{


        container.innerHTML += `

        <div class="language-editor">


        <h3>
        Language ${index+1}
        </h3>


        <label>
        Code
        </label>

        <input 
        class="lang-code"
        value="${lang.code || ""}"
        >


        <label>
        Label
        </label>

        <input 
        class="lang-label"
        value="${lang.label || ""}"
        >


        <label>
        Worker Text
        </label>

        <textarea class="lang-worker">${lang.worker || ""}</textarea>



        <label>
        Compliant Text
        </label>

        <textarea class="lang-compliant">${lang.compliant || ""}</textarea>


        <button onclick="deleteLanguage(${index})">
        Delete
        </button>


        </div>

        `;


    });


}



// ADD

document
.getElementById("addLanguage")
.addEventListener("click",()=>{


    translationLanguages.push({

        code:"",
        label:"",
        worker:"",
        compliant:""

    });


    renderLanguages();


});



// DELETE

function deleteLanguage(index){

    translationLanguages.splice(index,1);

    renderLanguages();

}




// COLLECT

function collectTranslation(){


    const cards =
    document.querySelectorAll(".language-editor");


    translationLanguages=[];



    cards.forEach(card=>{


        translationLanguages.push({

            code:
            card.querySelector(".lang-code").value,


            label:
            card.querySelector(".lang-label").value,


            worker:
            card.querySelector(".lang-worker").value,


            compliant:
            card.querySelector(".lang-compliant").value

        });


    });



    websiteData.homepage.translation = {


        badge:
        document.getElementById("translationBadge").value,


        title:
        document.getElementById("translationTitle").value,


        description:
        document.getElementById("translationDescription").value,


        languages:
        translationLanguages

    };


}


window.loadTranslation = loadTranslation;
window.collectTranslation = collectTranslation;