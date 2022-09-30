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

  <div style="height: 200px;">
    
  <?php
    $servername = "localhost:3310";
    $username = "root";
    $password = "";
    $dbname = "interactive_comments_section";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
      die("Connection failed" . $conn->connect_error);
    }
    echo "Connected succesfully";

    $comments_query = "SELECT * FROM comments";
    $result = $conn->query($comments_query);

    echo "<br>";

    var_dump($result);

    echo "<br>";

    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc()) {
        echo "Comment id = " . $row["comment_id"];
      }
    }
    
  ?>
  
  </div>

  <main class="main-container">

    <article class="comment-card">

      <div class="upvote-bar">
        <img src="./images/icon-plus.svg" alt="">
        <span class="upvote-number">12</span>
        <img src="./images/icon-minus.svg" alt="">
      </div>
      
      <div class="comment-info-container">

        <header class="comment-header">
          <img src="./images/avatars/image-amyrobson.png" alt="">
          <span class="name">amyrobson</span>
          <span class="date">1 month ago</span>
          <div class="reply-button">
            <img src="./images/icon-reply.svg" alt="">
            <span>Reply</span>
          </div>
        </header>

        <p class="comment-text">Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.</p>
        
      </div>
      
    </article>

    <article class="comment-card">

      <div class="upvote-bar">
        <img src="./images/icon-plus.svg" alt="">
        <span class="upvote-number">5</span>
        <img src="./images/icon-minus.svg" alt="">
      </div>
      
      <div class="comment-info-container">

        <header class="comment-header">
          <img src="./images/avatars/image-maxblagun.png" alt="">
          <span class="name">maxblagun</span>
          <span class="date">2 weeks ago</span>
          <div class="reply-button">
            <img src="./images/icon-reply.svg" alt="">
            <span>Reply</span>
          </div>
        </header>

        <p class="comment-text">Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!</p>
        
      </div>
      
    </article>

    <div class="comment-replies-container">

      <article class="comment-card">

        <div class="upvote-bar">
          <img src="./images/icon-plus.svg" alt="">
          <span class="upvote-number">4</span>
          <img src="./images/icon-minus.svg" alt="">
        </div>
        
        <div class="comment-info-container">
  
          <header class="comment-header">
            <img src="./images/avatars/image-ramsesmiron.png" alt="">
            <span class="name">ramsesmiron</span>
            <span class="date">1 week ago</span>
            <div class="reply-button">
              <img src="./images/icon-reply.svg" alt="">
              <span>Reply</span>
            </div>
          </header>
  
          <p class="comment-text">If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.</p>
          
        </div>
        
      </article>

      <article class="comment-card">

        <div class="upvote-bar">
          <img src="./images/icon-plus.svg" alt="">
          <span class="upvote-number">2</span>
          <img src="./images/icon-minus.svg" alt="">
        </div>
        
        <div class="comment-info-container">
  
          <header class="comment-header">
            <img src="./images/avatars/image-juliusomo.png" alt="">
            <span class="name">juliusomo</span>
            <span class="date">2 days ago</span>
            <div class="reply-button">
              <img src="./images/icon-reply.svg" alt="">
              <span>Reply</span>
            </div>
          </header>
  
          <p class="comment-text">I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.</p>
          
        </div>
        
      </article>
      
    </div>

    <article class="comment-card new-comment">

      <img src="images/avatars/image-juliusomo.png" alt="">

      <form action="" id="new-comment">

        <textarea name="" id="" cols="30" rows="3" placeholder="Add a comment..."></textarea>
        
      </form>

      <input class="button submit" type="submit" form="new-comment" value="SEND">
      
    </article>

    <div>


    
    </div>

    
  </main>

  
  
  
  
  
  <!-- <div class="attribution">
    Challenge by <a href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9/hub/interactive-comments-section-8OPs_tBEMT" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="https://markvanweersch.github.io/">Mark Vanweersch</a>.
  </div> -->

</body>
</html>