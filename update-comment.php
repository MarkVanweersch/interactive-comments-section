<?php

  include("./db-connection.php");

  $comment_text = urldecode($_POST["text"]);
  $comment_id = $_POST["commentid"];

  $update_comment_statement = $conn->prepare("UPDATE comments SET text = ? WHERE comment_id = ?");

  $update_comment_statement->bind_param("si", $comment_text, $comment_id);

  $update_comment_statement->execute();

  // geüpdatete comment selecteren en die terugsturen naar script.js, dit is de xhr.response

?>