$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const charCount = $(this).val().length;

    const counter = $(this).siblings(".form-footer").children(".counter");
    if (140 - charCount < 0) {
      counter.addClass("negativeNum");
    } else if (140 - charCount >= 0) {
      counter.removeClass("negativeNum");
    }
    counter.text(140 - charCount);
  });
});
