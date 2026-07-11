let mm = gsap.matchMedia();


mm.add("(max-width: 768px)", ()=>{

    gsap.globalTimeline.timeScale(1.3);

});

gsap.registerPlugin(ScrollTrigger);

/* --------------------------
   LENIS SMOOTH SCROLL
-------------------------- */

const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 1.5
});

function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* --------------------------
   HERO ENTRANCE
-------------------------- */

const hero = gsap.timeline({
    defaults:{
        ease:"power3.out"
    }
});

hero

.from("header",{
    y:-80,
    opacity:0,
    duration:.8
})

.from("#top h1",{
    y:60,
    opacity:0,
    duration:.8
},"-=.3")

.from("#top p",{
    y:40,
    opacity:0,
    duration:.7
},"-=.5")

.from(".hero-buttons button",{
    y:30,
    opacity:0,
    stagger:.12,
    duration:.5
},"-=.4")

.from("video",{
    scale:.94,
    opacity:0,
    duration:1.3
},"-=.8");

/* --------------------------
   GENERAL REVEALS
-------------------------- */

gsap.utils.toArray(".reveal").forEach((el)=>{

    gsap.from(el,{
        opacity:0,
        y:50,
        duration:1.2,
        ease:"power3.out",

        scrollTrigger:{
            trigger:el,
            start:"top 85%",
            toggleActions:"play none none reverse"
        }
    });

});

/* --------------------------
   FEATURE CARDS
-------------------------- */

gsap.utils.toArray(".feature-card").forEach((card,i)=>{

    gsap.from(card,{

        y:80,

        opacity:0,

        duration:1.3,

        delay:i*.08,

        ease:"power3.out",

        scrollTrigger:{
            trigger:card,
            start:"top 85%",
            toggleActions:"play none none reverse"
        }

    });

});

/* --------------------------
   STATS
-------------------------- */

gsap.utils.toArray(".stat-card").forEach((card,i)=>{

    gsap.fromTo(card,

    {
        opacity:0,
        y:60
    },

    {
        opacity:1,
        y:0,
        duration:1,
        delay:i * 0.15,
        ease:"power3.out",

        scrollTrigger:{
            trigger:".stats-section",
            start:"top 80%",
            toggleActions:"play none none reverse"
        }

    });

});
/* --------------------------
   PROCESS CARDS
-------------------------- */

gsap.utils.toArray(".step-card-wrapper").forEach((card)=>{

    gsap.fromTo(card,

    {
        opacity:0,
        y:80
    },

    {
        opacity:1,
        y:0,
        duration:1,
        ease:"power3.out",

        scrollTrigger:{
            trigger:card,
            start:"top 85%",
            toggleActions:"play none none reverse"
        }

    });

});
/* --------------------------
   FOOTER
-------------------------- */

gsap.from("footer",{

    y:100,

    opacity:0,

    duration:1.3,

    scrollTrigger:{
        trigger:"footer",
        start:"top bottom"
    }

});
/* --------------------------
   PARALLAX VIDEO
-------------------------- */

const heroVideo=document.querySelector("#top video");

if(heroVideo){

window.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*20;

const y=(e.clientY/window.innerHeight-.5)*20;

gsap.to(heroVideo,{

x,

y,

duration:1.5,

ease:"power3.out"

});

});

}

window.addEventListener("load", ()=>{

    ScrollTrigger.refresh();

});