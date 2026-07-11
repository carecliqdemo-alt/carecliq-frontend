// =====================================
// FOOTER MODULE
// =====================================


function loadFooter(){


const footer =
websiteData.homepage.footer || {};



document.getElementById("footerCompany").value =
footer.company || "";


document.getElementById("footerDescription").value =
footer.description || "";


document.getElementById("footerEmail").value =
footer.contact?.email || "";


document.getElementById("footerPhone").value =
footer.contact?.phone || "";


document.getElementById("footerAddress").value =
footer.contact?.address || "";


document.getElementById("footerEmailIcon").value =
footer.icons?.email || "mail";


document.getElementById("footerPhoneIcon").value =
footer.icons?.phone || "phone";


document.getElementById("footerLocationIcon").value =
footer.icons?.location || "map-pin";


document.getElementById("footerCopyright").value =
footer.copyright || "";


}





// REPLACE OLD collectFooter WITH THIS

function collectFooter(){


websiteData.homepage.footer = {


company:
document.getElementById("footerCompany").value,


description:
document.getElementById("footerDescription").value,


contact:{


email:
document.getElementById("footerEmail").value,


phone:
document.getElementById("footerPhone").value,


address:
document.getElementById("footerAddress").value


},



icons:{


email:
document.getElementById("footerEmailIcon").value,


phone:
document.getElementById("footerPhoneIcon").value,


location:
document.getElementById("footerLocationIcon").value


},



copyright:
document.getElementById("footerCopyright").value



};


}




window.loadFooter = loadFooter;
window.collectFooter = collectFooter;