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

				if ( addingPost.textContent === "update") {
						method = "PATCH";
						url = `/api/v1/posts/${addEditDiv.dataset.id}`;
				}

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
					if (response.status === 200 || response.status === 201) {
						if (response.status ===200) {
							message.textContent = "The post was updated.";
						} else {
							message.textContent = "The post entry was created.";
						}

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
			} else if (e.target === editCancel) {
				message.textContent = "";
				showPosts();
			}
		}
	});
};

export const showAddEdit = async (postId) => {
	if (!postId) {
		title.value = "";
		postContent.value = "";
		visible.value = true;
		addingPost.textContent = "add";
		message.textContent = "";

		setDiv(addEditDiv);
	} else {
		enableInput(false);

		try {
			const response = await fetch(`/api/v1/posts/${postId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();
			if (response.status === 200) {
				title.value = data.post.title;
				postContent.value = data.post.message;
				visible.value = data.post.visible;
				addingPost.textContent = "update";
				message.textContent = "";
				addEditDiv.dataset.id = postId;

				setDiv(addEditDiv);
			} else {
				// might happen if the list has been updated since last display
				message.textContent = "The post entry was not found";
				showPosts();
			}
		} catch (err) {
			console.log(err);
			message.textContent = "A communications error has occurred.";
			showPosts();
		}

		enableInput(true);
	}
};
