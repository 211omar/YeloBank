const urlAPI = "http://localhost:1992/data";

const newdate = new Date();
const date1 = newdate.toISOString();

/*more blogs (slice)*/

// const moreBlogs = document.querySelector(".all_news");
// moreBlogs.addEventListener("click", () => {
//   console.log("all news clicked")
//   x++
//   console.log(x);
// });

/*modal */
const closeModal = document.querySelector(".close_modal");
const modalContainer = document.querySelector(".post-modal");
const modal = document.querySelector(".modal-inner");
const addPostModal = document.querySelector(".addPostModal");
addPostModal.addEventListener("click", () => {
  modalContainer.classList.remove("closed");
  modal.classList.remove("close");
});
closeModal.addEventListener("click", () => {
  modalContainer.classList.add("closed");
  modal.classList.add("close");
});

/* add posts*/

async function addPosts() {
  const titleInput = document.getElementById("add_title");
  const titleValue = titleInput.value;
  try {
    fetch(urlAPI, {
      method: "POST",
      body: JSON.stringify({
        title: titleValue,
        date: `${date1}`,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      if (!response.ok) {
        throw "error oldu";
      }
    });
  } catch (error) {
    alert(error);
  }
}

/*get posts */
// let x = 3;
async function getPost() {
  const blogsContainer = document.querySelector(
    ".blogs .container .block_title"
  );
  const blogContent = document.createElement("div");
  blogContent.classList.add("blogs_content");
  blogContent.classList.add("d-flex");
  blogContent.classList.add("flex-wrap");
  blogsContainer.after(blogContent);
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
          <button data-id="${
            item.id
          }" class='delete_button'>Delete Post</button>
        </div>
      </div>
    </div>
      `;
      blogContent.innerHTML += content;
    });
    deletePost();
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
    const deleteBtn = document.querySelectorAll(".delete_button");
    console.log(deleteBtn);
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", async function () {
        fetch(`${urlAPI}/${btn.dataset.id}`, {
          method: "DELETE",
        });
      });
    });
  } catch (error) {
    console.log(error + " delete post");
  }
}
