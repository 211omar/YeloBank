const close_btn = document.querySelector(".close");
const mobile_top = document.querySelector(".mobile-top");
const header = document.querySelector("header");
let closeBtnSessionStorage = sessionStorage.getItem("closed");
const main = document.querySelector("main");
const headLinks = document.querySelectorAll(".alink");
const oBank = document.querySelector(".o_banking");
const topMenu = document.querySelector(".head-top");
const headBottom = document.querySelector(".head-bottom");
const menuToggle = document.querySelector(".menu-toggle");
const openBox = document.querySelector(".open_select");
const selectBox = document.querySelector(".select_box");
const closeSelect = document.querySelector(".close_selectbox");
const adds = document.querySelector(".head_adds");
const mob_nav_menu = document.querySelector("nav");
const headCore = document.querySelector(".head-core");
const blogContent = document.createElement("div");
const blogsContainer = document.querySelector(
  ".blogs .container .block_title "
);
const newdate = new Date();
const date1 = newdate.toISOString();
const urlAPI = "http://localhost:1992/data";

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
if (window.screenTop > 0) {
  topMenu.style.display = "none";
}
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

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("bimg");
  headBottom.classList.toggle("white-bg");
  adds.classList.toggle("opened");
  mob_nav_menu.classList.toggle("tgl");
  headCore.classList.toggle("");
});

/*MAIN */

/*CALCULATOR INPUTS */
function renderer(val, id) {
  document.getElementById(id).value = val;
}

/*LOAN CALCULATOR */
const calculateLoan = () => {
  let amount = document.getElementById("money").value;
  let interest = document.getElementById("percentage").value;
  let months = document.getElementById("timee").value;
  let numAmount = Number(amount);
  let numInterest = Number(interest);
  let numMonth = Number(months);

  let monthlyPayment = (numAmount / 100) * numInterest + numAmount;

  let sum2 = monthlyPayment / numMonth;
  // let totalInterest = (amount * (interest * 0.01)) / months;
  // let totalPayment = parseFloat(amount) + parseFloat(totalInterest);

  document.getElementById("my_month_pay").innerHTML = `
                 ${parseFloat(sum2).toFixed(0)}AZN
                 `;
};

/*CURRENCY EXCHANGE */

const urlExchange = "http://localhost:1992/currency";
const sell = document.getElementById("sell");
const buy = document.getElementById("buy");
const select1 = document.querySelector("#sell_select");
const select2 = document.querySelector("#buy_select");
const option1 = select1.value;
const option2 = select2.value;
let removed = null;

function doCalculation() {
  const select1 = document.querySelector("#sell_select");
  const select2 = document.querySelector("#buy_select");
  const option1 = select1.value;
  const option2 = select2.value;
  const sellValue = Number(sell.value);

  // function checkDuplicate() {
  //   const aznSell = document.getElementById("azn_sell");

  //   if (option1 === "azn") {
  //     let azn = aznSell.value;
  //     removed = azn;
  //     select2.remove(azn);
  //     removed = null;
  //   } else {
  //     if (removed) {
  //       select2.add(removed);
  //       removed = null;
  //     }
  //   }
  // }
  // checkDuplicate();
  
  async function getCurrencies() {
    const request = await fetch(`${urlExchange}`);
    const response = await request.json();
    return response;
  }
  getCurrencies().then((data) => {
    const rate = data.rates[option2];
    console.log(rate);
    const rate2 = data.rates[option1];

    // TO AZN
    if (option1 === "eur" && option2 === "azn") {
      buy.innerHTML = (sellValue * Number(rate2)).toFixed(2);
    } else if (option1 === "usd" && option2 === "azn") {
      buy.innerHTML = (sellValue * Number(rate2)).toFixed(2);
    }

    //TO USD EUR
    if (option1 === "azn" && option2 === "eur") {
      buy.innerHTML = (sellValue / Number(rate)).toFixed(2);
    } else if (option1 === "azn" && option2 === "usd") {
      buy.innerHTML = (sellValue / Number(rate)).toFixed(2);
    }
  });
}
sell.addEventListener("keyup", doCalculation);

/*BLOGS*/
blogContent.classList.add("blogs_content");
blogContent.classList.add("d-flex");
blogContent.classList.add("flex-wrap");
blogsContainer.after(blogContent);

//GET POSTS
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
