<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon-32x32.png">
  <link rel="stylesheet" href="style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">
  
  <title>Frontend Mentor | Interactive comments section</title>

</head>
<body>
    
<!-- connection setup -->
  <?php
    $servername = "localhost:3310";
    $username = "root";
    $password = "";
    $dbname = "interactive_comments_section";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
      die("Connection failed" . $conn->connect_error);
    }
  ?>

<!-- main comment load -->
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

  <main class="main-container">

    <?php
      include ("./comment-template.php");
      get_comments($conn);
    ?>

    <article class="comment-card new-comment">

      <img src="images/avatars/image-juliusomo.png" alt="">

      <form action="./new-comment.php" id="new-comment" method="POST">

        <textarea name="text" id="" cols="30" rows="3" placeholder="Add a comment..."></textarea>
        
      </form>

      <input class="button submit" type="submit" form="new-comment" value="SEND">
      
    </article>
    
  </main>

  
  
  
  
  
  <!-- <div class="attribution">
    Challenge by <a href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9/hub/interactive-comments-section-8OPs_tBEMT" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="https://markvanweersch.github.io/">Mark Vanweersch</a>.
  </div> -->

</body>
</html>