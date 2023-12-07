

/*  BANNER */

const close_btn = document.querySelector(".close");
const mobile_top = document.querySelector(".mobile-top");
const header = document.querySelector("header");
let closeBtnSessionStorage = sessionStorage.getItem("closed");

function hideTop() {
  mobile_top.classList.add("hidden");
  header.classList.add("top0");
  sessionStorage.setItem("closed", "true");
}

close_btn.addEventListener("click", hideTop);

// if (closeBtnSessionStorage == "true") {
//   hideTop(); //sehife yenilenende yoxlayir
// }

/*HEADER*/

//topnav
const headLinks = document.querySelectorAll(".alink");
const oBank = document.querySelector(".o_banking");
const topMenu = document.querySelector(".head-top");
const headBottom = document.querySelector(".head-bottom");
const menuToggle = document.querySelector(".menu-toggle");

window.addEventListener("scroll", () => {
  let scrolled = window.scrollY;
  if (scrolled > 0) {
    topMenu.classList.add("hide");
    oBank.classList.add("scrolled");
    headBottom.classList.add("white-bg");
    menuToggle.classList.add("smaller");
  } else {
    topMenu.classList.remove("hide");
    oBank.classList.remove("scrolled");
    headBottom.classList.remove("white-bg");
    menuToggle.classList.remove("smaller");
  }
});

headLinks.forEach((item) => {
  item.addEventListener("click", (e) => {
    document.querySelector(".top-li > .active").classList.toggle("active");
    e.target.classList.add("active");
  });
});

//selectbox

const openBox = document.querySelector(".open_select");
const selectBox = document.querySelector(".select_box");
const closeSelect = document.querySelector(".close_selectbox");

openBox.addEventListener("click", () => {
  selectBox.classList.add("open");
  console.log(selectBox.classList);
});

closeSelect.addEventListener("click", () => {
  selectBox.classList.remove("open");
});

//problem1
// window.addEventListener('click',(e)=>{
//     if(e.target!=selectBox){
//       selectBox.classList.remove('open')
//     }
// })

// navbar

const adds = document.querySelector(".head_adds");
const mob_nav_menu = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("bimg");
  headBottom.classList.toggle("white-bg");

  adds.classList.toggle("opened");
  mob_nav_menu.classList.toggle("tgl");
});

//slider

const dot = document.querySelectorAll(".dot");
dot.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.target.classList.add("is-selected");
    document.querySelector(".is-selected").classList.toggle("is-selected");
  });
});

//carousel

// const slideItem = document.querySelectorAll(".s_item");
// window.addEventListener("resize", () => {
//   let x = window.innerWidth;

//   slideItem.forEach((item) => {
//     if (x<460) {
//       item.style.left += `${x/40}`+'%'

//     }

//   });

// });

/*BLOGS*/

const urlAPI = "http://localhost:1912/blogs";
const blogContent = document.querySelector('.blog_content')

async function addPosts() {
  try {
    const request = await fetch(urlAPI,
      {
        method:"POST",
        body:JSON.stringify({
          "date":"2023-04-30"
        })
      }
      );
    const response = request.json();

    if(!response.ok){
    throw 'error'
    }
  } 
  catch (error) {
    alert(error)
  }
}

addPosts()