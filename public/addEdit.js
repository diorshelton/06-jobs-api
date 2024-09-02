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

	addEditDiv.addEventListener("click", async (e) => {
		if (inputEnabled && e.target.nodeName === "BUTTON") {
			if (e.target === addingPost) {
				enableInput(false);

				let method = "POST";
				let url = "/api/v1/posts";
				try {
					const response = await fetch(url, {
						method: method,
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							title: title.value,
							message: postContent.value,
							visible: visible.value,
						}),
					});

					const data = await response.json();
					if (response.status === 201) {
						// 201 indicates a successful create
						message.textContent = "The job entry was created.";

						title.value = "";
						postContent.value = "";
						visible.value = true;

						showPosts();
					} else {
						message.textContent = data.msg;
					}
				} catch (err) {
					console.log(err);
					message.textContent = "A communication error occurred.";
				}

				enableInput(true);
			}
		} else if (e.target === editCancel) {
			message.textContent = "";
			showPosts();
		}
	});
};

export const showAddEdit = (post) => {
	message.textContent = "";
	setDiv(addEditDiv);
};
