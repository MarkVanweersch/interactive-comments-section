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

// create and insert a new comment

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
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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

function updateComment(event) {
  const comment = event.currentTarget.closest(".comment-card");
  const commentId = comment.dataset.id;
  let postInfo = "text=" + comment.querySelector("textarea").value;
  postInfo += "&commentid=" + commentId;
  
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.response);

      // vervolgens weer de textarea sluiten en de geüpdatete comment laten zien
    }
  }

  xhr.open("POST", "./update-comment.php", true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(postInfo);
}

// delete comment

function deleteComment() {
  console.log("Delete meh");
  // show modal before deleting
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
  const commentId = comment.dataset.id;
  changeUpvotes(commentId, icon, "1");

  const minusIcon = comment.querySelector(".minus-icon");
  minusIcon.removeEventListener("click", giveDownvote);
  minusIcon.removeEventListener("mouseover", makeBold);
  minusIcon.classList.remove("pointer");
  /* minusIcon.addEventListener("click", giveUpvoteTwice); */
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
  const commentId = comment.dataset.id;
  changeUpvotes(commentId, icon, "-1");

  const plusIcon = comment.querySelector(".plus-icon");
  plusIcon.removeEventListener("click", giveUpvote);
  plusIcon.removeEventListener("mouseover", makeBold);
  plusIcon.removeEventListener("mouseleave", makeRegular);
  plusIcon.classList.toggle("pointer");
}

// upvote downvoted comment

function giveUpvoteTwice(event) {

}

// downvote upvoted comment

function giveDownVoteTwice(event) {
  /* const icon = event.currentTarget;
  icon.style.width = "12px"; */

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