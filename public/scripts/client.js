/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  const createTweetElement = function (tweet) {
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
    <p>${tweet.content.text}</p>
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
    return $tweet;
  };

  const renderTweets = function (tweets) {
    console.log(tweets)
    for (let tweet of tweets) {
      
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  

  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    const tweet = $(this).serialize();

    const textArea = $("#tweet-text").val();
    if (textArea.length > 140) {
      return $(".over-limit").text("Too many characters");
    }

    if (textArea === "") {
      return $(".over-limit").text("Please enter a tweet");
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweet,
    }).then(loadTweets)

  });

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(renderTweets)
        
  
  };
  loadTweets();
});