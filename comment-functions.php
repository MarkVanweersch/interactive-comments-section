<?php

  // inital comment load

  function get_comments($conn) {
    $comments_query = "SELECT * FROM comments WHERE reply_to IS NULL ORDER BY upvotes DESC";
    $comments = $conn->query($comments_query);

    if ($comments->num_rows > 0) {
      while ($row = $comments->fetch_assoc()) {

        include("./comment-template.php");

      }
    }
  }

  // load any replies on comments

  function get_replies($id, $conn) {
    $replies_query = "SELECT * FROM comments WHERE reply_to = " . $id . " ORDER BY upvotes DESC";
    $replies = $conn->query($replies_query);

    if ($replies->num_rows > 0) {
      while ($row = $replies->fetch_assoc()) {
        include("./comment-template.php");
      }
    }
  }

  // get the avatar url from user

  function get_user_avatar($id, $conn) {
    $avatar_url_query = "SELECT avatar_url FROM users WHERE user_id = " . $id;
    $avatar_url = $conn->query($avatar_url_query);

    if ($avatar_url->num_rows > 0) {
      while ($row = $avatar_url->fetch_assoc()) {
        echo $row["avatar_url"];
      }
    }
  }

  // get comment's author name

  function get_user_name($id, $conn) {
    $user_query = "SELECT user_name FROM users WHERE user_id = " . $id;
    $user_name = $conn->query($user_query);

    if ($user_name->num_rows > 0) {
      while ($row = $user_name->fetch_assoc()) {
        echo $row["user_name"];
      }
    }
  }

  // get username of comment on which is replied

  function get_replied_user_name($id, $conn) {
    $user_id_query = 'SELECT user_id FROM comments WHERE comment_id = ' . $id;

    $user_id = $conn->query($user_id_query);

    if ($user_id->num_rows > 0) {
      while ($row = $user_id->fetch_assoc()) {
        echo "@";
        echo get_user_name($row["user_id"], $conn);
      }
    }
  }
  
  
?>