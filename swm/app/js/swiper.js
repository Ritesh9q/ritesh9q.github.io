var swiper = new Swiper('.swiper-team-2', {
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },

    },

})


var swiper = new Swiper('.swiper-team-6', {
    spaceBetween: 30,
    loop: true,

    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 26,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 26,
        },
        1024: {
            slidesPerView: 6,
            spaceBetween: 26,
        },
        1300: {
            slidesPerView: 8,
            spaceBetween: 26,
        },
    },
    autoplay: {
        delay: 1,
    }, 
    speed: 2000,
    });
    $(".swiper-team").hover(function() {
        (this).swiper.autoplay.stop();
    }, function() {
        (this).swiper.autoplay.start();
})

var swiper = new Swiper('.swiper-team-7', {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },

    }

})


// var swiper = new Swiper(".swiper-about-1", {
//     direction: "vertical",
//     spaceBetween: 10,
//     grabCursor: true,
//     loop: true,
//     breakpoints: {
//         0: {
//             slidesPerView: 'auto'
//         },
//         991: {
//             slidesPerView: 1
//         },
//     },
//     shortSwipes: false,
//     longSwipes: false,
//     allowTouchMove: true,
//     autoplay: {
//     delay: 1, 
//     }, 
//     freeMode: true, 
//     speed: 2000,
//     disableOnInteraction: true
//     });
// $(".swiper-about-1").hover(function() {
//     (this).swiper.autoplay.stop();
// }, function() {
//     (this).swiper.autoplay.start();
// });

// var swiper = new Swiper(".swiper-about-2", {
//     direction: "vertical",
//     spaceBetween: 10,
//     grabCursor: true,
//     loop: true,
//     breakpoints: {
//         0: {
//             slidesPerView: 'auto'
//         },
//         991: {
//             slidesPerView: 1
//         },
//     },
//     shortSwipes: false,
//     longSwipes: false,
//     allowTouchMove: true,
//     autoplay: {
//     delay: 1, 
//     }, 
//     freeMode: true, 
//     speed: 2000,
//     disableOnInteraction: true
//     });
// $(".swiper-about-2").hover(function() {
//     (this).swiper.autoplay.stop();
// }, function() {
//     (this).swiper.autoplay.start();
// });

var swiper =  new Swiper(".swiper-partner", {
    slidesPerView:2,
    loop: false, 
    spaceBetween: 30,
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        400: {
            slidesPerView: 2,
            spaceBetween: 60,
        },
        600: {
            slidesPerView: 3,
            spaceBetween: 60,
        },
        750: {
            slidesPerView: 4,
            spaceBetween: 60,
        },
        991: {
            slidesPerView: 5,
            spaceBetween: 60,
        },
        1280: {
            slidesPerView: 6,
            spaceBetween: 60,
        },
    },
});

var swiper =  new Swiper(".swiper-partner-2", {
    slidesPerView:2,
    loop: false, 
    spaceBetween: 30,
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 30,
        },

        991: {
            slidesPerView: 4,
            spaceBetween: 30,
        },

    },
});

var swiper =  new Swiper(".swiper-partner-3", {
    slidesPerView:2,
    loop: false, 
    spaceBetween: 30,
    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        600: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 8,
            spaceBetween: 30,
        },
    },
});



var swiper = new Swiper('.banner-nft1', {
    loop: true,

    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 26,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 26,
        },
        1024: {
            slidesPerView: 6,
            spaceBetween: 0,
        },
        1300: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
    },
    // autoplay: {
    //     delay: 1,
    // }, 
    // speed: 2000,
    // });
    // $(".banner-nft").hover(function() {
    //     (this).swiper.autoplay.stop();
    // }, function() {
    //     (this).swiper.autoplay.start();
})

var swiper = new Swiper(".banner-nft", {
    loop:true,
    spaceBetween: 20,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
      autoplay: {
        delay: 1,
    }, 
    speed: 2000,
    coverflowEffect: {
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });



var swiper = new Swiper(".swiper-about-1", {
    loop:true,
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
        delay: 1,
    }, 
    speed: 2000,
    });
    $(".swiper-about-1").hover(function() {
        (this).swiper.autoplay.stop();
    }, function() {
        (this).swiper.autoplay.start();
});
var swiper = new Swiper(".swiper-about-2", {
    loop:true,
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 30,
    autoplay: {
        delay: 1,
        reverseDirection: true,
    }, 
    speed: 2000,
    });
    $(".swiper-about-2").hover(function() {
        (this).swiper.autoplay.stop();
    }, function() {
        (this).swiper.autoplay.start();
});

var swiper = new Swiper(".swiper-roadmap", {
    loop:true,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1300: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});

var swiper = new Swiper('.swiper-roadmap-7', {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 7,
            spaceBetween: 30,
        },

    }

})

var swiper = new Swiper('.swiper-roadmap-8', {
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 30,
        },

    }

})


var swiper = new Swiper(".swiper-blog", {
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },

    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });