function loadBookDemo(data) {
  const bookDemo = data.bookDemo || {};

  document.getElementById("bookDemoTitle").value = bookDemo.title || "";
  document.getElementById("bookDemoSubtitle").value = bookDemo.subtitle || "";
  document.getElementById("bookDemoBenefitsTitle").value = bookDemo.benefitsTitle || "";
  document.getElementById("bookDemoBenefits").value = (bookDemo.benefits || []).join("\n");
  document.getElementById("bookDemoFormTitle").value = bookDemo.formTitle || "";
  document.getElementById("bookDemoButtonText").value = bookDemo.buttonText || "";

  document.getElementById("bookDemoProviderMessage").value = bookDemo.providerMessage || "";
  document.getElementById("bookDemoProviderLabel").value = bookDemo.providerLabel || "";

  document.getElementById("bookDemoOrganisationMessage").value = bookDemo.organisationMessage || "";
  document.getElementById("bookDemoOrganisationLabel").value = bookDemo.organisationLabel || "";

  document.getElementById("bookDemoPartnerMessage").value = bookDemo.partnerMessage || "";
  document.getElementById("bookDemoPartnerLabel").value = bookDemo.partnerLabel || "";
}

function saveBookDemo() {
  cmsData.bookDemo = {
    title: document.getElementById("bookDemoTitle").value,
    subtitle: document.getElementById("bookDemoSubtitle").value,
    benefitsTitle: document.getElementById("bookDemoBenefitsTitle").value,
    benefits: document
      .getElementById("bookDemoBenefits")
      .value
      .split("\n")
      .filter(item => item.trim() !== ""),
    formTitle: document.getElementById("bookDemoFormTitle").value,
    buttonText: document.getElementById("bookDemoButtonText").value,

    providerMessage: document.getElementById("bookDemoProviderMessage").value,
    providerLabel: document.getElementById("bookDemoProviderLabel").value,

    organisationMessage: document.getElementById("bookDemoOrganisationMessage").value,
    organisationLabel: document.getElementById("bookDemoOrganisationLabel").value,

    partnerMessage: document.getElementById("bookDemoPartnerMessage").value,
    partnerLabel: document.getElementById("bookDemoPartnerLabel").value
  };

  saveCMS();
}