import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showPosts } from "./posts.js";

let addEditDiv = null;
let title = null;
let postContent = null;
let visible = null;
let addingPost = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-post");
  title = document.getElementById("title");
  postContent = document.getElementById("post-content");
  visible = document.getElementById("visible");
  addingPost = document.getElementById("adding-post");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingPost) {
        showPosts();
      } else if (e.target === editCancel) {
        showPosts();
      }
    }
  });
};

export const showAddEdit = (post) => {
  message.textContent = "";
  setDiv(addEditDiv);
};