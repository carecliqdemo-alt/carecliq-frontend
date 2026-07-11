// =====================================
// CTA MODULE
// =====================================


function loadCTA(){


    if(!websiteData.homepage.cta){

        websiteData.homepage.cta = {

            title:"",
            description:"",
            primaryButton:"",
            secondaryButton:""

        };

    }



    const cta =
    websiteData.homepage.cta;



    document.getElementById("ctaTitle").value =
    cta.title || "";



    document.getElementById("ctaDescription").value =
    cta.description || "";



    document.getElementById("ctaPrimary").value =
    cta.primaryButton || "";



    document.getElementById("ctaSecondary").value =
    cta.secondaryButton || "";


}




function collectCTA(){


    websiteData.homepage.cta = {


        title:
        document.getElementById("ctaTitle").value,


        description:
        document.getElementById("ctaDescription").value,


        primaryButton:
        document.getElementById("ctaPrimary").value,


        secondaryButton:
        document.getElementById("ctaSecondary").value


    };


}



window.loadCTA = loadCTA;
window.collectCTA = collectCTA;