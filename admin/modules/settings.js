// =====================================
// SETTINGS MODULE
// =====================================


function loadSettings(){


    if(!websiteData.settings){

        websiteData.settings = {

            siteName:"",
            logo:"",
            favicon:""

        };

    }



    const settings =
    websiteData.settings;



    document.getElementById("siteName").value =
    settings.siteName || "";


    document.getElementById("siteLogo").value =
    settings.logo || "";


    document.getElementById("siteFavicon").value =
    settings.favicon || "";


}




function collectSettings(){


    websiteData.settings = {


        siteName:
        document.getElementById("siteName").value,


        logo:
        document.getElementById("siteLogo").value,


        favicon:
        document.getElementById("siteFavicon").value


    };


}



window.loadSettings = loadSettings;
window.collectSettings = collectSettings;