var bannerIsSmall;  // Boolean

var bannerHeightBig;    // Height in pixels, Gotten from placeholder DIV
var bannerHeightSmall;  // Height in pixels, Gotten from placeholder DIV
var menuLabelHeight;

$(document).ready(function(){
    bannerHeightBig = $("#sizePlaceholder").height();
    bannerHeightSmall = $("#sizePlaceholder").width();
    menuLabelHeight = $(".menuLabel").height();

    bannerIsSmall = false;
    if($(window).scrollTop() > 30)
    {
      bannerIsSmall = true;
      smallTop();
    }
    $(window).scroll(function(){
      var scrollTop = $(this).scrollTop();
      if (bannerIsSmall == false && scrollTop > 30)
      {
        bannerIsSmall = true;
        smallTop();
      }
      else if (bannerIsSmall && scrollTop < 30)
      {
        bigTop();
        bannerIsSmall = false;
      }
    });

    $(".menuBox").click(function(){scrollToAnchor($(this).attr('linkDes'));});
    $("#backToTop").click(function(){scrollToTop();});
    $(".menuBox").mouseenter(function(){hoverOverMenu($(this));});
    $(".menuBox").mouseleave(function(){hoverOffMenu($(this));});

});

// Shrink the nav Bar
function smallTop()
{
  $("#banner").animate({height:bannerHeightSmall});
  var newMarginTop = bannerHeightSmall / 2 - menuLabelHeight / 2;
  $(".menuLabel").animate({marginTop: newMarginTop});
  $("#titleDiv").stop( true, true ).fadeOut(250);
  $("#backToTop").fadeIn(250);
  $(".menuQuote").fadeOut();
}

// Enlarge the nav Bar
function bigTop()
{
  $("#banner").animate({height:bannerHeightBig});
  var newMarginTop = bannerHeightBig/2;
  $(".menuLabel").animate({marginTop: newMarginTop});
  $("#titleDiv").stop( true, true ).delay(200).fadeIn();
  $("#backToTop").fadeOut(250);
}

// Scroll to specific section
function scrollToAnchor(anchorName)
{
  var idString= "h2[name='"+anchorName+"']";
  var anchorObj = $(idString);

  $("html,body").animate({scrollTop: anchorObj.offset().top-100},'slow');

}

// Scroll to top
function scrollToTop()
{
  $("html,body").animate({scrollTop: 0},'slow');
  bigTop();
}

function hoverOverMenu(menuBox)
{
  if(!bannerIsSmall)
  {
    var newLabelMargin = bannerHeightBig/4;
    menuBox.children(".menuLabel").stop( true, true ).animate({marginTop: newLabelMargin}, 600);
    menuBox.children(".menuQuote").stop( true, true ).fadeIn(600);
  }

}
function hoverOffMenu(menuBox)
{
  if(!bannerIsSmall)
  {
    var newLabelMargin = bannerHeightBig/2;
    menuBox.children(".menuLabel").stop( true, true ).animate({marginTop: newLabelMargin});
    menuBox.children(".menuQuote").stop( true, true ).fadeOut();
  }
}
