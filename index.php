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

  <?php
    include("./db-connection.php");
  ?>

  <main class="main-container">

    <div class="comments-container">

      <?php
        include ("./comment-template.php");
      ?>

    </div>

    <article class="comment-card new-comment">

      <img src="images/avatars/image-juliusomo.png" alt="">

      <textarea name="text" id="" cols="30" rows="3" placeholder="Add a comment..."></textarea>

      <button class="button comment">SEND</button>

    </article>
    
  </main>

  
  <!-- <div class="attribution">
    Challenge by <a href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9/hub/interactive-comments-section-8OPs_tBEMT" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="https://markvanweersch.github.io/">Mark Vanweersch</a>.
  </div> -->

  <script src="./script.js"></script>

</body>
</html>