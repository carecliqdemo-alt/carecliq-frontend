let activeInformationPage = "privacy";


function loadInformationPages() {

    const editor =
        document.getElementById(
            "informationPagesEditor"
        );

    const selector =
        document.getElementById(
            "infoPageSelector"
        );

    if (!editor || !selector) {
        return;
    }


    websiteData.informationPages =
        websiteData.informationPages || {};

    activeInformationPage =
        selector.value || "privacy";


    if (
        activeInformationPage === "contact"
    ) {

        renderContactPageEditor(editor);
        return;

    }


    renderStandardInfoPageEditor(editor);

}


function renderStandardInfoPageEditor(editor) {

    const page =
        websiteData.informationPages[
            activeInformationPage
        ] || {

            heroTitle: "",
            heroHighlight: "",
            heroDescription: "",
            sections: []

        };


    websiteData.informationPages[
        activeInformationPage
    ] = page;


    page.sections =
        Array.isArray(page.sections)
            ? page.sections
            : [];


    editor.innerHTML = `

        <div class="editor-field">
            <label>Hero Title</label>
            <input
                type="text"
                id="infoHeroTitle"
                value="${escapeInfoValue(
                    page.heroTitle
                )}"
            >
        </div>

        <div class="editor-field">
            <label>Hero Highlight</label>
            <input
                type="text"
                id="infoHeroHighlight"
                value="${escapeInfoValue(
                    page.heroHighlight
                )}"
            >
        </div>

        <div class="editor-field">
            <label>Hero Description</label>
            <textarea
                id="infoHeroDescription"
                rows="4"
            >${escapeInfoValue(
                page.heroDescription
            )}</textarea>
        </div>

        <div class="editor-subheading">
            <h3>Content Sections</h3>

            <button
                type="button"
                class="secondary-button"
                onclick="addInformationSection()"
            >
                Add Section
            </button>
        </div>

        <div id="informationSectionsList">

            ${page.sections
                .map(
                    (section, index) => `

                    <div
                        class="editor-list-item"
                        data-info-index="${index}"
                    >

                        <div class="editor-field">
                            <label>Section Title</label>
                            <input
                                type="text"
                                class="info-section-title"
                                value="${escapeInfoValue(
                                    section.title
                                )}"
                            >
                        </div>

                        <div class="editor-field">
                            <label>Section Content</label>
                            <textarea
                                class="info-section-content"
                                rows="5"
                            >${escapeInfoValue(
                                section.content
                            )}</textarea>
                        </div>

                        <button
                            type="button"
                            class="danger-button"
                            onclick="removeInformationSection(
                                ${index}
                            )"
                        >
                            Remove Section
                        </button>

                    </div>

                `
                )
                .join("")}

        </div>

    `;

}


function renderContactPageEditor(editor) {

    const page =
        websiteData.informationPages.contact || {

            heroTitle: "",
            heroHighlight: "",
            heroDescription: "",
            sectionTitle: "",
            sectionDescription: "",
            email: "",
            location: ""

        };


    websiteData.informationPages.contact =
        page;


    editor.innerHTML = `

        <div class="editor-field">
            <label>Hero Title</label>
            <input
                type="text"
                id="infoHeroTitle"
                value="${escapeInfoValue(
                    page.heroTitle
                )}"
            >
        </div>

        <div class="editor-field">
            <label>Hero Highlight</label>
            <input
                type="text"
                id="infoHeroHighlight"
                value="${escapeInfoValue(
                    page.heroHighlight
                )}"
            >
        </div>

        <div class="editor-field">
            <label>Hero Description</label>
            <textarea
                id="infoHeroDescription"
                rows="4"
            >${escapeInfoValue(
                page.heroDescription
            )}</textarea>
        </div>

        <div class="editor-field">
            <label>Section Title</label>
            <input
                type="text"
                id="contactSectionTitle"
                value="${escapeInfoValue(
                    page.sectionTitle
                )}"
            >
        </div>

        <div class="editor-field">
            <label>Section Description</label>
            <textarea
                id="contactSectionDescription"
                rows="4"
            >${escapeInfoValue(
                page.sectionDescription
            )}</textarea>
        </div>

        <div class="editor-field">
            <label>Email Address</label>
            <input
                type="email"
                id="contactEmail"
                value="${escapeInfoValue(
                    page.email
                )}"
            >
        </div>

        <div class="editor-field">
            <label>Location</label>
            <input
                type="text"
                id="contactLocation"
                value="${escapeInfoValue(
                    page.location
                )}"
            >
        </div>

    `;

}


function collectInformationPages() {

    const selector =
        document.getElementById(
            "infoPageSelector"
        );

    if (!selector) {
        return;
    }


    const pageKey =
        selector.value;


    websiteData.informationPages =
        websiteData.informationPages || {};


    if (pageKey === "contact") {

        websiteData.informationPages.contact = {

            heroTitle:
                document.getElementById(
                    "infoHeroTitle"
                )?.value.trim() || "",

            heroHighlight:
                document.getElementById(
                    "infoHeroHighlight"
                )?.value.trim() || "",

            heroDescription:
                document.getElementById(
                    "infoHeroDescription"
                )?.value.trim() || "",

            sectionTitle:
                document.getElementById(
                    "contactSectionTitle"
                )?.value.trim() || "",

            sectionDescription:
                document.getElementById(
                    "contactSectionDescription"
                )?.value.trim() || "",

            email:
                document.getElementById(
                    "contactEmail"
                )?.value.trim() || "",

            location:
                document.getElementById(
                    "contactLocation"
                )?.value.trim() || ""

        };

        return;

    }


    const sections = [];


    document
        .querySelectorAll(
            "#informationSectionsList .editor-list-item"
        )
        .forEach(item => {

            const title =
                item.querySelector(
                    ".info-section-title"
                )?.value.trim() || "";

            const content =
                item.querySelector(
                    ".info-section-content"
                )?.value.trim() || "";


            sections.push({
                title,
                content
            });

        });


    websiteData.informationPages[pageKey] = {

        heroTitle:
            document.getElementById(
                "infoHeroTitle"
            )?.value.trim() || "",

        heroHighlight:
            document.getElementById(
                "infoHeroHighlight"
            )?.value.trim() || "",

        heroDescription:
            document.getElementById(
                "infoHeroDescription"
            )?.value.trim() || "",

        sections

    };

}


function addInformationSection() {

    collectInformationPages();


    const page =
        websiteData.informationPages[
            activeInformationPage
        ];


    page.sections =
        page.sections || [];


    page.sections.push({

        title: "New Section",
        content: ""

    });


    loadInformationPages();

}


function removeInformationSection(index) {

    collectInformationPages();


    const page =
        websiteData.informationPages[
            activeInformationPage
        ];


    if (!page?.sections) {
        return;
    }


    page.sections.splice(index, 1);

    loadInformationPages();

}


function escapeInfoValue(value) {

    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const selector =
            document.getElementById(
                "infoPageSelector"
            );


        if (selector) {

            selector.addEventListener(
                "change",
                () => {

                    collectInformationPages();

                    activeInformationPage =
                        selector.value;

                    loadInformationPages();

                }
            );

        }

    }
);


window.loadInformationPages =
    loadInformationPages;

window.collectInformationPages =
    collectInformationPages;

window.addInformationSection =
    addInformationSection;

window.removeInformationSection =
    removeInformationSection;