<?php

  include("./db-connection.php");

  $user = "juliusomo";
  $text_unfiltered = $_POST['text'];
  $reply_to = $_POST['commentid'];
  $date = date("Y-m-d");

  $text = filter_var($text_unfiltered, FILTER_SANITIZE_STRING);
  $upvotes = 0;
  $user_id = 4;


  $new_comment_statement = $conn->prepare("INSERT INTO comments (text, post_date, upvotes, user_id, reply_to) VALUES (?, ?, ?, ?, ?)");

  $new_comment_statement->bind_param("ssiii", $text, $date, $upvotes, $user_id, $reply_to);

  $new_comment_statement->execute();
?>