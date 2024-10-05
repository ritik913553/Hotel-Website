// //ye js ka code first h1 ke sbhi caracter ko single-single span me tag me dal diya

// var h1Text=document.querySelector("#firsth1").textContent

// // var splitedText = h1Text.split(" ");//split in basic of spaces
// var splitedText = h1Text.split(""); //split whole in single-single character,splitedText is an array
// // console.log(splitedText);

// var clutter=""
// splitedText.forEach(function(elem){
//     clutter += `<span>${elem}</span>`
// })

// document.querySelector("#firsth1").innerHTML=clutter;

//-------------------------------------------------------------------------
function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

//--------------------------------------------------------------
//page 1 ke sabhi h1 ke ek ek word ko span tag ke andr dal diya
function textSplitting() {
  var h1 = document.querySelectorAll("#page2 h1");
  console.log(h1);
  h1.forEach(function (elem) {
    var h1Text = elem.textContent;
    var splitedText = h1Text.split("");
    var clutter = "";
    splitedText.forEach(function (el) {
      clutter += `<span>${el}</span>`;
    });
    elem.innerHTML = clutter;
  });
}
//----------------------------------------------------

function gsapAnimation() {
  gsap.to("#page2 h1 span", {
    color: "#E3E3C4",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#page2 h1",
      scroller: "#main",
      // markers:true,
      start: "top 45%",
      end: "top -20%",
      scrub: 2,
    },
  });
}

function LoadingAnimation() {
  var tl = gsap.timeline();
  const center = document.querySelector("#center");
  const bgimage = document.querySelector("#bgimage");
  const navbar = document.querySelector("nav");
  tl.from(center, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    y: "-100%",
  });
  tl.to(bgimage, {
    duration: 2,
    height: "100vh",
    width: "100vw",
    top: "0",
    left: "0",
    transform: "none",
    borderRadius: "0%",
    ease: "power2.in",
  });
  tl.from(".icon", {
    opacity: 0,
    duration: 0.5,
    y: "-100%",
    ease: "power2.in",
  });
  tl.from("nav button", {
    opacity: 0,
    duration: 0.5,
    y: "-100%",
    ease: "power2.in",
    stagger: 0.1,
  });
}

LoadingAnimation();
locoScroll();
textSplitting();
gsapAnimation();

function page3Ani() {
  const page3h1 = document.querySelectorAll("#page3part1 h1");
  page3h1.forEach(function (elem) {
    var h1Text = elem.textContent;
    var splitedText = h1Text.split("");
    var clutter = "";
    splitedText.forEach(function (el) {
      clutter += `<span>${el}</span>`;
    });
    elem.innerHTML = clutter;
  });
  gsap.to("#page3part1 span", {
    color: "#434B34",
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#page3part1 h1",
      scroller: "#main",
      start: "top 70%",
      end: "top 25%",
      scrub: 4,
    },
  });
}
page3Ani();

function page4Ani() {
  document.querySelectorAll(".room").forEach((room, index) => {
    room.addEventListener("mouseenter", function () {
      const firstDiv = room.querySelector(".first-div");
      const middleDiv = room.querySelector(".second-div");
      const lastDiv = room.querySelector(".last-div");
      lastDiv.innerHTML = `<i class="ri-arrow-right-line px-5 py-1 rounded-full text-sm text-[#5C6748] bg-white font-bold "></i> `;
      gsap.to(firstDiv, {
        x: "100%",
        duration: 0.5,
      });
      gsap.to(middleDiv, {
        x: "50%",
        duration: 0.5,
      });
    });
    room.addEventListener("mouseleave", () => {
      const firstDiv = room.querySelector(".first-div");
      const middleDiv = room.querySelector(".second-div");
      const lastDiv = room.querySelector(".last-div");
      lastDiv.innerHTML = `<h1 class="px-5 py-1 text-white text-sm bg-[#5C6748] rounded-full">
              ${(index + 1).toString().padStart(2, "0")}
            </h1>`;
      gsap.to(firstDiv, {
        x: "0%",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(middleDiv, {
        x: "0%", // Reset to original width
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
}
page4Ani();


function page5Ani() {

  const images = document.querySelectorAll(".view");
  const leftbtn = document.querySelector("#page5 .left");
  const rightbtn = document.querySelector("#page5 .right");
  let currentIdx = Number(document.querySelector("#page5 .currentIdx").textContent)-1;
  console.log(currentIdx);
  
  rightbtn.addEventListener("click", () => {
    if (currentIdx < images.length-1) {        
      currentIdx++;
      
      gsap.to(images[currentIdx-1],{
        x:`${-110 * currentIdx}%` ,
        width:"70vw",
        height:"40vh",
        duration:0.5,
        ease: "power2.inOut"
      })
      gsap.to(images[currentIdx],{
        x: `${-100 * currentIdx}%`,
        width:"70vw",
        height:"85vh",
        duration:0.5,
        ease: "power2.inOut"
      })
      gsap.to(images[currentIdx+1],{
        x: `${-100 * currentIdx}%`,
        duration:0.5,
        ease: "power2.inOut"
      })
      document.querySelector("#page5 .currentIdx").innerHTML=currentIdx+1;
    }
  });

  leftbtn.addEventListener("click", () => {
    if (currentIdx === 1) {
      gsap.to(images[currentIdx],{
        x: `${1 * currentIdx}%`,
        width:"70vw",
        height:"40vh",
        duration:0.5,
        ease: "power2.inOut"
      })
      gsap.to(images[currentIdx-1],{
        x:`${1 * currentIdx}%`,
        width:"70vw",
        height:"85vh",
        duration:0.5,
        ease: "power2.inOut"
      })
      gsap.to(images[currentIdx+1],{
        x: `${1 * currentIdx}%`,
        duration:0.5,
        ease: "power2.inOut"
      })
      currentIdx--;
      document.querySelector("#page5 .currentIdx").innerHTML=currentIdx+1;
    }
    if (currentIdx === 2) {
      gsap.to(images[currentIdx],{
        x: "-100%",
        width:"70vw",
        height:"40vh",
        duration:0.5,
        ease: "power2.inOut"
      })
      gsap.to(images[currentIdx-1],{
        x:'-100%',
        width:"70vw",
        height:"85vh",
        duration:0.5,
        ease: "power2.inOut"
      })
      gsap.to(images[currentIdx+1],{
        x: "1%",
        duration:0.5,
        ease: "power2.inOut"
      })
      currentIdx--;
      document.querySelector("#page5 .currentIdx").innerHTML=currentIdx+1;
    }
  });

  document.querySelector("#page5 .currentIdx").innerHTML="1";
}
page5Ani();



function page8Ani() {
  gsap.to("#page8 .faci1", {
    x: "-50%", 
    duration: 1,
    scrollTrigger: {
      trigger: "#page8 .faci1",
      scroller: "#main",
      start: "top 65%", 
      end: "top 10%",   
      scrub: 3,
    }
  });

  gsap.to("#page8 .faci2", {
    x: "50%",
    duration: 1,
    scrollTrigger: {
      trigger: "#page8 .faci2",
      scroller: "#main",
      start: "top 65%", 
      end: "top 10%",
      scrub: 3,
    }
  });
  const tl = gsap.timeline();
  tl.to(".text h1",{
    opacity:1,
    duration:1,
    scrollTrigger: {
      trigger: ".text h1",
      scroller: "#main",
      start: "top 40%", 
      end: "top 10%",
      scrub: 1,
    }
  })
  tl.from("#page8 .bottom", {
    opacity: 0,
    y: "100%", 
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: "#page8 .bottom", 
      scroller: "#main",
      start: "top 80%",  
      end: "top 50%",
      scrub: 1,
    }
  });
}

page8Ani();