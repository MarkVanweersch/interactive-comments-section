<?php

function get_comments($conn) {
  $comments_query = "SELECT * FROM comments ORDER BY upvotes DESC";
  $comments = $conn->query($comments_query);

  if ($comments->num_rows > 0) {
    while ($row = $comments->fetch_assoc()) {

      ?>

        <article class="comment-card">

        <div class="upvote-bar">
          <img src="./images/icon-plus.svg" alt="">
          <span class="upvote-number">
            <?php
              echo $row["upvotes"];
            ?>
          </span>
          <img src="./images/icon-minus.svg" alt="">
        </div>

        <div class="comment-info-container">

          <header class="comment-header">
            <img src=<?php get_user_avatar($row["user_id"], $conn); ?> alt="">
            <span class="name">
              <?php
                get_user_name($row["user_id"], $conn);
              ?>
            </span>
            <span class="date">
              <?php
                echo $row["post_date"];
              ?>
            </span>
            <div class="reply-button">
              <img src="./images/icon-reply.svg" alt="">
              <span>Reply</span>
            </div>
          </header>

          <p class="comment-text">
            <?php
              echo $row["text"];
            ?>
          </p>
          
        </div>

        </article>

      <?php

      get_replies($row["comment_id"], $conn);

    }
  }
}

?>