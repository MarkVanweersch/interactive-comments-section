<div class="comment-wrapper">
  <div class="comment-container">
    <article class="comment-card" data-id=<?php echo $row["comment_id"] ?>>

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
        <div class="delete-button">
          <img src="./images/icon-delete.svg" alt="">
          <span>Delete</span>
        </div>
        <div class="edit-button">
          <img src="./images/icon-edit.svg" alt="">
          <span>Edit</span>
        </div>
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
  </div>
  

  <div class="comment-replies-container">
    <?php
      get_replies($row["comment_id"], $conn);
    ?>
  </div>

</div>