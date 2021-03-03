const listElem = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const fetchBtn = document.getElementById("available-posts");
const addBtn = document.querySelector("#new-post form");
const postList = document.querySelector("ul");

function sendHttpReq(method, url, body) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    console.log(body);
    xhr.open(method, url);
    xhr.send(JSON.stringify(body));
    xhr.responseType = "json";

    console.log("REQUEST >>> ", method, url, body);

    xhr.onload = function () {
      // console.log('BEFORE', typeof xhr.response, xhr.response);
      const dataRes = xhr.response;
      // const dataRes = JSON.parse(xhr.response).filter((elem, index) => index < 5);
      console.log("RESPONSE >>> ", dataRes);
      resolve(dataRes);
    };
  });
  return promise;
}

function postData(data) {
  for (const post of data) {
    const postElem = document.importNode(postTemplate.content, true);
    postElem.querySelector("h2").textContent = post.title;
    postElem.querySelector("p").textContent = post.body;
    listElem.append(postElem);
  }
}

// let sendReq = xhr.send;
async function fetchPosts() {
  const responseData = await sendHttpReq("GET", "https://jsonplaceholder.typicode.com/posts");
  postData(responseData);
}

async function addNewPost(titleValue, contentValue) {
  const userId = Math.round(Math.random() * 100);
  const body = {
    title: titleValue,
    body: contentValue,
    userId: userId,
  };
  if (!titleValue || !contentValue) {
    console.log("Enter title and content!!!");
  } else {
    const responseData = await sendHttpReq("POST", "https://jsonplaceholder.typicode.com/posts", body);
    postData;
    console.log(responseData);
  }
}

async function deletePost() {
  const responseData = await sendHttpReq("DELETE", "https://jsonplaceholder.typicode.com/posts/1");
  console.log(responseData);
}

addBtn.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.currentTarget);
  const titleInputValue = event.currentTarget.querySelector("#title").value;
  const contentInputValue = event.currentTarget.querySelector("#content").value;
  console.log(titleInputValue, contentInputValue);
  addNewPost(titleInputValue, contentInputValue);
});

fetchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  await fetchPosts();
  const deleteBtn = document.querySelector(".post-item button");
  console.log(deleteBtn);
  deleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    deletePost();
  });
});


postList.addEventListener('click', event => {
  
})