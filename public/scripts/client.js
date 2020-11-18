/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function (tweetObj) {
  const tweet = `<article>
  <header>
    <img src="${tweetObj.user.avatars}" />
    <p>${tweetObj.user.name}</p>
    <a class="handle" href="#">${tweetObj.user.handle}</a>
  </header>
  <p class="tweet-body">
  ${tweetObj.content.text}
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
  for (const tweet of arrOfTweets) {
    $("#tweets-container").append(createTweetElement(tweet));
  }
};

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(() => renderTweets(data));
