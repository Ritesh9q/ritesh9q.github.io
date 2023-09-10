$(function () {

    "use strict";

    //======menu fix js======
    if ($('.main_menu').offset() != undefined) {
        var navoff = $('.main_menu').offset().top;
        $(window).scroll(function () {
            var scrolling = $(this).scrollTop();

            if (scrolling > navoff) {
                $('.main_menu').addClass('menu_fix');
            } else {
                $('.main_menu').removeClass('menu_fix');
            }
        });
    }


    //=======MENU SEARCH======
    $(".menu_search").click(function () {
        $(".tf__search_form").addClass("show");
    });

    $(".close_search").click(function () {
        $(".tf__search_form").removeClass("show");
    });


    //=======BANNER SLIDER======
    $('.banner_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false,
    });


    //=======VENOBOS.JS======
    $('.venobox').venobox();


    //=======FUTURED SERVICE SLIDER======
    $('.futured_slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false,

        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    //=======TESTIMONIAL SLIDER======
    $('.testi_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false,

        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    //=======CURSOR POINTR JS======
    init_pointer({})


    //======GALLERY JS========= 
    var $grid = $('.grid').isotope({});

    $('.tf__gallery_filter').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });
    });

    //active class
    $('.tf__gallery_filter button').on("click", function (event) {

        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();

    });

    //=======GALLERY 2 JS========= 
    var $grid2 = $('.grid2').isotope({});

    $('.tf__gallery_filter_2').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid2.isotope({
            filter: filterValue
        });
    });

    //active class
    $('.tf__gallery_filter_2 button').on("click", function (event) {

        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
        event.preventDefault();

    });


    //======counter.js=========   
    $('.counter').countUp();


    //=======RELATED SERVICES SLIDER======
    $('.related_service_slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false,

        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    //*========STICKY SIDEBAR=======
    $("#sticky_sidebar").stickit({
        top: 100,
    })


    //====BARFILLER JS========
    $(document).ready(function () {
        $('#bar1').barfiller({ barColor: '#faa392' });
        $('#bar2').barfiller({ barColor: '#faa392' });
        $('#bar3').barfiller({ barColor: '#faa392' });
        $('#bar4').barfiller({ barColor: '#faa392' });
    });


    //=======COUNTDOWN======   
    var d = new Date(),
        countUpDate = new Date();
    d.setDate(d.getDate() + 365);

    // default example
    simplyCountdown('.simply-countdown-one', {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        enableUtc: true
    });


    //=====NICE SELECT=======
    $('#select_js').niceSelect();
    $('#select_js2').niceSelect();
    $('#select_js3').niceSelect();
    $('#select_js4').niceSelect();
    $('#select_js5').niceSelect();
    $('#select_js6').niceSelect();


    //=====DASHBOARD EDIT INFORMATION=======
    $(".info_edit_btn").on("click", function () {
        $(".tf_personal_area").addClass("edit_form");
    });

    $(".info_edit_cancel_btn").on("click", function () {
        $(".tf_personal_area").removeClass("edit_form");
    });


    //======SCROLL BUTTON=======
    $('.tf__scroll_btn').on('click', function () {
        $('html, body').animate({
            scrollTop: 0,
        }, 300);
    });

    $(window).on('scroll', function () {
        var scrolling = $(this).scrollTop();

        if (scrolling > 300) {
            $('.tf__scroll_btn').fadeIn();
        } else {
            $('.tf__scroll_btn').fadeOut();
        }
    });


    //=======FUTURED SERVICE 2 SLIDER======
    $('.futures_slider_2').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false,

        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    //==========WOW JS==========
    new WOW().init();

    $(".navbar-toggler").on("click", function () {
        $(".navbar-toggler").toggleClass("show_close");
    });

});