$(document).ready(function() {

  $("textarea").on("input", function() {
    let counter = 140 - $(this).val().length;
    $(".counter").text(counter);
    if (counter < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#5f5c53");
    }
  });
});