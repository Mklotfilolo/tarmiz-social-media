
window.addEventListener("load", () => {
  setup();
  showPostInfoUI();

});

async function showPostInfoUI() {
  let response;
  try {
    response = await getSpecificPost();
  } catch (error) {
    showAlert(error, "danger");
    return;
  }

  // varibels
  let authorPhoto = document.querySelector(".authorPhoto");
  let authorUsername = document.querySelector(".authorText");

  let text_muted = document.querySelector(".text-muted");
  let card_text = document.querySelector(".card-text");
  let commentCount = document.querySelector(".commentCount");
  let card_title = document.querySelector(".card-title");
  let PostImage = document.querySelector(".PostImage");
  let commentsDiv = document.querySelector(".commentsDiv");
  
  text_muted.textContent=response.created_at
  PostImage.src=response.image || "./images/postPictur.jpg";
  authorPhoto.src = response.author.profile_image || 'images/userPictur.jpg' ;
  commentCount.textContent = response.comments_count;
  card_title.textContent = response.title;
  card_text.textContent = response.body;
  authorUsername.textContent='@'+ response.author.username
  let comments = response.comments;
 
  for (const comment of comments) {
    console.log(comment);
    let content = `
      <div class="container py-2">
                  <div class="oneComment">
                    <h5 class="d-flex flex-row align-items-center">
                      <img class="authorPhoto" src="${comment.author.profile_image}" onerror="this.src='images/userPictur.jpg'" alt="" /><span
                        class="px-2"
                        >@${comment.author.username}</span
                      >
                    </h5>
                    <h6 class="mx-4">${comment.body}</h6>
                  </div>
                </div>
  `;
  commentsDiv.innerHTML+=content;
  }
  toggleLoader(false)
}

async function createCommentUI() {
   let token = localStorage.getItem('token')
   if(!token){
    const loginModalEl = document.querySelector("#loginModal"); // غيّر الـ id حسب الـ modal بتاعك
    const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalEl);
    loginModal.show();
    return;
   }
  let commentInput = document.querySelector(".commentInput").value;
  let response;
  try{
    response= await createComment(commentInput)
  }catch(error){
    showAlert(error,'danger')
    console.log(error)
    return;
  }
  showAlert(' the comment created seccessfuly','success')

  setTimeout(()=>{
    window.location.reload();
   },1000)
  
}
