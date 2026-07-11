// =====================================
// TESTIMONIALS MODULE
// =====================================


let testimonialsData = [];



// LOAD TESTIMONIALS

function loadTestimonials(){


    const testimonials =
    websiteData.homepage.testimonials || [];


    testimonialsData = testimonials;


    renderTestimonials();


}



// RENDER

function renderTestimonials(){


    const container =
    document.getElementById("testimonialsList");


    if(!container) return;


    container.innerHTML = "";



    testimonialsData.forEach((item,index)=>{


        container.innerHTML += `


        <div class="testimonial-editor-card">


            <h3>
            Testimonial ${index + 1}
            </h3>



            <label>
            Name
            </label>

            <input 
            class="testimonial-name"
            data-index="${index}"
            value="${item.name || ""}"
            >



            <label>
            Role
            </label>

            <input 
            class="testimonial-role"
            data-index="${index}"
            value="${item.role || ""}"
            >



            <label>
            Quote
            </label>

            <textarea 
            class="testimonial-quote"
            data-index="${index}"
            >${item.quote || ""}</textarea>



            <label>
            Image URL
            </label>

            <input 
            class="testimonial-image"
            data-index="${index}"
            value="${item.image || ""}"
            >



           <label>
Audio URL
</label>

<input
    class="testimonial-audio"
    data-index="${index}"
    placeholder="/uploads/client-audio.mp3"
value="${item.audio || ""}"
>


            <button onclick="deleteTestimonial(${index})">
            Delete
            </button>



        </div>


        `;


    });


}



// ADD

document
.getElementById("addTestimonial")
.addEventListener("click",()=>{


    testimonialsData.push({

        name:"",
        role:"",
        quote:"",
        image:"",
        audio:""

    });


    renderTestimonials();


});



// DELETE

function deleteTestimonial(index){


    testimonialsData.splice(index,1);


    renderTestimonials();

}



// COLLECT

function collectTestimonials(){


    const cards =
    document.querySelectorAll(".testimonial-editor-card");



    testimonialsData = [];


    cards.forEach(card=>{


        testimonialsData.push({

            name:
            card.querySelector(".testimonial-name").value,


            role:
            card.querySelector(".testimonial-role").value,


            quote:
            card.querySelector(".testimonial-quote").value,


            image:
            card.querySelector(".testimonial-image").value,


            audio:
            card.querySelector(".testimonial-audio").value

        });

document
.querySelectorAll(".testimonial-audio")
.forEach(input => {

    testimonials[
        input.dataset.index
    ].audio =
    input.value;

});
    });



    websiteData.homepage.testimonials =
    testimonialsData;


}



window.loadTestimonials = loadTestimonials;

window.collectTestimonials = collectTestimonials;

window.deleteTestimonial = deleteTestimonial;