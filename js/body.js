
// background-images

flashFullScreenBackgroundImages("very-slow");

// the-end-of-background-images



// latest-news

$('.latest-news-con').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
});

// the-end-of-latest-news


// news-on-this-day

$('.news-on-this-day-list').slick({
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  speed: 300,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    }
  ]  
});

// the-end-of-news-on-this-day
