const MEDIA_UPLOAD_API =
`${window.CARECLIQ_CONFIG.API_BASE}/api/upload`;


function loadMedia() {

  const mediaGrid =
    document.getElementById("mediaGrid");

  if (!mediaGrid) return;


  const media =
    Array.isArray(websiteData.media)
      ? websiteData.media
      : [];


  mediaGrid.innerHTML =
    media.map((item, index) => {

      const previewUrl =
        item.url.startsWith("/uploads/")
          ? `https://carecliq.onrender.com${item.url}`
          : item.url;


      let preview = "";


      if (item.type === "video") {

        preview = `
          <video
            src="${previewUrl}"
            controls
            muted
            playsinline
          ></video>
        `;

      }
      else if (item.type === "audio") {

        preview = `
          <audio
            src="${previewUrl}"
            controls
          ></audio>
        `;

      }
      else {

        preview = `
          <img
            src="${previewUrl}"
            alt="${item.name || "Media"}"
          >
        `;

      }


      return `

        <article class="media-library-card">

          <div class="media-library-preview">
            ${preview}
          </div>

          <div class="media-library-details">

            <strong>
              ${item.name || "Media file"}
            </strong>

            <span>
              ${item.type || "file"}
            </span>

            <input
              type="text"
              value="${item.url}"
              readonly
            >

            <div class="media-library-actions">

              <button
                type="button"
                class="copy-media-url"
                data-url="${item.url}"
              >
                Copy URL
              </button>

              <button
                type="button"
                class="delete-media-item"
                data-index="${index}"
              >
                Delete
              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");


  mediaGrid
    .querySelectorAll(".copy-media-url")
    .forEach(button => {

      button.addEventListener("click", async () => {

        try {

          await navigator.clipboard.writeText(
            button.dataset.url
          );

          button.textContent =
            "Copied";

          setTimeout(() => {

            button.textContent =
              "Copy URL";

          }, 1500);

        }
        catch (error) {

          console.error(
            "Could not copy media URL:",
            error
          );

        }

      });

    });


  mediaGrid
    .querySelectorAll(".delete-media-item")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.index);

websiteData.media.splice(
  index,
  1
);

loadMedia();

saveMediaLibrary()
  .catch(error => {

    console.error(
      "Could not save media deletion:",
      error
    );

  });

      });

    });

}


function detectMediaType(file) {

  if (file.type.startsWith("video/")) {
    return "video";
  }

  if (file.type.startsWith("audio/")) {
    return "audio";
  }

  if (file.type.startsWith("image/")) {
    return "image";
  }

  return "file";

}

async function saveMediaLibrary() {

  const response =
    await fetch(
      "https://carecliq.onrender.com/api/content",
      {
        method: "POST",

        headers: {
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


  if (!response.ok) {

    throw new Error(
      result.message ||
      "Could not save media library"
    );

  }


  return result;

}

document.addEventListener("DOMContentLoaded", () => {

  const fileInput =
    document.getElementById(
      "mediaUploadInput"
    );

  const uploadButton =
    document.getElementById(
      "uploadMediaBtn"
    );

  const status =
    document.getElementById(
      "mediaUploadStatus"
    );


  if (
    !fileInput ||
    !uploadButton
  ) {
    return;
  }


  uploadButton.addEventListener(
    "click",
    async event => {

      event.preventDefault();


      const files =
        Array.from(
          fileInput.files || []
        );


      if (!files.length) {

        status.textContent =
          "Choose at least one file.";

        return;

      }


      uploadButton.disabled =
        true;

      status.textContent =
        "Uploading media...";


      try {

        if (!Array.isArray(websiteData.media)) {

          websiteData.media = [];

        }


        for (const file of files) {

          const formData =
            new FormData();

          formData.append(
            "file",
            file
          );


          const response =
            await fetch(
              MEDIA_UPLOAD_API,
              {
                method:
                  "POST",

                body:
                  formData
              }
            );


          const result =
            await response.json();


          if (!response.ok) {

            throw new Error(
              result.message ||
              `Could not upload ${file.name}`
            );

          }


          websiteData.media.push({

            name:
              file.name,

            url:
              result.url,

            type:
              detectMediaType(file)

          });

        }


await saveMediaLibrary();

status.textContent =
  "Upload complete and saved.";

fileInput.value =
  "";

loadMedia();

      }
      catch (error) {

        console.error(
          "Media upload failed:",
          error
        );

        status.textContent =
          error.message ||
          "Upload failed.";

      }
      finally {

        uploadButton.disabled =
          false;

      }

    }
  );

});

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const activeSection =
      localStorage.getItem(
        "activeCMSSection"
      );

    if (!activeSection) {
      return;
    }


    const button =
      document.querySelector(
        `.sidebar button[data-section="${activeSection}"]`
      );

localStorage.setItem(
  "activeCMSSection",
  button.dataset.section
);

    if (button) {

      setTimeout(() => {
        button.click();
      }, 100);

    }

  }
);

window.loadMedia =
loadMedia;