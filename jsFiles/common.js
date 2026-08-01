// LOGIN USER
async function loginUserUI() {
  const username = document.querySelector(".usernameInput").value;
  const password = document.querySelector(".passwordInput").value;
  toggleLoader(true);
  let response;
  try {
    response = await LoginUser(username, password);
  } catch (error) {
    showAlert(error, "danger");
    toggleLoader(false);
    return;
  }
  let token = response.token;
  localStorage.setItem("token", token);
  localStorage.setItem("userInformation", JSON.stringify(response.user));
  // CLOSE MODLE OF LOGIN
  const exampleModal = document.getElementById("loginModal");
  const instance = bootstrap.Modal.getOrCreateInstance(exampleModal);
  instance.hide();
  showAlert("login is seccessefully", "success");
  toggleLoader(false);
  setTimeout(() => {
    window.location.reload()
  }, 800);
  
}

// REGISTER NEW USER
async function registerNewUserUI() {
  const name = document.querySelector(".registerNameInput").value;
  const username = document.querySelector(".registerUsernameInput").value;
  const password = document.querySelector(".registerPasswordInput").value;
  const registerPicturUser = document.querySelector(".registerPicturUser")
    .files[0];
  // todo : fix function prams
  let formdata = new FormData();
  formdata.append("name", name);
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("image", registerPicturUser);

  let response;
  try {
    response = await registerNewUser(formdata);
  } catch (error) {
    showAlert(error, "danger");
    return;
  }

  let token = response.token;
  localStorage.setItem("token", token);
  localStorage.setItem("userInformation", JSON.stringify(response.user));
  // CLOSE MODLE OF LOGIN
  const exampleModal = document.getElementById("registerModal");
  const instance = bootstrap.Modal.getOrCreateInstance(exampleModal);
  instance.hide();

  showAlert("login is seccessefully", "success");
  setup();
}

// logout
function logoutuser() {
  localStorage.removeItem("token");
  localStorage.removeItem("userInformation");
  const profileNavBar = document.getElementById("profileNavBar");
  profileNavBar.innerHTML = "";
  showAlert("logout is seccessefully", "warning");

  setTimeout(() => {
    window.location.reload()
  }, 800);
  
}

// SHOW AND HIDE BUTTON AFTER LOGIN OR ELSE
function setup() {
  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("userInformation"));
  const logout_btn = document.querySelector("#logout_btn");
  const login_btn = document.querySelector("#login_btn");
  const addPost_btn = document.querySelector(".addPost_btn");
  const regester_btn = document.querySelector("#regester_btn");
  if (token != null && user != null) {
    logout_btn.classList.remove("hideEllement");
    login_btn.classList.add("hideEllement");
    regester_btn.classList.add("hideEllement");
    addPost_btn.classList.remove("hideEllement");
    fillProfileInformation();
  } else {
    login_btn.classList.remove("hideEllement");
    regester_btn.classList.remove("hideEllement");
    logout_btn.classList.add("hideEllement");
    addPost_btn.classList.add("hideEllement");
  }
}

function fillProfileInformation() {
  const profileNavBar = document.getElementById("profileNavBar");
  let user = JSON.parse(localStorage.getItem("userInformation"));
  if (user == null) {
    return;
  }
  const imageSrc = user.profile_image || "./images/userPictur.jpg";
  let element = `
            <div class="d-flex flex-row flex-nowrap align-items-center justify-content-center" onclick="getUserInfo(${user.id})">
            <img class="rounded-circle border-3" onerror="this.src='images/userPictur.jpg'" width="40px" height="40px" src="${imageSrc} " alt="user pictur">
            <a id="userNameNavBar" class="user mx-1 text-truncate" style="width:clamp(60px, 20vw, 150px)" >@${user.username} </a>
            </div>
        `;
  profileNavBar.innerHTML = element;
}

// create new post
async function createNewPostUI() {
  const postTitle = document.getElementById("postTitle").value.trim();
  const bodyPost = document.getElementById("bodyPost").value.trim();
  const postPictor = document.getElementById("postPictor").files[0];
  if (!postTitle) {
    showAlert("please fill in the title", "danger");
    return;
  }
  let formdata = new FormData();
  formdata.append("title", postTitle);
  formdata.append("body", bodyPost);
  formdata.append("image", postPictor);
  let response = "";
  try {
    response = await createNewPost(formdata);
  } catch (error) {
    showAlert(error, "danger");
    return;
  }
  const exampleModal = document.getElementById("createPostModal");
  const instance = bootstrap.Modal.getOrCreateInstance(exampleModal);
  instance.hide();
  showAlert("the new post has been create seccessefully", "success");
  setTimeout(() => {
    window.location.reload()
  }, 800);
  
}

//  show alert function
function showAlert(alertmessage, alerType) {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible show fade" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);
    return wrapper.firstElementChild;
  };
  const alertEl = appendAlert(alertmessage, alerType);

  setTimeout(() => {
    const alert = new bootstrap.Alert(alertEl);
    alert.close();
  }, 2500);
}

// show user in profile page 
function getUserInfo(id){
  setTimeout(() => {
    window.location=`profilePage.html?id=${id}`
  }, 1000);
  
}




// 
let idPostToEditeOrDelete;
async function editePostUI() {
  let titleEditePost= document.querySelector('.titleEditePost').value.trim();
  let bodyEditePost= document.querySelector('.bodyEditePost').value.trim();
  let request={
    "title":titleEditePost,
    "body":bodyEditePost
  }
  let idPost= idPostToEditeOrDelete
  console.log(request)
   let response;
   try{
    response=await editePost(idPost,request)
   }catch(error){
    showAlert(error,'danger');
    return;
   }
   showAlert('edite successfuly ',"success")
   setTimeout(()=>{
    window.location.reload();
   },1000)
}

// delete post

let deletePostID;
async function deletePostUI(id) {
  let response;
  try{
    response= await deletePost(id);
  }catch(error){
    showAlert(error,'danger');
    return;
  }
  showAlert('deleted successfuly ',"success")
   setTimeout(()=>{
    window.location.reload();
   },1000)
  
}


function toggleLoader(show = true){
  if (show) {
    document.querySelector('.hiddenScreen').style.display="flex";
  }else{
    document.querySelector('.hiddenScreen').style.display="none";
  }
}