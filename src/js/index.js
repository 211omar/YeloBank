/*  BANNER */

const close_btn = document.querySelector(".close");
const mobile_top = document.querySelector(".mobile-top");
const header = document.querySelector("header");
let closeBtnSessionStorage = sessionStorage.getItem("closed");
const main = document.querySelector("main");
function hideTop() {
  mobile_top.classList.add("hidden");
  header.classList.add("top0");
  sessionStorage.setItem("closed", "true");
  main.style.paddingTop = "0px";
}

close_btn.addEventListener("click", hideTop);

if (closeBtnSessionStorage) {
  hideTop(); //sehife yenilenende yoxlayir
}

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
const headCore = document.querySelector(".head-core");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("bimg");
  headBottom.classList.toggle("white-bg");
  adds.classList.toggle("opened");
  mob_nav_menu.classList.toggle("tgl");
  headCore.classList.toggle("");
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

const urlAPI = "http://localhost:1992/data";

// const blogContent = document.querySelector(".blogs_content");

const blogsContainer = document.querySelector(
  ".blogs .container .block_title "
);
const blogContent = document.createElement("div");
blogContent.classList.add("blogs_content");
blogContent.classList.add("d-flex");
blogContent.classList.add("flex-wrap");

blogsContainer.after(blogContent);

const newdate = new Date();

const date1 = newdate.toISOString();

async function addPosts() {
  try {
    const request = await fetch(urlAPI, {
      method: "POST",
      body: JSON.stringify({
        title: "yelobank masallida 3",
        date: `${date1}`,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    const response = request.json();

    if (!response.ok) {
      throw "error";
    }
  } catch (error) {
    alert(error);
  }
}

async function getPost() {
  try {
    const request = await fetch(urlAPI);
    const res = await request.json();
    let content = "";
    res.slice(0, 3).forEach((item) => {
      content = `
      <div class="blogItem">
        <div class="col_content rounded border border-1 border-dark h-100 ">
            <div class="news_1_desc p-4">
              <b class='lh-5'>${item.title} </b>
              <p> </p>
              <div class="news_foot d-flex justify-content-between">
                <a href="" class="arr_bttn">Daha etrafli</a>
                <span class="time">${new Date(item.date).toDateString()} </span>
              </div>
              <a href="#" class="full_link"></a>
            </div>
        </div>
    </div>
      `;
      blogContent.innerHTML += content;
    });

    if (!res.ok) {
      throw "error";
    }
  } catch (error) {
    console.log(error);
  }
}
getPost();
