<?php

  include("./db-connection.php");

  $user = "juliusomo";
  $text = $_POST['text'];
  $date = date("Y-m-d");

  $upvotes = 0;
  $user_id = 4;


  $new_comment_statement = $conn->prepare("INSERT INTO comments (text, post_date, upvotes, user_id) VALUES (?, ?, ?, ?)");

  $new_comment_statement->bind_param("ssii", $text, $date, $upvotes, $user_id);

  $new_comment_statement->execute();
?>