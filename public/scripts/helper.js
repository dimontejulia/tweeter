//helper functions for modularity

const loadTweets = function () {
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then((tweets) => {
    renderTweets(tweets);
    console.log("AJAX request successful");
  });
};
const toggleTweet = function () {
  $("body > nav > a").on("click", function () {
    $(".new-tweet").toggle();
  });
};

const scrollButton = function () {
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
};
