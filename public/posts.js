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
			} else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      }
		} else if (e.target === logoff) {
			setToken(null);
			message.textContent = "You have been logged off.";
			postsTable.replaceChildren([postsTableHeader]);
			showLoginRegister();
		} else if (e.target.classList.contains("deleteButton")) {
			console.log("clicked Delete Button");
			message.textContent = "";
			showAddEdit(e.target.dataset.id);
		}
	});
};

export const showPosts = async () => {
	try {
		enableInput(false);

		const response = await fetch("/api/v1/posts", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();
		let children = [postsTableHeader];

		if (response.status === 200) {
			if (data.count === 0) {
				postsTable.replaceChildren(...children); // clear this for safety
			} else {
				for (let i = 0; i < data.posts.length; i++) {
					let rowEntry = document.createElement("tr");

					let editButton = `<td><button type="button" class="editButton" data-id=${data.posts[i]._id}>edit</button></td>`;
					let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.posts[i]._id}>delete</button></td>`;
					let rowHTML = `
            <td>${data.posts[i].title}</td>
            <td>${data.posts[i].message}</td>
            <td>${data.posts[i].visible}</td>
            <div>${editButton}${deleteButton}</div>`;

					rowEntry.innerHTML = rowHTML;
					children.push(rowEntry);
				}
				postsTable.replaceChildren(...children);
			}
		} else {
			message.textContent = data.msg;
		}
	} catch (err) {
		console.log(err);
		message.textContent = "A communication error occurred.";
	}
	enableInput(true);
	setDiv(postsDiv);
};
