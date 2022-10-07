<?php

  // get the avatar url from user

  function get_user_avatar($id, $conn) {
    $avatar_url_query = "SELECT avatar_url FROM users WHERE user_id = " . $id;
    $avatar_url = $conn->query($avatar_url_query);

    if ($avatar_url->num_rows > 0) {
      while ($row = $avatar_url->fetch_assoc()) {
        echo $row["avatar_url"];
      }
    }
  }

  // get comment's author name

  function get_user_name($id, $conn) {
    $user_query = "SELECT user_name FROM users WHERE user_id = " . $id;
    $user_name = $conn->query($user_query);

    if ($user_name->num_rows > 0) {
      while ($row = $user_name->fetch_assoc()) {
        echo $row["user_name"];
      }
    }
  }

  // load any replies on comments

  function get_replies($id, $conn) {
    $replies_query = "SELECT * FROM replies WHERE comment_id = " . $id;
    $replies = $conn->query($replies_query);

    if ($replies->num_rows > 0) {

      ?>
        <div class="comment-replies-container">
      <?php
      
      while ($row = $replies->fetch_assoc()) {

        ?>

        <article class="comment-card" data-id=<?php echo $row["reply_id"] ?> data-type="reply">

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
              <img src= <?php get_user_avatar($row["user_id"], $conn) ?> alt="">
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
        
      }

      ?>
        </div>
      <?php
    }
  }
?>