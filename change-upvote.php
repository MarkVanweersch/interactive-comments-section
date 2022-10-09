<?php

  include("./db-connection.php");

  $comment_id = $_POST["comment_id"];
  $value = intval($_POST["value"]);

  $upvotes_query = "SELECT upvotes FROM comments WHERE comment_id=" . $comment_id;
  $upvotes = $conn->query($upvotes_query);

  function get_upvotes($upvotes) {
    if ($upvotes->num_rows > 0) {
      while ($row = $upvotes->fetch_assoc()) {
        return $row["upvotes"];
      }
    }
  }

  $upvotes_number = intval(get_upvotes($upvotes));
  $new_upvotes = $upvotes_number + $value;

  changeUpvotes($comment_id, $new_upvotes, $conn);

  function changeUpvotes($comment_id, $new_upvotes, $conn) {
    $change_upvote_query = "UPDATE comments SET upvotes=" . $new_upvotes . " WHERE comment_id =" . $comment_id;
    if ($conn->query($change_upvote_query) == TRUE) {
      echo $new_upvotes;
    } else {
      echo $conn->error;
    }
  }

?>