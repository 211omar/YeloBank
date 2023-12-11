const urlAPI = "http://localhost:1992/data";

const blogsContainer = document.querySelector(".blogs .container .block_title");
const blogContent = document.createElement("div");
blogContent.classList.add("blogs_content");
blogContent.classList.add("d-flex");
blogContent.classList.add("flex-wrap");
blogsContainer.after(blogContent);
const newdate = new Date();
const date1 = newdate.toISOString();

/*more blogs (slice)*/

const moreBlogs = document.querySelector(".all_news");
moreBlogs.addEventListener("click", () => console.log("all news clicked"));

/* add posts*/
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

/*get posts */
let x = 3;
async function getPost() {
  try {
    const request = await fetch(urlAPI);
    const res = await request.json();
    let content = "";
    res.forEach((item) => {
      content = `
      <div class="blog  ">
      <div class="col_content ">
        <div class="news_1_desc ">
          <b class='lh-5'>${item.title} </b>
          
          <div class="news_foot ">
            <a href="#" class="arr_bttn">Daha etrafli</a>
            <span class="time">${new Date(item.date).toDateString()} </span>
          </div>
          <button data-id="${item.id}" class='delete_button'>Delete Post</button>
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

/*delete post */
async function deletePost() {
  try {
    setTimeout(() => {
      const deleteBtn = document.querySelectorAll(".delete_button");
      // console.log(deleteBtn);
      deleteBtn.forEach((btn) =>
      btn.addEventListener("click", async function () {
          console.log(btn)
          const request = await fetch(`${urlAPI}/${btn.dataset.id}`,{
            method:"DELETE"
          });
          const response = await request.json();
          console.log(response) ;
        })
      );
    }, 100);
  } catch (error) {
    console.log(error + " delete post");
  }
}

deletePost();
