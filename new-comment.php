<?php

  $servername = "localhost:3310";
  $username = "root";
  $password = "";
  $dbname = "interactive_comments_section";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
  }

  echo "Connected succesfully<br><br>";

  $user = "juliusomo";
  $text = $_POST["text"];
  $date = date("Y-m-d");

  echo $user;
  echo $text;
  echo $date;
  echo "<br><br>";

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