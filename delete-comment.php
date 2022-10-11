<?php

include("./db-connection.php");

$comment_id = $_POST["commentid"];

echo $comment_id;

$delete_comment_query = "DELETE FROM comments WHERE comment_id = " . $comment_id;
$conn->query($delete_comment_query);

?>