const INFORMATION_API =
    `${window.CARECLIQ_CONFIG.API_BASE}/api/content`;


document.addEventListener(
    "DOMContentLoaded",
    loadInformationPage
);


async function loadInformationPage() {

    const pageKey =
        document.body.dataset.infoPage;

    if (!pageKey) {
        return;
    }


    try {

        const response =
            await fetch(INFORMATION_API);


        if (!response.ok) {

            throw new Error(
                "Could not load page content"
            );

        }


        const data =
            await response.json();


        const page =
            data.informationPages?.[pageKey];


        if (!page) {
            return;
        }


        renderInformationPage(
            pageKey,
            page
        );

    }
    catch (error) {

        console.error(
            "Information page loading failed:",
            error
        );

    }

}


function renderInformationPage(
    pageKey,
    page
) {

    const title =
        document.getElementById(
            "infoPageTitle"
        );

    const highlight =
        document.getElementById(
            "infoPageHighlight"
        );

    const description =
        document.getElementById(
            "infoPageDescription"
        );

    const content =
        document.getElementById(
            "infoPageContent"
        );


    if (title) {
        title.textContent =
            page.heroTitle || "";
    }

    if (highlight) {
        highlight.textContent =
            page.heroHighlight || "";
    }

    if (description) {
        description.textContent =
            page.heroDescription || "";
    }


    if (!content) {
        return;
    }


    if (pageKey === "contact") {

        content.innerHTML = `

            <h2>
                ${escapePageHtml(
                    page.sectionTitle
                )}
            </h2>

            <p>
                ${escapePageHtml(
                    page.sectionDescription
                )}
            </p>

            <div class="contact-card">

                <p>
                    Email:
                    <a href="mailto:${escapePageHtml(
                        page.email
                    )}">
                        ${escapePageHtml(
                            page.email
                        )}
                    </a>
                </p>

                <p>
                    ${escapePageHtml(
                        page.location
                    )}
                </p>

            </div>

        `;

        return;

    }


    const sections =
        Array.isArray(page.sections)
            ? page.sections
            : [];


    content.innerHTML =
        sections
            .map(
                section => `

                    <article class="info-section">

                        <h2>
                            ${escapePageHtml(
                                section.title
                            )}
                        </h2>

                        <p>
                            ${escapePageHtml(
                                section.content
                            )}
                        </p>

                    </article>

                `
            )
            .join("");

}


function escapePageHtml(value) {

    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");

}