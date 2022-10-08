<?php

  include("./db-connection.php");
  include("./comment-functions.php");

  load_new_comment($conn);

  function load_new_comment($conn) {
    $latest_comment_query = "SELECT * FROM comments ORDER BY comment_id DESC LIMIT 1";
    $latest_comment = $conn->query($latest_comment_query);

    if ($latest_comment->num_rows > 0) {
      while ($row = $latest_comment->fetch_assoc()) {

        include("./comment-template.php");
        
      }
    }
  }
?>