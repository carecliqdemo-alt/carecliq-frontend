function loadFeatures(){

    const container = document.getElementById("featuresContainer");

    if(!container) return;


    container.innerHTML = "";


    const features = websiteData.homepage.features || [];


    features.forEach((feature,index)=>{


        container.innerHTML += `

      <div class="feature-editor">

  <div class="feature-editor-header">

    <h3>
      Feature ${index + 1}
    </h3>

    <button
      type="button"
      class="delete-feature"
      data-index="${index}"
    >
      Delete
    </button>

  </div>


            <input
            class="feature-icon"
            data-index="${index}"
            placeholder="Icon"
            value="${feature.icon || ""}"
            >


            <input
            class="feature-color"
            data-index="${index}"
            placeholder="Color"
            value="${feature.color || ""}"
            >


            <input
            class="feature-title"
            data-index="${index}"
            placeholder="Title"
            value="${feature.title || ""}"
            >


            <textarea
            class="feature-description"
            data-index="${index}"
            placeholder="Description"
            >${feature.description || ""}</textarea>


            <input
            class="feature-badge"
            data-index="${index}"
            placeholder="Badge"
            value="${feature.badge || ""}"
            >


            <input
            class="feature-video"
            data-index="${index}"
            placeholder="Video URL"
            value="${feature.video || ""}"
            >


        </div>

        `;


       });


    container
    .querySelectorAll(".delete-feature")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.index
                    );

                websiteData.homepage.features.splice(
                    index,
                    1
                );

                loadFeatures();

            }
        );

    });

}


function collectFeatures(){

    const features = websiteData.homepage.features || [];


    document.querySelectorAll(".feature-icon")
    .forEach(input=>{
        features[input.dataset.index].icon = input.value;
    });


    document.querySelectorAll(".feature-color")
    .forEach(input=>{
        features[input.dataset.index].color = input.value;
    });


    document.querySelectorAll(".feature-title")
    .forEach(input=>{
        features[input.dataset.index].title = input.value;
    });


    document.querySelectorAll(".feature-description")
    .forEach(input=>{
        features[input.dataset.index].description = input.value;
    });


    document.querySelectorAll(".feature-badge")
    .forEach(input=>{
        features[input.dataset.index].badge = input.value;
    });


    document.querySelectorAll(".feature-video")
    .forEach(input=>{
        features[input.dataset.index].video = input.value;
    });


    websiteData.homepage.features = features;

}

function addFeature() {

    if (!websiteData.homepage) {

        websiteData.homepage = {};

    }

    if (!websiteData.homepage.features) {

        websiteData.homepage.features = [];

    }

    websiteData.homepage.features.push({

        icon: "",
        color: "pink",
        title: "New Feature",
        description: "",
        badge: "",
        video: ""

    });

    loadFeatures();

}

window.addFeature = addFeature;

document.addEventListener("DOMContentLoaded",()=>{

    const addButton = document.getElementById("addFeature");


    if(addButton){

        addButton.addEventListener(
            "click",
            addFeature
        );

    }

});

window.loadFeatures = loadFeatures;
window.collectFeatures = collectFeatures;