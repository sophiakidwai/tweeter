/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
  <article class="tweet">
  <header class="tweet-header">
    <div class="profile-pic">
      <img src="${tweet.user.avatars}">
    </div>
    <div class="name">
      <h2>${tweet.user.name}</h2>
      <p>${tweet.user.handle}</p>
    </div>
    <div class="handle">
    <p>${timeago.format(tweet.created_at)}</p>
    </div>
  </header>
  <div class="tweet-content">
    <p>${escape(tweet.content.text)}</p>
  </div>
  <footer class="tweet-footer">
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-sharp fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  
  </footer>
  </article>
  `);
  $(".tweet-container").prepend($tweet);
  };

 

  const renderTweets = function(tweets) {
    $('.tweet-container').empty();
    for (let tweet of tweets) {
    createTweetElement(tweet);
    }
  };



  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();

    const textArea = $("#tweet-text").val();
    if (textArea.length > 140) {
      return $(".error-message").text("too long! 140 characters max!").slideDown().addClass("error-style");
    }

    if (textArea === "") {
      return $(".error-message").text("Please enter a tweet").slideDown().addClass("error-style");

    }

//tweet submission data

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweet,
    }).then(function() {
      $(".error-message").slideUp();
      $("#tweet-text").val("");
      $(".counter").text(140);
      loadTweets();
    });
  });

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(renderTweets);


  };
  loadTweets();
});