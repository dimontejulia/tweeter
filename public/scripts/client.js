/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function (tweetObj) {
  const content = $("<div>").text(tweetObj.content.text).html();
  const tweet = `<article>
  <header>
    <img src="${tweetObj.user.avatars}" />
    <p>${tweetObj.user.name}</p>
    <a class="handle" href="#">${tweetObj.user.handle}</a>
  </header>
  <p class="tweet-body">
  ${content}
  </p>
  <footer>
    <p>10 days ago</p>
    <p class="symbols">&#9873 &#10227; &#10084;</p>
  </footer>
</article>`;

  return tweet;
};

//taking in an array of tweet objects and then appending each one to the #tweets-container
const renderTweets = function (arrOfTweets) {
  // loops through tweets
  for (let tweet of arrOfTweets) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
};

//validates that tweet is valid, otherwise display error message
const validateTweet = function (tweetBody) {
  if (tweetBody.length <= 140 && tweetBody !== "" && tweetBody !== null) {
    $("#error").hide();
    return true;
  } else {
    $("#error").show();
    return false;
  }
};

$(document).ready(() => {
  $("#error").hide();
  $(".new-tweet").hide();
  $("#topButton").hide();
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((tweets) => {
      renderTweets(tweets);
      console.log("AJAX request successful");
    });
  };

  loadTweets();

  $("body > nav > a").on("click", function () {
    $(".new-tweet").toggle();
  });

  $(window).scroll(function () {
    if ($(".container").scrollTop() > 500) {
      $("#topButton").hide();
    } else {
      $("#topButton").show();
    }
  });

  $("#topButton").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  $("form").on("submit", (event) => {
    event.preventDefault();

    const tweetBody = validateTweet($("form textarea").val());
    if (tweetBody) {
      const serializedForm = $("form").serialize();
      //ajax request
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: serializedForm,
      }).then(() => loadTweets());
      $("#tweet-text").val("");
      $(".counter").val(140);
    }
  });
});
