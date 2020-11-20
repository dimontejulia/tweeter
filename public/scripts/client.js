/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//ensures whole document is loaded
$(document).ready(() => {
  //hides items that are toggled by events
  $("#error").hide();
  $(".new-tweet").hide();
  $("#topButton").hide();

  //helper functions for revealing more features
  loadTweets();
  toggleTweet();
  scrollButton();

  //creates and adds new tweet to the list
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
