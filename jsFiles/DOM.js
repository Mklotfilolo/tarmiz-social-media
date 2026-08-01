document.body.onload = () => {
  setup();
  setTimeout(() => {
    document.body.style.visibility = "visible";
  }, 1000);
};

let isLoading = false;
const loadMorePosts = document.querySelector(".loadMorePosts");
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      fillPostsInHtml();
    }
  },
  {
    root: null,
    rootMargin: "300px",
    threshold: 1.0,
  },
);
observer.observe(loadMorePosts);

async function fillPostsInHtml() {
  isLoading = true;
  toggleLoader(true)
  let response;
  try {
    response = await getPosts();
  } catch (error) {
    isLoading = false;
    showAlert(error, "danger");
    return;
  }

  let postsElement = document.querySelector(".posts");

  if (!response) {
    isLoading = false;
    return;
  } 
  
    let userId;
    if(JSON.parse(localStorage.getItem('userInformation'))){
      userId=  JSON.parse(localStorage.getItem('userInformation')).id; 
    }
    
    
  
  

  response.forEach((element) => {
    let eidteAndDeleteOptions=`
      <div class="mr-3">
              <details class="">
                <summary class="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-three-dots"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
                    />
                  </svg>
                </summary>
                <ul class="editeAndDeletePost">
                  <li><button type="button" data-bs-toggle="modal" data-bs-target="#editePostModal" data-bs-whatever="@mdo" onclick="idPostToEditeOrDelete=${element.id}">Edite </button></li>
                  <li><button type="button" onclick="deletePostID=${element.id}"data-bs-toggle="modal" data-bs-target="#delteConformModal" >Delete</button></li>
                </ul>
              </details>
            </div>
    `
    if(!(element.author.id==userId) ){
      eidteAndDeleteOptions=""
    }
    let content = `
             <!--post-->
               <div class="card shadow my-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-row" onclick="getUserInfo(${element.author.id})">
                    <img  class="authorPhoto " src="${element.author.profile_image }" onerror="this.src='images/userPictur.jpg'" alt="user pictur"> 
                    <h5 class="authorText my-auto mx-1">@${element.author.username}</h5>

                    </div>
                    ${eidteAndDeleteOptions}
                    
                        
                    </div>
                    <div class="card-body d-flex justify-content-center flex-column" onclick="registerPostInformationClicked(${element.id})">
                        <img class="PostImage my-2 rounded border-2 mx-auto" src="${element.image}" alt="">
                        
                        <h5 class="card-title">${element.title || " (no title) "}</h5>
                        <p class="card-text"> ${element.body}</p>
                        <div class="text-muted my-1">${element.created_at}</div>
                        <hr>
                        <div class="d-flex flex-wrap flex-row">
                            <h6 class="commentElement px-2 py-1">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                    </svg>
                                </span> (${element.comments_count}) comments
                            </h6>
                            <div id="postTags${element.id}" class="postTags d-flex">
                                
                            </div>
                        </div>
                    </div>
                </div> 
            <!--// post //-->  
         `;
    postsElement.insertAdjacentHTML("beforeend", content);
    // add tags
    let postTags = document.getElementById(`postTags${element.id}`);
    for (let tag of element.tags) {
      let oneTag = `
                <div class="Tag mx-1 px-2 py-1 rounded-pill "> ${tag.name} </div>
            `;
      postTags.innerHTML += oneTag;
    }
  });
  isLoading = false;
  toggleLoader(false)
}

// register Post Information Clicked
function registerPostInformationClicked(id) {
  localStorage.setItem("idPost", id);
  setTimeout(() => {
    window.location = "postPage.html";
  }, 500);
}
