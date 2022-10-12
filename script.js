// add event listeners to plus and minus icons

plusIcons = document.querySelectorAll(".plus-icon");
minusIcons = document.querySelectorAll(".minus-icon");

plusIcons.forEach((icon) => {
  icon.addEventListener("click", giveUpvote);
  icon.addEventListener("mouseover", makeBold);
  icon.addEventListener("mouseleave", makeRegular);
});

minusIcons.forEach((icon) => {
  icon.addEventListener("click", giveDownvote);
  icon.addEventListener("mouseover", makeBold);
  icon.addEventListener("mouseleave", makeRegular);
});


// add event listeners to delete buttons

deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", showModal);
});

// add event listeners to edit buttons

editButtons = document.querySelectorAll(".edit-button");

editButtons.forEach((button) => {
  button.addEventListener("click", editComment);
});

// add event listeners to reply buttons

replyButtons = document.querySelectorAll(".reply-button");

replyButtons.forEach((button) => {
button.addEventListener("click", insertReplyBox);
});

// add event listeners to modal buttons

document.querySelector(".button.cancel").addEventListener("click", cancelDeletion);
document.querySelector(".button.delete").addEventListener("click", deleteComment);

const deleteModal = document.querySelector(".delete-modal-container");
const darkOverlay = document.querySelector(".dark-overlay");

// add event listener to new comment textarea

document.querySelector("textarea[name=text]").addEventListener("click", removeError);


// create and insert a new comment

const newCommentButton = document.querySelector(".button.comment");
const commentsContainer = document.querySelector(".comments-container");

newCommentButton.addEventListener("click", createComment);

function createComment() {
  
  const commentText = document.querySelector("textarea[name=text]");
  if (commentText.value === "" || commentText.value === null) {
    commentText.classList.add("error");
    commentText.placeholder = "A new comment can't be empty.";
    return;
  }
  const text = "text=" + commentText.value;
  const xhr = new XMLHttpRequest();
  commentText.value = "";

  xhr.open("POST", "./new-comment.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(text);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const loadCommentRequest = new XMLHttpRequest();

      loadCommentRequest.onreadystatechange = () => {
        if (loadCommentRequest.readyState == 4 && loadCommentRequest.status == 200) {

          const newCommentDiv = document.createElement("div");
          newCommentDiv.innerHTML = loadCommentRequest.response;
          
          newCommentDiv.querySelectorAll(".edit-button").forEach((item) => {
            item.addEventListener("click", editComment);
          })
          newCommentDiv.querySelectorAll(".delete-button").forEach((item) => {
            item.addEventListener("click", showModal);
          })
          commentsContainer.appendChild(newCommentDiv);
        } 
      }
      loadCommentRequest.open("GET", "./load-new-comment.php", true);
      loadCommentRequest.send();
    }
  }
}

// insert reply box

function insertReplyBox(event) {
  const comment = event.currentTarget.closest(".comment-card");

  const replyContainer = document.createElement("div");
  replyContainer.classList.add("reply-container");

  const commentContainer = comment.parentElement;
  commentContainer.appendChild(replyContainer);
  
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      replyContainer.innerHTML = xhr.response;
      comment.querySelectorAll(".reply-button").forEach((item) => {
        item.removeEventListener("click", insertReplyBox);
      })
      replyBoxFunctionsAdder(replyContainer);
      commentContainer.querySelector("textarea").addEventListener("click", removeError);
      commentContainer.querySelector("textarea").focus();
    }
  }

  xhr.open("GET", "./reply-box.php", true);
  xhr.send();
}

// add functionality to reply box

function replyBoxFunctionsAdder(replyContainer) {
  replyContainer.querySelector(".button.comment.reply").addEventListener("click", createReply);
  replyContainer.querySelector(".reply-box-buttons-container img").addEventListener("click", deleteReplyBox);
}

// delete reply box

function deleteReplyBox(event) {
  const commentContainer = event.currentTarget.closest(".comment-container");
  
  commentContainer.querySelector(".reply-container").remove();

  
  commentContainer.querySelectorAll(".reply-button").forEach((item) => {
    item.addEventListener("click", insertReplyBox);
  })
}

// create new reply

function createReply(event) {
  const replyContainer = event.currentTarget.closest(".reply-container");
  const replyTextarea = replyContainer.querySelector("textarea");

  if (replyTextarea.value === "" || replyTextarea.value === null) {
    replyTextarea.classList.add("error");
    replyTextarea.placeholder = "A new comment can't be empty.";
    return;
  }

  replyContainer.previousElementSibling.querySelectorAll(".reply-button").forEach((item) => {
    item.addEventListener("click", insertReplyBox);
  })
  
  const info = "text=" + replyTextarea.value + "&commentid=" + replyContainer.previousElementSibling.querySelector("input[type=hidden]").value;
  
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      
      const newReplyRequest = new XMLHttpRequest();

      newReplyRequest.onreadystatechange = () => {
        if (newReplyRequest.readyState == 4 && newReplyRequest.status == 200) {
          const newCommentsContainer = replyContainer.closest(".comment-wrapper").querySelector(".comment-replies-container");
          const newReplyDiv = document.createElement("div");
          newReplyDiv.innerHTML = newReplyRequest.response;
          newReplyDiv.querySelectorAll(".edit-button").forEach((item) => {
            item.addEventListener("click", editComment);
          })

          newReplyDiv.querySelectorAll(".delete-button").forEach((item) => {
            item.addEventListener("click", showModal);
          })

          newCommentsContainer.appendChild(newReplyDiv);
          replyContainer.remove();
        }
      }

      newReplyRequest.open("GET", "./load-new-reply.php");
      newReplyRequest.send();
      
    }
  }

  xhr.open("POST", "./new-reply.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(info);
}

// edit comment

function editComment(event) {
  const editButton = event.currentTarget;
  editButton.removeEventListener("click", editComment);
  editButton.addEventListener("click", stopEditComment);

  const editBox = document.createElement("textarea");
  editBox.addEventListener("click", removeError);

  const updateButton = document.createElement("button");
  updateButton.classList.add("button", "comment", "update");
  updateButton.addEventListener("click", updateComment);

  const updateButtonText = "UPDATE";
  const updateButtonTextNode = document.createTextNode(updateButtonText);
  updateButton.appendChild(updateButtonTextNode);

  const commentText = event.currentTarget.closest(".comment-card").querySelector(".comment-text");

  editBox.value = commentText.innerText;

  const commentTextContainer = event.currentTarget.closest(".comment-card").querySelector(".comment-text-container");
  commentTextContainer.style.display = "none";

  const upvoteBarMobile = event.currentTarget.closest(".comment-card").querySelector(".upvote-bar.mobile");
  upvoteBarMobile.style.display = "none";

  const commentInfoContainer =  event.currentTarget.closest(".comment-info-container")
  commentInfoContainer.appendChild(editBox);
  commentInfoContainer.appendChild(updateButton);

  editBox.focus();
}

// stop edit comment

function stopEditComment(event) {
  const comment = event.currentTarget.closest(".comment-card");
  comment.querySelector("textarea").remove();
  comment.querySelector(".button.update").remove();
  comment.querySelector(".comment-text-container").style.display = "block";
  comment.querySelector(".upvote-bar.mobile").style.display = "flex";

  event.currentTarget.addEventListener("click", editComment);
  event.currentTarget.removeEventListener("click", stopEditComment);
}

// update comment

function updateComment(event) {
  const comment = event.currentTarget.closest(".comment-card");
  const commentId = comment.querySelector("input[type=hidden]").value;
  const commentTextarea = comment.querySelector("textarea");

  if (commentTextarea.value === "" || commentTextarea === null) {
    commentTextarea.classList.add("error");
    commentTextarea.placeholder = "A comment can't be empty";
    return;
  }
  
  let postInfo = "text=" + commentTextarea.value;
  postInfo += "&commentid=" + commentId;
  
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const newCommentText = document.createTextNode(xhr.response);
      const newCommentTextElement = document.createElement("span");
      newCommentTextElement.classList.add("comment-text");
      newCommentTextElement.appendChild(newCommentText);

      const commentText = comment.querySelector(".comment-text");
      const commentTextContainer = comment.querySelector(".comment-text-container");

      commentText.remove();
      commentTextContainer.appendChild(newCommentTextElement);

      comment.querySelector("textarea").remove();
      comment.querySelector(".button.update").remove();
      commentTextContainer.style.display = "block";

      comment.querySelectorAll(".edit-button").forEach((item) => {
        item.removeEventListener("click", stopEditComment);
      });
      comment.querySelectorAll(".edit-button").forEach((item) => {
        item.addEventListener("click", editComment);
      });
    }
  }

  xhr.open("POST", "./update-comment.php", true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(postInfo);
}

// show delete Modal

let deleteCommentId = 0;

function showModal(event) {
  deleteModal.classList.add("active");
  darkOverlay.classList.add("active");

  darkOverlay.addEventListener("click", cancelDeletion);

  const commentId = event.currentTarget.closest(".comment-card").querySelector("input[type=hidden]").value;
  deleteCommentId = commentId;
}


// cancel deletion of comment

function cancelDeletion() {
  deleteModal.classList.remove("active");
  darkOverlay.classList.remove("active");
  darkOverlay.removeEventListener("click", cancelDeletion);
}

// delete comment

function deleteComment() {
  const postInfo = "commentid=" + deleteCommentId;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {

      const comment = document.querySelectorAll("input[type=hidden]");
      comment.forEach((item) => {
        if (item.value == deleteCommentId) {
          item.closest(".comment-wrapper").remove();
        }
      })

    }

    deleteModal.classList.remove("active");
    darkOverlay.classList.remove("active");
    darkOverlay.removeEventListener("click", cancelDeletion);

  }

  xhr.open("POST", "./delete-comment.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(postInfo)


}

// upvote comment

function giveUpvote(event) {
  const icon = event.currentTarget;
  icon.style.width = "12px";
  icon.src = "./images/icon-plus-blue.svg";
  icon.removeEventListener("click", giveUpvote);
  icon.removeEventListener("mouseover", makeBold);
  icon.removeEventListener("mouseleave", makeRegular);
  icon.classList.remove("pointer");

  const comment = icon.closest(".comment-card");
  const commentId = comment.querySelector("input[type=hidden]").value;
  changeUpvotes(commentId, icon, "1");


  const minusIcon = comment.querySelectorAll(".minus-icon");
  
  minusIcon.forEach((icon) => {
    icon.removeEventListener("click", giveDownvote);
    icon.removeEventListener("mouseover", makeBold);
    icon.classList.remove("pointer");
  })
}

// downvote comment

function giveDownvote(event) {
  const icon = event.currentTarget;
  icon.style.width = "12px";
  icon.removeEventListener("click", giveDownvote);
  icon.removeEventListener("mouseover", makeBold);
  icon.removeEventListener("mouseleave", makeRegular);
  icon.classList.remove("pointer");

  const comment = icon.closest(".comment-card");
  const commentId = comment.querySelector("input[type=hidden]").value;
  changeUpvotes(commentId, icon, "-1");

  const plusIcon = comment.querySelectorAll(".plus-icon");
  plusIcon.forEach((icon) => {
    icon.removeEventListener("click", giveUpvote);
    icon.removeEventListener("mouseover", makeBold);
    icon.removeEventListener("mouseleave", makeRegular);
    icon.classList.toggle("pointer");
  })
}

// ajax upvotes call

function changeUpvotes(commentId, icon, value) {
  const xhr = new XMLHttpRequest();
  const postInfo = "comment_id=" + commentId.toString() + "&value=" + value;
  const upvoteNumber = icon.closest(".upvote-bar").querySelector(".upvote-number")

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      return displayUpvote(xhr.response);
    }
  }

  function displayUpvote(number) {
    upvoteNumber.innerText = number;
  }

  xhr.open("POST", "./change-upvote.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(postInfo);
}

// make plus and minus icons bold on mouseover

function makeBold(event) {
  const icon = event.currentTarget;
  icon.style.width = "12px";
  if (icon.src.indexOf("icon-plus") > 0) {
    icon.src = "./images/icon-plus-blue.svg";
  } else {
    icon.src = "./images/icon-minus-blue.svg";
  }
}

// make plus and minus icons normal after mouse leaves

function makeRegular(event) {
  const icon = event.currentTarget;
  icon.style.width = "10px";
  if (icon.src.indexOf("icon-plus") > 0) {
    icon.src = "./images/icon-plus.svg";
  } else {
    icon.src = "./images/icon-minus.svg";
  }
}

// remove error colors from textarea

function removeError(event) {
  const textArea = event.currentTarget;
  textArea.classList.remove("error");
  textArea.placeholder = "Add a new comment...";
}