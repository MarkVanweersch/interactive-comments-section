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
          commentsContainer.appendChild(newCommentDiv);
        } 
      }
      loadCommentRequest.open("GET", "./load-new-comment.php", true);
      loadCommentRequest.send();
    }
  }
}

// add event listeners to reply buttons

eventListenersToReplyButtons();
function eventListenersToReplyButtons() {
  replyButtons = document.querySelectorAll(".reply-button");

  replyButtons.forEach((button) => {
  button.addEventListener("click", insertReplyBox);
});
};


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
          newCommentsContainer.appendChild(newReplyDiv);
          replyContainer.remove();
          eventListenersToReplyButtons();
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