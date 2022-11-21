const header=document.querySelector("header");

const first_skill=document.querySelector(".skill:first-child");
const sk_counters=document.querySelectorAll(".counter span");
const progress_bars=document.querySelectorAll(".skill svg circle");

const links=document.querySelectorAll(".nav-link");

const toggle_btn=document.querySelector(".toggle-btn");
console.log(toggle_btn);

window.addEventListener("scroll",()=>{
  if(!skillsPlayed) skillsCounter();
  activeLink();
});

//------------ sticky Navbar-----------------

function stickyNavbar(){
  header.classList.toggle("scrolled",window.pageYOffset>0);
}

stickyNavbar();

window.addEventListener("scroll",stickyNavbar);

//---------------------- Reveal Animation--------------------------

let sr=ScrollReveal({
  duration:2500,
  distance:"60px",
});

sr.reveal(".showcase-info",{delay:400});
sr.reveal(".circle",{origin:"top",delay:500})
sr.reveal(".square1",{origin:"top",delay:500})
sr.reveal(".dot",{origin:"top",delay:500})
sr.reveal(".mainImage",{origin:"top",delay:500})


//---------------------- skill animation------------------------

function hasReached(el){
  let topPosition=el.getBoundingClientRect().top;

  if(window.innerHeight>=topPosition+el.offsetHeight) return true;
  return false;
}

function updateCount(num,maxNum){
  let currentNum=+num.innerText;

  if(currentNum<maxNum){
    num.innerText=currentNum+1;
    setTimeout(()=>{
      updateCount(num,maxNum);
    },12);
  }
}

var skillsPlayed=false;

function skillsCounter() {
  if(!hasReached(first_skill)) return;

  skillsPlayed=true;

  sk_counters.forEach((counter,i)=>{
    let target=+counter.dataset.target;
    let strokeValue= 427 - 427 * (target/100);

    progress_bars[i].style.setProperty("--target",strokeValue);

    setTimeout(()=>{
      updateCount(counter,target);
    },400);
  });

  progress_bars.forEach((element) => (element.style.animation="progress 2s ease-in-out forwards"));
}


//------------------  portfolio filter Animation------------------------

let mixer=mixitup(".portfolio-gallery");


// ------------------chage active link on scroll-------------------------

function activeLink(){
  let sections=document.querySelectorAll("section[id]");
  
  let passedSections=Array.from(sections)
    .map((srt,i) => {
      return{
        y:srt.getBoundingClientRect().top-header.offsetHeight,id:i,};
      }).filter((srt) => srt.y <= 0);

  let currSectionId=passedSections.at(-1).id;

  console.log(currSectionId);
  
  links.forEach((i)=>i.classList.remove("active-link"));
  links[currSectionId].classList.add("active-link");
}


activeLink();


//------------------------------------- dark-theme------------------------------

let firstTheme=localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark){
  console.log("click");
  if(isDark){
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moonset","uil-sunset");
    localStorage.setItem("dark",1);
  }
  else{
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sunset","uil-moonset");
    localStorage.setItem("dark",0);
  }
}

toggle_btn.addEventListener('click',()=>{
  console.log("click");
  changeTheme(!document.body.classList.contains("dark"));
});

// toggle_btn.addEventListener("click",function(){
//   console.log("clicked");
// })