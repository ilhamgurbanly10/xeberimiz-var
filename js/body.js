// our-courses

const ourCoursesCon = document.querySelector('.our-courses-main-con');
flashIsScrolled(ourCoursesCon);

// the-end-of-our-coursess



// about-us

const textCon = document.querySelector('.about-us-text-con');
flashIsScrolled(textCon);

// the-end-of-about-us



// language-courses

const languageCoursesTitle = document.querySelector('.language-courses-under-title');
flashIsScrolled(languageCoursesTitle);

$('.language-courses-slide-con').slick({
  dots: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 300,
  arrows: false,
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

// the-end-of-language-courses



// main-comments

$('.main-comments-comment-main-con').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 300,
});

// the-end-of-main-comments