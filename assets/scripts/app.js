const listElem = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const fetchBtn = document.querySelector("#available-posts button");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");

function sendHttpReq(method, url, body) {
  // const promise = new Promise((resolve, reject) => {
    // const xhr = new XMLHttpRequest();
    // console.log(body);
    // xhr.open(method, url);
    // xhr.send(JSON.stringify(body));
    // xhr.responseType = "json";

    // console.log("REQUEST >>> ", method, url, body);

    // xhr.onerror = (ev) =>{
    //   reject(new Error('STATUS ' + xhr.status + JSON.stringify(ev)))
    // }

    // xhr.onload = function () {
    //   if (200 <= xhr.status && xhr.status< 300 ){
    //     // const dataRes = xhr.response;
    //     const dataRes = JSON.parse(xhr.response).filter((elem, index) => index < 10);
    //     console.log("RESPONSE >>> ", dataRes);
    //     resolve(dataRes);
    //   } else {
    //     reject(new Error('ERROR HERE!'))
    //   }
    // };
  // });
  // return promise;
  // console.log(type)
  // if(type)
  return fetch(url,{
    method:method,
    body:body,
    // headers:{
    //   'Content-Type':"multipart/form-data"
    // }
  }).then(response => {
    if (response.status >= 200 && response.status < 300){
      return response.json();
    } else {
      return response.json().then((errData)=>{
        // console.log(body);
        throw new Error(`Something went wrong - server-side! ${JSON.stringify(errData)}`)
      })
    }
  }).catch((err)=>{
    console.log(err);
    throw new Error('Something went wrong!')
  });

}

function postData(data) {
  for (const post of data) {
    const postElem = document.importNode(postTemplate.content, true);
    postElem.querySelector("h2").textContent = post.title;
    postElem.querySelector("p").textContent = post.body;
    postElem.querySelector("li").id = post.id;
    listElem.append(postElem);
  }
}

// let sendReq = xhr.send;
async function fetchPosts() {
  try {
    const responseData = await sendHttpReq("GET", "https://jsonplaceholder.typicode.com/posts");
    postData(responseData);
  } catch (error) {
    console.log('IN CATCH BLOCK: ', error.message)
  }
}

async function addNewPost(titleValue, contentValue) {
  const userId = Math.round(Math.random() * 100);
  const body = {
    title: titleValue,
    body: contentValue,
    userId: userId,
  }

  const formData= new FormData(form);
  // formData.append('title', titleValue);
  // formData.append('body', contentValue);
  formData.append('userId', userId);
  // formData.append('newFile', 'file','../newFile');

  if (!titleValue || !contentValue) {
    console.log("Enter title and content!!!");
  } else {
    const responseData = await sendHttpReq("POST", "https://jsonplaceholder.typicode.com/posts", formData);
    postData;
    console.log(responseData);
  }
}

async function deletePost(id) {
  const responseData = await sendHttpReq("DELETE", `https://jsonplaceholder.typicode.com/posts/${id}`);
  console.log(responseData);
}

async function updateUi(id) {
  const listElem = document.getElementById(`${id}`);
  console.log('ELEM FOR DELETING', listElem);
  listElem.remove();
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.currentTarget);
  const titleInputValue = event.currentTarget.querySelector("#title").value;
  const contentInputValue = event.currentTarget.querySelector("#content").value;
  console.log(titleInputValue, contentInputValue);
  addNewPost(titleInputValue, contentInputValue);
});

fetchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  event.stopPropagation();
  fetchPosts();
});


postList.addEventListener('click', async event => {
  if (event.target.tagName === "BUTTON"){
    event.stopPropagation();
    const postId = await event.target.closest('li').id;
    console.log('Clicked on the button!', postId)
    await deletePost(postId)
    updateUi(postId)
  }
})