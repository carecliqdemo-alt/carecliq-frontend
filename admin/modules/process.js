function loadProcess(){

    const container = document.getElementById("processList");

    if(!container) return;


    container.innerHTML = "";


    const process = websiteData.homepage.process || [];


    process.forEach((step,index)=>{


        container.innerHTML += `

        <div class="process-editor">


            <label>
            Step Number
            </label>

            <input
            class="process-number"
            data-index="${index}"
            value="${step.number || ""}"
            >



            <label>
            Title
            </label>

            <input
            class="process-title"
            data-index="${index}"
            value="${step.title || ""}"
            >



            <label>
            Description
            </label>

            <textarea
            class="process-description"
            data-index="${index}"
            >${step.description || ""}</textarea>



            <label>
            Video URL
            </label>

            <input
            class="process-video"
            data-index="${index}"
            value="${step.video || ""}"
            >


        </div>

        `;


    });

}



function addProcess(){


    if(!websiteData.homepage.process){

        websiteData.homepage.process = [];

    }


    websiteData.homepage.process.push({

        number:"",
        title:"New Step",
        description:"",
        video:""

    });


    loadProcess();

}



function collectProcess(){


    const process = websiteData.homepage.process || [];



    document.querySelectorAll(".process-number")
    .forEach(input=>{

        process[input.dataset.index].number =
        input.value;

    });



    document.querySelectorAll(".process-title")
    .forEach(input=>{

        process[input.dataset.index].title =
        input.value;

    });



    document.querySelectorAll(".process-description")
    .forEach(input=>{

        process[input.dataset.index].description =
        input.value;

    });



    document.querySelectorAll(".process-video")
    .forEach(input=>{

        process[input.dataset.index].video =
        input.value;

    });



    websiteData.homepage.process = process;

}



document.addEventListener("DOMContentLoaded",()=>{


    const addButton =
    document.getElementById("addProcess");


    if(addButton){

        addButton.addEventListener(
            "click",
            addProcess
        );

    }



    const saveButton =
    document.getElementById("saveProcess");


    if(saveButton){

        saveButton.addEventListener(
            "click",
            collectProcess
        );

    }


});



window.loadProcess = loadProcess;
window.addProcess = addProcess;
window.collectProcess = collectProcess;