// card hover effect on campground page
$(".card").mouseover(function(){
    $(this).toggleClass("black");
    $('p',this).toggleClass("visible");
    $('p',this).toggleClass("transparent");
  });
$(".card").mouseout(function(){
    $(this).toggleClass("black");
    $('p',this).toggleClass("visible");
    $('p',this).toggleClass("transparent");
});

// progress bar scroll
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll= document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myProgressBar").style.width = scrolled + "%";
}