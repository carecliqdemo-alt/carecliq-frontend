// =====================================
// CARECLIQ CMS ADMIN CORE
// =====================================


// API

const API =
`${window.CARECLIQ_CONFIG.API_BASE}/api/content`;


// Global website data

let websiteData = {};



// =====================================
// LOAD WEBSITE CONTENT
// =====================================

async function loadContent(){


    try{


        const response =
        await fetch(API);



        websiteData =
        await response.json();



        console.log(
            "CMS Loaded",
            websiteData
        );



        // Load Modules

        populateHero();

        loadFeatures();

        loadProcess();

        loadStory();

        loadRoles();

        loadTestimonials();

        loadTranslation();

        loadCTA();

        loadFooter();

        loadMedia();

        loadInformationPages();

        loadSettings();

const savedSection =
localStorage.getItem(
    "activeCMSSection"
);

if (savedSection) {

    const savedButton =
    document.querySelector(
        `.sidebar button[data-section="${savedSection}"]`
    );

    if (savedButton) {

        savedButton.click();

    }

}

    }
    catch(error){


        console.error(
            "CMS Loading Failed:",
            error
        );


    }


}




// Start CMS

loadContent();





// =====================================
// SAVE WEBSITE CONTENT
// =====================================


document
.getElementById("saveBtn")
.addEventListener(
"click",
saveContent
);



async function saveContent(){



    try{


        // Collect module data


        collectHero();

        collectFeatures();

        collectProcess();

        collectStory();

        collectRoles();

        collectTestimonials();

        collectTranslation();

        collectCTA();

        collectFooter();

        collectInformationPages();

        collectSettings();



        const response =
        await fetch(
            API,
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(
                    websiteData
                )

            }
        );



        const result =
        await response.json();



        alert(
            result.message
            ||
            "Changes saved"
        );


    }
    catch(error){


        console.error(
            "Save failed:",
            error
        );


        alert(
            "Saving failed"
        );


    }



}






// =====================================
// SIDEBAR NAVIGATION
// =====================================



const menuButtons =
document.querySelectorAll(
".sidebar button"
);



const sections =
document.querySelectorAll(
".editor-section"
);



const pageTitle =
document.querySelector(
".topbar h1"
);



menuButtons.forEach(button=>{


    button.addEventListener(
    "click",
    ()=>{

        localStorage.setItem(
    "activeCMSSection",
    button.dataset.section
);

        menuButtons.forEach(btn=>{

            btn.classList.remove(
                "active"
            );

        });



        button.classList.add(
            "active"
        );



        sections.forEach(section=>{

            section.classList.remove(
                "active"
            );

        });



        const selected =
        document.getElementById(
            button.dataset.section
        );



if(selected){

    selected.classList.add(
        "active"
    );

}

if(button.dataset.section === "demo-requests"){

    loadDemoRequests();

}



        pageTitle.textContent =
        button.textContent.trim()
        +
        " Editor";



    });


});

const logoutButton =
document.getElementById("logoutBtn");

if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "adminUser"
      );

      window.location.replace(
        "login.html"
      );

    }
  );

}

window.loadFeatures = loadFeatures;
window.collectFeatures = collectFeatures;