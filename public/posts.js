import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let postsDiv = null;
let postsTable = null;
let postsTableHeader = null;

export const handlePosts = () => {
  postsDiv = document.getElementById("posts");
  const logoff = document.getElementById("logoff");
  const addPost = document.getElementById("add-post");
  postsTable = document.getElementById("posts-table");
  postsTableHeader = document.getElementById("posts-table-header");

  postsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addPost) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        showLoginRegister();
      }
    }
  });
};

export const showPosts = async () => {
  setDiv(postsDiv);
};