const urlAPI = "http://localhost:1992/data";

// const blogContent = document.querySelector(".blogs_content");

const blogsContainer = document.querySelector(".blogs .container .block_title");
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
    res.slice(0,15).forEach((item) => {
      content = `
      <div class="blog  ">
      <div class="col_content rounded border border-1 border-dark h-100 ">
        <div class="news_1_desc p-4">
          <b class='lh-5'>${item.title} </b>
          
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


