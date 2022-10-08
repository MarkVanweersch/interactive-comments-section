// add event listeners to plus and minus icons

plusIcons = document.querySelectorAll(".plus-icon");
minusIcons = document.querySelectorAll(".minus-icon");

plusIcons.forEach((icon) => {
  icon.addEventListener("click", giveUpvote);
});

minusIcons.forEach((icon) => {
  icon.addEventListener("click", giveDownvote);
});


// add event listeners to delete buttons

deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteComment);
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

// insert a new comment

const newCommentButton = document.querySelector(".button.comment");
const commentsContainer = document.querySelector(".comments-container");

newCommentButton.addEventListener("click", createComment);

function createComment() {
  const xhr = new XMLHttpRequest();
  const text = "text=" + document.querySelector("textarea[name=text]").value;

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
          newCommentDiv.querySelector(".edit-button").addEventListener("click", editComment);
          newCommentDiv.querySelector(".delete-button").addEventListener("click", deleteComment);
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
      comment.querySelector(".reply-button").removeEventListener("click", insertReplyBox);
      replyBoxFunctionsAdder(replyContainer);
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
  commentContainer.querySelector(".reply-button").addEventListener("click", insertReplyBox);
}

// create new reply

function createReply(event) {
  const replyContainer = event.currentTarget.closest(".reply-container");
  const info = "text=" + replyContainer.querySelector("textarea").value + "&commentid=" + replyContainer.previousElementSibling.dataset.id;
  

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      
      const newReplyRequest = new XMLHttpRequest();

      newReplyRequest.onreadystatechange = () => {
        if (newReplyRequest.readyState == 4 && newReplyRequest.status == 200) {
          const newCommentsContainer = replyContainer.closest(".comment-wrapper").querySelector(".comment-replies-container");
          const newReplyDiv = document.createElement("div");
          newReplyDiv.innerHTML = newReplyRequest.response;
          console.log(newReplyDiv);
          newReplyDiv.querySelector(".edit-button").addEventListener("click", editComment);
          newReplyDiv.querySelector(".delete-button").addEventListener("click", deleteComment);
          newCommentsContainer.appendChild(newReplyDiv);
          replyContainer.remove();
        }
      }

      newReplyRequest.open("GET", "./load-new-reply.php");
      newReplyRequest.send();
      
    }
  }

  xhr.open("POST", "./new-reply.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhr.send(info);
}

// edit comment

function editComment(event) {
  const editButton = event.currentTarget;
  editButton.removeEventListener("click", editComment);
  editButton.addEventListener("click", stopEditComment);

  const editBox = document.createElement("textarea");

  const updateButton = document.createElement("button");
  updateButton.classList.add("button", "comment", "update");
  updateButton.addEventListener("click", updateComment);

  const updateButtonText = "UPDATE";
  const updateButtonTextNode = document.createTextNode(updateButtonText);
  updateButton.appendChild(updateButtonTextNode);


  const commentText = event.currentTarget.closest(".comment-card").querySelector(".comment-text");

  editBox.value = commentText.innerText;

  commentText.style.display = "none";

  const commentInfoContainer =  event.currentTarget.closest(".comment-info-container")
  commentInfoContainer.appendChild(editBox);
  commentInfoContainer.appendChild(updateButton);

}

// stop edit comment

function stopEditComment(event) {
  const comment = event.currentTarget.closest(".comment-card");
  comment.querySelector("textarea").remove();
  comment.querySelector(".button.update").remove();
  comment.querySelector(".comment-text").style.display = "block";
  event.currentTarget.addEventListener("click", editComment);
  event.currentTarget.removeEventListener("click", stopEditComment);
}

// update comment

function updateComment() {
  console.log("Updated");
}

// delete comment

function deleteComment() {
  console.log("Delete meh");
  // show modal before deleting
}

// upvote comment

function giveUpvote(event) {
  const icon = event.currentTarget;
  const commentId = icon.closest(".comment-card").dataset.id;
  icon.removeEventListener("click", giveUpvote);
  icon.classList.remove("pointer");
  changeUpvotes(commentId, "1");
}

// downvote comment

function giveDownvote(event) {
  const icon = event.currentTarget;
  const commentId = icon.closest(".comment-card").dataset.id;
  icon.removeEventListener("click", giveDownvote);
  icon.classList.remove("pointer");
  changeUpvotes(commentId, "-1");
}

// ajax upvotes call

function changeUpvotes(commentId, value) {
  const xhr = new XMLHttpRequest();
  const postInfo = "comment_id=" + commentId.toString() + "&value=" + value;
  console.log(postInfo);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert(xhr.responseText);
    }
  };

  xhr.open("POST", "./change-upvote.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(postInfo);
}