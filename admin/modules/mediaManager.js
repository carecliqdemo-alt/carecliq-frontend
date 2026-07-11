// =====================================
// CARECLIQ REUSABLE MEDIA MANAGER
// =====================================

const MEDIA_UPLOAD_API =
`${window.CARECLIQ_CONFIG.API_BASE}/api/upload`;


async function uploadCMSMedia(file) {

    if (!file) {

        throw new Error(
            "No media file selected"
        );

    }


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
            "Media upload failed"
        );

    }


    return result.url;

}


// =====================================
// CREATE REUSABLE MEDIA FIELD
// =====================================

function createMediaUploader({

    container,

    label,
    value = "",
    accept = "video/*,audio/*,image/*",
    onChange

}) {

    if (!container) {
        return;
    }


    const wrapper =
    document.createElement(
        "div"
    );

    wrapper.className =
    "cms-media-uploader";


    wrapper.innerHTML = `

        <label class="cms-media-label">
            ${label}
        </label>

        <div class="cms-media-controls">

            <input
                type="text"
                class="cms-media-url"
                value="${value || ""}"
                placeholder="Media URL"
            >

<button
    type="button"
    class="cms-upload-button"
>
    Choose File
</button>

<input
    type="file"
    class="cms-media-file"
    accept="${accept}"
    hidden
>
        </div>

        <div class="cms-media-preview"></div>

        <p class="cms-media-status"></p>

    `;


    const urlInput =
    wrapper.querySelector(
        ".cms-media-url"
    );

    const fileInput =
    wrapper.querySelector(
        ".cms-media-file"
    );

    const uploadButton =
wrapper.querySelector(
    ".cms-upload-button"
);

    const preview =
    wrapper.querySelector(
        ".cms-media-preview"
    );

    const status =
    wrapper.querySelector(
        ".cms-media-status"
    );


    function getMediaType(url) {

        const cleanUrl =
        String(url || "")
        .toLowerCase()
        .split("?")[0];


        if (
            cleanUrl.endsWith(".mp3") ||
            cleanUrl.endsWith(".wav") ||
            cleanUrl.endsWith(".ogg") ||
            cleanUrl.endsWith(".m4a")
        ) {

            return "audio";

        }


        if (
            cleanUrl.endsWith(".mp4") ||
            cleanUrl.endsWith(".webm") ||
            cleanUrl.endsWith(".mov") ||
            cleanUrl.endsWith(".m4v")
        ) {

            return "video";

        }


        return "image";

    }


    function resolvePreviewUrl(url) {

        if (!url) {
            return "";
        }


        if (
            url.startsWith("http://") ||
            url.startsWith("https://")
        ) {

            return url;

        }


        if (
            url.startsWith("/uploads/")
        ) {

            return `https://carecliq-redesign.onrender.com${url}`;

        }


        return url;

    }


    function renderPreview(url) {

        preview.innerHTML = "";


        if (!url) {
            return;
        }


        const mediaType =
        getMediaType(url);

        const previewUrl =
        resolvePreviewUrl(url);


        if (mediaType === "video") {

            preview.innerHTML = `

                <video
                    src="${previewUrl}"
                    controls
                    muted
                    playsinline
                ></video>

            `;

        }


        if (mediaType === "audio") {

            preview.innerHTML = `

                <audio
                    src="${previewUrl}"
                    controls
                ></audio>

            `;

        }


        if (mediaType === "image") {

            preview.innerHTML = `

                <img
                    src="${previewUrl}"
                    alt="Media preview"
                >

            `;

        }

    }


    urlInput.addEventListener(
        "input",
        () => {

            renderPreview(
                urlInput.value.trim()
            );


            if (onChange) {

                onChange(
                    urlInput.value.trim()
                );

            }

        }
    );


   fileInput.addEventListener(
    "change",
    async event => {

        event.preventDefault();
        event.stopPropagation();


        const file =
            fileInput.files &&
            fileInput.files[0];


        if (!file) {

            status.textContent =
                "";

            return;

        }


        status.textContent =
            `Uploading ${file.name}...`;

        uploadButton.disabled =
            true;

        uploadButton.textContent =
            "Uploading...";


        try {

            const uploadedUrl =
                await uploadCMSMedia(
                    file
                );


            urlInput.value =
                uploadedUrl;


            renderPreview(
                uploadedUrl
            );


            status.textContent =
                "Upload complete";


            if (typeof onChange === "function") {

                onChange(
                    uploadedUrl
                );

            }

        }
        catch (error) {

            console.error(
                "Media upload failed:",
                error
            );


            status.textContent =
                error.message ||
                "Upload failed";

        }
        finally {

            uploadButton.disabled =
                false;

            uploadButton.textContent =
                "Choose File";

            fileInput.value =
                "";

        }

    }
);

    uploadButton.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();

        fileInput.click();

    }
);

    container.appendChild(
        wrapper
    );


    renderPreview(value);


    return wrapper;

}


window.uploadCMSMedia =
uploadCMSMedia;

window.createMediaUploader =
createMediaUploader;