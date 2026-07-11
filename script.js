const CMS_API =
`${window.CARECLIQ_CONFIG.API_BASE}/api/content`;

const BACKEND_URL =
  "https://carecliq-redesign.onrender.com";


function resolveMediaUrl(url) {

  if (!url) {
    return "";
  }

  const cleanUrl =
    String(url).trim();


  if (
    cleanUrl.startsWith("http://") ||
    cleanUrl.startsWith("https://") ||
    cleanUrl.startsWith("blob:") ||
    cleanUrl.startsWith("data:")
  ) {

    return cleanUrl;

  }


  if (cleanUrl.startsWith("/uploads/")) {

    return `${BACKEND_URL}${cleanUrl}`;

  }


  if (cleanUrl.startsWith("uploads/")) {

    return `${BACKEND_URL}/${cleanUrl}`;

  }


  if (cleanUrl.startsWith("/")) {

    return cleanUrl;

  }


  return `./${cleanUrl}`;

}


function getMediaType(url, fallback = "video") {

  const cleanUrl =
    String(url || "")
      .toLowerCase()
      .split("?")[0];


  const audioExtensions = [
    ".mp3",
    ".wav",
    ".ogg",
    ".m4a",
    ".aac"
  ];


  const videoExtensions = [
    ".mp4",
    ".webm",
    ".mov",
    ".m4v",
    ".ogv"
  ];


  if (
    audioExtensions.some(
      extension =>
        cleanUrl.endsWith(extension)
    )
  ) {

    return "audio";

  }


  if (
    videoExtensions.some(
      extension =>
        cleanUrl.endsWith(extension)
    )
  ) {

    return "video";

  }


  return fallback;

}


function createMediaButton({
  url,
  title,
  buttonText,
  type
}) {

  if (!url) {
    return "";
  }


  const resolvedUrl =
    resolveMediaUrl(url);

  const mediaType =
    type ||
    getMediaType(
      resolvedUrl
    );


  return `

    <button
      type="button"
      class="cms-media-trigger"
      data-media-type="${mediaType}"
      data-media-src="${resolvedUrl}"
      data-media-title="${title || "CareCliQ Media"}"
    >
      ${
        buttonText ||
        (
          mediaType === "audio"
            ? "▶ Listen"
            : "▶ Watch Video"
        )
      }
    </button>

  `;

}

let translationDatabase = {};

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

sections.forEach(section => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".scatter-card");

  // --- Scroll Observer Engine ---
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  cards.forEach(card => cardObserver.observe(card));

  // --- Mobile Tap Engine ---
  cards.forEach((card) => {
    card.addEventListener("touchstart", function(e) {
      // Toggle active tracking class natively
      cards.forEach(c => { if(c !== card) c.classList.remove("active-tap"); });
      this.classList.toggle("active-tap");
    }, { passive: true });
  });

  // Clear focus when tapping empty background areas
  document.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".scatter-card")) {
      cards.forEach(c => c.classList.remove("active-tap"));
    }
  }, { passive: true });
});

function setupLanguageButtons() {

  const pills = document.querySelectorAll(".lang-pill");

  const workerText = document.getElementById("workerText");
  const compliantText = document.getElementById("compliantText");
  const activeLanguageLabel = document.getElementById("activeLanguageLabel");


  pills.forEach(pill => {

    pill.addEventListener("click", function() {


      const selectedLang =
      this.getAttribute("data-lang");


      const dataset =
      translationDatabase[selectedLang];


      if(dataset){


        pills.forEach(p =>
          p.classList.remove("active")
        );


        this.classList.add("active");


        workerText.style.opacity = 0;
        compliantText.style.opacity = 0;



        setTimeout(()=>{


          activeLanguageLabel.textContent =
          dataset.label;


          workerText.textContent =
          dataset.worker;


          compliantText.textContent =
          dataset.compliant;



          workerText.style.opacity = 1;
          compliantText.style.opacity = 1;


        },200);


      }


    });


  });


}

document.addEventListener("DOMContentLoaded", () => {
  const menuTrigger = document.getElementById("menuTrigger");
  const headerNav = document.getElementById("headerNav");

  if (menuTrigger && headerNav) {
    menuTrigger.addEventListener("click", () => {
      // Toggle interaction classes simultaneously
      const isOpen = headerNav.classList.toggle("drawer-open");
      menuTrigger.classList.toggle("active-state");
      menuTrigger.setAttribute("aria-expanded", isOpen);
    });

    // Automatically close the drawer window if a navigation link is clicked
    headerNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        headerNav.classList.remove("drawer-open");
        menuTrigger.classList.remove("active-state");
        menuTrigger.setAttribute("aria-expanded", "false");
      });
    });
  }
});

// ===============================
// CARECLIQ CMS CONTENT LOADER
// ===============================


async function loadCMSContent(){

    try{


        const response = await fetch(CMS_API);

        const content = await response.json();
      
        const translation = content.homepage.translation;


translation.languages.forEach(language => {

    translationDatabase[language.code] = {

        label: language.label,

        worker: language.worker,

        compliant: language.compliant

    };

});

        // HERO

const hero = content.homepage.hero;


// HERO TITLE

const heroTitle = document.querySelector(".hero-title");

if(heroTitle){
    heroTitle.textContent = hero.title || "";
}


// HERO SUBTITLE

const heroSubtitle = document.querySelector(".hero-subtitle");

if(heroSubtitle){
    heroSubtitle.textContent = hero.subtitle || "";
}


// BUTTONS

const buttons = document.querySelectorAll(".hero-btn");

if(buttons.length >= 2){

    buttons[0].textContent =
    hero.primaryButton || "";


    buttons[1].textContent =
    hero.secondaryButton || "";

}


// VIDEO

const heroVideo =
document.querySelector("#hero-video");


if (
  heroVideo &&
  hero.video
) {

  const videoUrl =
    resolveMediaUrl(
      hero.video
    );

  heroVideo.src =
    videoUrl;

  heroVideo.load();

}

const heroMediaButtons =
  document.querySelectorAll(
    "#hero-secondary-btn, [data-hero-media]"
  );


heroMediaButtons.forEach(button => {

  if (!hero.video) {
    return;
  }


  button.dataset.mediaType =
    getMediaType(
      hero.video,
      "video"
    );

  button.dataset.mediaSrc =
    resolveMediaUrl(
      hero.video
    );

  button.dataset.mediaTitle =
    hero.title ||
    "CareCliQ Demo";

});

// ===============================
// STORY SECTION
// ===============================

const story = content.homepage.story;


// Badge

const storyBadge = document.querySelector(".story-tag");

if(storyBadge){

    storyBadge.textContent = story.badge || "";

}


// Title

const storyTitle = document.querySelector(".story-heading");

if(storyTitle){

    storyTitle.textContent = story.title || "";

}


// Description

const storyDescription = document.querySelector(".story-paragraphs p");

if(storyDescription){

    storyDescription.textContent = story.description || "";

}


// Video

const storyVideo = document.querySelector(".story-bg-video");

if (
  storyVideo &&
  story.video
) {

  storyVideo.src =
    resolveMediaUrl(
      story.video
    );

  storyVideo.load();

}

// ===============================
// FEATURES SECTION
// ===============================

const features =
  content.homepage.features || [];

const featureCards =
  document.querySelectorAll(
    ".feature-card"
  );


featureCards.forEach(
  (card, index) => {

    const feature =
      features[index];

    if (!feature) {
      return;
    }


    const title =
      card.querySelector(
        ".feature-title"
      );

    const description =
      card.querySelector(
        ".feature-description"
      );

    const badge =
      card.querySelector(
        ".feature-badge"
      );

    const video =
      card.querySelector("video");


    if (title) {

      title.textContent =
        feature.title || "";

    }


    if (description) {

      description.textContent =
        feature.description || "";

    }


    if (badge) {

      badge.textContent =
        feature.badge || "";

    }


    if (
      video &&
      feature.video
    ) {

      video.src =
        resolveMediaUrl(
          feature.video
        );

      video.load();

    }


    let mediaButton =
      card.querySelector(
        ".feature-media-button"
      );


    if (
      feature.video &&
      !mediaButton
    ) {

      mediaButton =
        document.createElement(
          "button"
        );

      mediaButton.type =
        "button";

      mediaButton.className =
        "feature-media-button cms-media-trigger";

      card.appendChild(
        mediaButton
      );

    }


    if (mediaButton) {

      if (feature.video) {

        mediaButton.hidden =
          false;

        mediaButton.textContent =
          "▶ Watch Feature";

        mediaButton.dataset.mediaType =
          getMediaType(
            feature.video,
            "video"
          );

        mediaButton.dataset.mediaSrc =
          resolveMediaUrl(
            feature.video
          );

        mediaButton.dataset.mediaTitle =
          feature.title ||
          "CareCliQ Feature";

      }
      else {

        mediaButton.hidden =
          true;

      }

    }

  }
);
// ===============================
// PROCESS SECTION
// ===============================

const process = content.homepage.process;


const processCards = document.querySelectorAll(".step-card-wrapper");


processCards.forEach((card,index)=>{


    const step = process[index];


    if(!step) return;



    const number = card.querySelector(".step-number");

    if(number){

        number.textContent = step.number || "";

    }



    const title = card.querySelector(".step-heading");

    if(title){

        title.textContent = step.title || "";

    }



    const description = card.querySelector(".step-description");

    if(description){

        description.textContent = step.description || "";

    }



    const video = card.querySelector("video");

if (
  video &&
  step.video
) {

  video.src =
    resolveMediaUrl(
      step.video
    );

  video.load();

}
let mediaButton =
  card.querySelector(
    ".process-media-button"
  );


if (
  step.video &&
  !mediaButton
) {

  mediaButton =
    document.createElement(
      "button"
    );

  mediaButton.type =
    "button";

  mediaButton.className =
    "process-media-button cms-media-trigger";

  card.appendChild(
    mediaButton
  );

}


if (mediaButton) {

  if (step.video) {

    mediaButton.hidden =
      false;

    mediaButton.textContent =
      "▶ Watch Step";

    mediaButton.dataset.mediaType =
      getMediaType(
        step.video,
        "video"
      );

    mediaButton.dataset.mediaSrc =
      resolveMediaUrl(
        step.video
      );

    mediaButton.dataset.mediaTitle =
      step.title ||
      "How CareCliQ Works";

  }
  else {

    mediaButton.hidden =
      true;

  }

}

});

// ===============================
// ROLES SECTION
// ===============================

const roles = content.homepage.roles;


// TITLE

const rolesTitle =
document.querySelector(".roles-title");


if(rolesTitle){

    rolesTitle.textContent =
    roles.title || "";

}


// CARDS

const roleCards =
document.querySelectorAll(".role-card");


roleCards.forEach((card,index)=>{


    const role =
    roles.cards[index];


    if(!role) return;



    const heading =
    card.querySelector(".role-heading");


    if(heading){

        heading.textContent =
        role.title || "";

    }



    const subtitle =
    card.querySelector(".role-subheading");


    if(subtitle){

        subtitle.textContent =
        role.subtitle || "";

    }



    const image =
    card.querySelector(".card-img");


    if(image && role.image){

        image.src =
        role.image;

    }



   const list =
card.querySelector(".features-list");


if(list && role.features){


    list.innerHTML = "";


    role.features.forEach(feature=>{


        list.innerHTML += `

        <li class="list-item">

            <div class="icon-boundary ${index === 0 ? "boundary-blue" : "boundary-pink"}">

                <svg viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="check-icon">

                <polyline points="20 6 9 17 4 12"></polyline>

                </svg>

            </div>

            <span>${feature}</span>

        </li>

        `;


    });


}

// ===============================
// TESTIMONIALS SECTION
// ===============================

const testimonials =
content.homepage.testimonials;


const testimonialContainer =
document.querySelector(".scatter-runway");


if(testimonialContainer && testimonials){


    testimonialContainer.innerHTML = "";


    testimonials.forEach((item,index)=>{


        testimonialContainer.innerHTML += `

        <div class="scatter-card card-pos-${index + 1}" tabindex="0">


            <div class="card-visual-wrapper">


                <div class="avatar-frame">

                    <img 
                    src="${item.image || ''}" 
                    alt="${item.name || ''}" 
                    class="story-avatar">

                </div>


                <button class="play-audio-btn">

                    <span>
                    Hear from ${item.name || ""}
                    </span>

                    <span class="play-icon-dot">
                    ▶
                    </span>

                </button>


            </div>



            <div class="card-content-block">


                <span class="quote-mark">
                “
                </span>


                <p class="story-main-quote">
                ${item.quote || ""}
                </p>



                <div class="profile-attribution">

                    <h3>
                    ${item.name || ""}
                    </h3>


                    <p>
                    ${item.role || ""}
                    </p>

                </div>


            </div>


        </div>

        `;


    });


}

// ===============================
// TRANSLATION SECTION
// ===============================


const translation =
content.homepage.translation;



if(translation){


    // BADGE

    const badge =
    document.querySelector(".badge-accent");


    if(badge){

        badge.textContent =
        translation.badge || "";

    }



    // TITLE

    const title =
    document.querySelector(".translation-header h2");


    if(title){

        title.innerHTML =
        translation.title || "";

    }



    // DESCRIPTION

    const description =
    document.querySelector(".translation-lead-text");


    if(description){

        description.textContent =
        translation.description || "";

    }



    // LANGUAGE DATABASE

    if(translation.languages){


        translationDatabase = {};


        translation.languages.forEach(language=>{


            translationDatabase[language.code] = {


                label:
                language.label,


                worker:
                language.worker,


                compliant:
                language.compliant


            };


        });


    }


}

const pillContainer =
document.getElementById("languagePills");


if(pillContainer){


    pillContainer.innerHTML="";


    translation.languages.forEach((language,index)=>{


        pillContainer.innerHTML += `

        <button 
        class="lang-pill ${index === 0 ? "active":""}"
        data-lang="${language.code}">

        ${language.label}

        </button>

        `;

setupLanguageButtons();


    });
}

// ===============================
// CTA SECTION
// ===============================


const cta = content.homepage.cta;


if(cta){


const title =
document.querySelector(".cta-content-wrapper h2");


if(title){

title.innerHTML =
cta.title || "";

}



const description =
document.querySelector(".cta-subtext");


if(description){

description.textContent =
cta.description || "";

}



const buttons =
document.querySelectorAll(".human-submit-btn");


if(buttons.length){

buttons[0].querySelector(".btn-text").textContent =
cta.primaryButton || "";

}


}

const footer = content.homepage.footer;


if(footer){


const description =
document.querySelector(".footer-compliance-text");


if(description){

description.textContent =
footer.description || "";

}



const email =
document.getElementById("footerEmail");


if(email){

email.textContent =
footer.contact.email || "";

}



const phone =
document.getElementById("footerPhone");


if(phone){

phone.textContent =
footer.contact.phone || "";

}



const address =
document.getElementById("footerAddress");


if(address){

address.textContent =
footer.contact.address || "";

}



const copyright =
document.querySelector(".footer-copyright");


if(copyright){

copyright.textContent =
footer.copyright || "";

}


}

// ===============================
// SETTINGS
// ===============================


const settings = content.settings;


if(settings){


const title =
document.querySelector("title");


if(title && settings.siteName){

title.textContent =
settings.siteName;

}



const logo = document.querySelector(".header-logo");

if (logo && settings.logo) {
    logo.innerHTML = `
        <img src="${settings.logo}"
             alt="${settings.siteName || 'CareCliQ'}"
             class="header-logo-img">
    `;
}



if(settings.favicon){


let favicon =
document.querySelector("link[rel='icon']");


if(!favicon){

favicon =
document.createElement("link");

favicon.rel="icon";

document.head.appendChild(favicon);

}


favicon.href =
settings.favicon;


}


}
});

        console.log(
            "CareCliQ CMS Loaded",
            content
        );


    }

    catch(error){

        console.error(
            "CMS loading failed:",
            error
        );

    }


}

loadCMSContent();

// =====================================
// SECRET CMS ACCESS - LOGO
// =====================================

let adminClicks = 0;

const headerLogo =
document.getElementById("headerLogo");

if (headerLogo) {

    headerLogo.addEventListener(
        "click",
        event => {

            event.preventDefault();

            adminClicks++;

            if (adminClicks >= 7) {

                adminClicks = 0;

                window.location.href =
                "./admin/login.html";

            }

            clearTimeout(window.adminClickTimer);

            window.adminClickTimer =
            setTimeout(() => {

                adminClicks = 0;

            }, 2500);

        }
    );

}

// =====================================
// LOGGED-IN USER HEADER STATE
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const loginButton =
        document.getElementById("openLoginModal");

    const loggedMenu =
        document.getElementById("loggedInMenu");

    const userName =
        document.getElementById("userDisplayName");

    const menuButton =
        document.getElementById("userMenuButton");

    const dropdown =
        document.getElementById("userDropdown");

    const logoutButton =
        document.getElementById("logoutBtn");

    const storedUser =
        localStorage.getItem("user");

    const token =
        localStorage.getItem("token");


    if (
        storedUser &&
        token
    ) {

        const user =
            JSON.parse(storedUser);

        loginButton.hidden = true;

        loggedMenu.hidden = false;

        userName.textContent =
            user.fullName;

    }


    menuButton?.addEventListener(
        "click",
        () => {

            dropdown.classList.toggle(
                "show"
            );

        }
    );


    logoutButton?.addEventListener(
        "click",
        () => {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.reload();

        }
    );

});

// =====================================
// SECRET CMS ACCESS - KEYBOARD
// =====================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            window.location.href =
            "./admin/login.html";

        }

    }
);

// =====================================
// UNIVERSAL VIDEO / AUDIO MODAL
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  const mediaModal =
    document.getElementById("mediaModal");

  const closeButton =
    document.getElementById("closeMediaModal");

  const backdrop =
    mediaModal?.querySelector(
      ".carecliq-media-backdrop"
    );

  const modalTitle =
    document.getElementById("mediaModalTitle");

  const videoPlayer =
    document.getElementById("modalVideoPlayer");

  const audioPlayer =
    document.getElementById("modalAudioPlayer");


  if (
    !mediaModal ||
    !videoPlayer ||
    !audioPlayer
  ) {
    return;
  }


  function stopAllMedia() {

    videoPlayer.pause();
    audioPlayer.pause();

    videoPlayer.removeAttribute("src");
    audioPlayer.removeAttribute("src");

    videoPlayer.load();
    audioPlayer.load();

  }


  function openMediaModal(
    source,
    type,
    title
  ) {

    if (!source) {
      console.error(
        "No media source was provided."
      );
      return;
    }


    stopAllMedia();


    modalTitle.textContent =
      title || "CareCliQ Media";


    if (type === "audio") {

      videoPlayer.hidden = true;
      audioPlayer.hidden = false;

      audioPlayer.src = source;
      audioPlayer.load();

      audioPlayer.play().catch(() => {});

    }
    else {

      audioPlayer.hidden = true;
      videoPlayer.hidden = false;

      videoPlayer.src = source;
      videoPlayer.load();

      videoPlayer.play().catch(() => {});

    }


    mediaModal.classList.add("open");

    mediaModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "media-modal-open"
    );

  }


  function closeMediaModal() {

    stopAllMedia();

    mediaModal.classList.remove("open");

    mediaModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "media-modal-open"
    );

  }


  // Event delegation supports current and CMS-generated buttons

  document.addEventListener(
    "click",
    event => {

      const trigger =
        event.target.closest(
          "[data-media-src]"
        );

      if (!trigger) return;

      event.preventDefault();

      openMediaModal(

        trigger.dataset.mediaSrc,

        trigger.dataset.mediaType ||
          "video",

        trigger.dataset.mediaTitle ||
          "CareCliQ Media"

      );

    }
  );


  closeButton?.addEventListener(
    "click",
    closeMediaModal
  );


  backdrop?.addEventListener(
    "click",
    closeMediaModal
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        mediaModal.classList.contains("open")
      ) {
        closeMediaModal();
      }

    }
  );

});