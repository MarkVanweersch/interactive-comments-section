<?php
  $servername = "localhost:3310";
  $username = "root";
  $password = "";
  $dbname = "interactive_comments_section";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed" . $conn->connect_error);
  }
?>