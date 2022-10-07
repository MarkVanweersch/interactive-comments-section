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
          commentsContainer.innerHTML += loadCommentRequest.response;
        } 
      }
      loadCommentRequest.open("GET", "./load-new-comment.php", true);
      loadCommentRequest.send();
    }
  }
}

// reply to an existing comment

replyButtons = document.querySelectorAll(".reply-button");
console.log(replyButtons);

replyButtons.forEach((button) => {
  button.addEventListener("click", replyToComment);
});

function replyToComment(event) {
  const comment = event.currentTarget.closest(".comment-card");
  console.log(comment);
}