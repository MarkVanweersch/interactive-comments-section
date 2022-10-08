<?php

  include("./db-connection.php");
  include("./comment-functions.php");

  $replies_query = "SELECT * FROM comments ORDER BY comment_id DESC LIMIT 1";
  $replies = $conn->query($replies_query);

  if ($replies->num_rows > 0) {
    
    while ($row = $replies->fetch_assoc()) {
      include("./comment-template.php");
    }
  }
  
?>