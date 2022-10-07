<?php

  include("./db-connection.php");

  $user = "juliusomo";
  $text = $_POST['text'];
  $date = date("Y-m-d");

  create_comment($conn, $user, $text, $date);

  function create_comment($conn, $user, $text, $date) {
    $new_comment_query = "INSERT INTO comments (text, post_date, upvotes, user_id) VALUES (
      '$text',
      '$date',
      0, 
      4
    )";

    if ($conn->query($new_comment_query) === TRUE) {
      echo "New comment added succesfully";
    } else {
      echo "Failed to add new comment";
    }
  }
?>