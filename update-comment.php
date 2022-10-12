<?php

  include("./db-connection.php");

  $comment_text = filter_var($_POST["text"], FILTER_SANITIZE_STRING);
  $comment_id = $_POST["commentid"];

  $update_comment_statement = $conn->prepare("UPDATE comments SET text = ? WHERE comment_id = ?");

  $update_comment_statement->bind_param("si", $comment_text, $comment_id);

  $update_comment_statement->execute();


  $updated_comment_query = "SELECT text FROM comments WHERE comment_id = " . $comment_id;

  $new_comment_text = $conn->query($updated_comment_query);
  
  if ($new_comment_text->num_rows > 0) {
    while ($row = $new_comment_text->fetch_assoc()) {
      echo $row["text"];
    }
  }
?>