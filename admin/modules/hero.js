// =====================================
// HERO MODULE
// =====================================

function populateHero() {

  if (!websiteData.homepage) {
    websiteData.homepage = {};
  }

  if (!websiteData.homepage.hero) {
    websiteData.homepage.hero = {};
  }


  const hero =
    websiteData.homepage.hero;


  const heroTitle =
    document.getElementById("heroTitle");

  const heroSubtitle =
    document.getElementById("heroSubtitle");

  const primaryButton =
    document.getElementById("primaryButton");

  const secondaryButton =
    document.getElementById("secondaryButton");

  const heroVideo =
    document.getElementById("heroVideo");


  if (heroTitle) {
    heroTitle.value =
      hero.title || "";
  }

  if (heroSubtitle) {
    heroSubtitle.value =
      hero.subtitle || "";
  }

  if (primaryButton) {
    primaryButton.value =
      hero.primaryButton || "";
  }

  if (secondaryButton) {
    secondaryButton.value =
      hero.secondaryButton || "";
  }

  if (heroVideo) {
    heroVideo.value =
      hero.video || "";
  }

}


function collectHero() {

  if (!websiteData.homepage) {
    websiteData.homepage = {};
  }

  if (!websiteData.homepage.hero) {
    websiteData.homepage.hero = {};
  }


  const heroTitle =
    document.getElementById("heroTitle");

  const heroSubtitle =
    document.getElementById("heroSubtitle");

  const primaryButton =
    document.getElementById("primaryButton");

  const secondaryButton =
    document.getElementById("secondaryButton");

  const heroVideo =
    document.getElementById("heroVideo");


  if (heroTitle) {
    websiteData.homepage.hero.title =
      heroTitle.value;
  }

  if (heroSubtitle) {
    websiteData.homepage.hero.subtitle =
      heroSubtitle.value;
  }

  if (primaryButton) {
    websiteData.homepage.hero.primaryButton =
      primaryButton.value;
  }

  if (secondaryButton) {
    websiteData.homepage.hero.secondaryButton =
      secondaryButton.value;
  }

  if (heroVideo) {
    websiteData.homepage.hero.video =
      heroVideo.value.trim();
  }

}


window.populateHero =
  populateHero;

window.collectHero =
  collectHero;