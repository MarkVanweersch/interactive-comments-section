<?php

  include("./db-connection.php");

  $user = "juliusomo";
  $text_unfiltered = ($_POST['text']);
  $date = date("Y-m-d");

  $text = filter_var($text_unfiltered, FILTER_SANITIZE_STRING);
  $upvotes = 0;
  $user_id = 4;

  echo $text;

  $new_comment_statement = $conn->prepare("INSERT INTO comments (text, post_date, upvotes, user_id) VALUES (?, ?, ?, ?)");

  $new_comment_statement->bind_param("ssii", $text, $date, $upvotes, $user_id);

  $new_comment_statement->execute();
?>