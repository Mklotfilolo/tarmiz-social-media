// varibles to getposts function 
let currentPage = 1;
let TotalPages;
async function getPosts() {
  try {
    let response = await axios.get(
      `https://tarmeezacademy.com/api/v1/posts?page=${currentPage}`,
    );
    if (response) {
      TotalPages = response.data.meta.last_page;
      currentPage = currentPage == TotalPages? 1 : ++currentPage;
      return response.data.data;
    }
  } catch (error) {
    throw error.response?.data?.message;
  }
}
// login and get token  api
async function LoginUser(username, password) {
  try {
    let response = await axios.post("https://tarmeezacademy.com/api/v1/login", {
      username: username,
      password: password,
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message ||'try agin';
  }
}
// register new user
async function registerNewUser(formdata) {
  try {
    let response = await axios.post(
      "https://tarmeezacademy.com/api/v1/register",
      formdata,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message ||'try agin';
  }
}

// create new post api
async function createNewPost(prams) {
  const token = localStorage.getItem("token");
  try {
    let response = await axios.post(
      "https://tarmeezacademy.com/api/v1/posts",
      prams,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message ||'try agin';
  }
}

// get specific post api
async function getSpecificPost(){
    let id = localStorage.getItem('idPost')
    try {
    let response = await axios.get(
      `https://tarmeezacademy.com/api/v1/posts/${id}`,
    );
    if (response) {
      return response.data.data;
    }
  } catch (error) {
    throw error.response?.data?.message;
  }
}

// create comment api
async function createComment(commentValue) {
  let response;
  const id = localStorage.getItem('idPost')
  const token= localStorage.getItem('token')
  try{
    response = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`,{
      "body":commentValue,
    },{
      headers:{
        "Authorization": `Bearer ${token}`,
      }
    })
    return response.data
  }catch(error){
    throw error.response?.data?.message ||'try agin';
  }
}

// edite post api
async function editePost(id,params) {
  let token=localStorage.getItem('token');
  if(!token)return;
  let response;
  try{
    response= await axios.put(`https://tarmeezacademy.com/api/v1/posts/${id}`,params,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    return response;
  }catch(error){
    throw error.response?.data?.message ||'try agin';
  }

  
}

// delete post api
async function deletePost(id) {
  let token=localStorage.getItem('token');
  if(!token)return;
  let response;
  try{
    response= await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${id}`,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
    })
    return response;
  }catch(error){
    throw error.response?.data?.message ||'try agin';
  }

  
}

// get user information
async function ShowUserInformation(id){
  let response;
  try{
    response= await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`
    )
    return response.data.data;
  }catch(error){
    throw error.response?.data?.message ||'try agin';
  }

}

async function profilePostsUser(id){
    try {
    let response = await axios.get(
      `https://tarmeezacademy.com/api/v1/users/${id}/posts`,
    );
    if (response) {
      return response.data.data;
    }
  } catch (error) {
    throw error.response?.data?.message;
  }

}