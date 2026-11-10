$(document).ready(function () {
    // header scroll
    $(window).on('scroll load', function () {
        if ($(this).scrollTop() > 10) {
            $('.header').addClass('scroll');
        } else {
            $('.header').removeClass('scroll');
        }
    });

    // menu
    function closeMegaMenus() {
        $('.menu-item-has-children').removeClass('is-open').children('a').attr('aria-expanded', 'false');
    }

    $('.menu-item-has-children > a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $item = $(this).parent();
        var willOpen = !$item.hasClass('is-open');

        closeMegaMenus();

        if (willOpen) {
            $item.addClass('is-open');
            $(this).attr('aria-expanded', 'true');
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.menu-item-has-children').length) {
            closeMegaMenus();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMegaMenus();
        }
    });

    // tabs
    $('.tab-row').each(function () {
        var $row = $(this);
        var $tabs = $row.find('.category__tablist li');
        var $panels = $row.find('.tabcontent-item');

        if (!$tabs.length || !$panels.length) {
            return;
        }

        function setActive(index) {
            $tabs.removeClass('is-active').eq(index).addClass('is-active');
            $panels.removeClass('is-active').hide().eq(index).addClass('is-active').show();
        }

        setActive(0);

        $tabs.on('click', function () {
            setActive($(this).index());
        });
    });

    // Counter
    var $counter = $('.counter');

    function runCounters() {
        if (!$counter.length || $counter.data('counted')) {
            return;
        }

        $counter.data('counted', true);

        $counter.find('.num i').each(function () {
            var $num = $(this);
            var target = parseInt($num.text(), 10);

            if (isNaN(target)) {
                return;
            }

            $num.prop('Counter', 0).animate({
                Counter: target
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }

    if ($counter.length) {
        if ('IntersectionObserver' in window) {
            var counterObserver = new IntersectionObserver(function (entries, observer) {
                if (entries[0].isIntersecting) {
                    runCounters();
                    observer.disconnect();
                }
            }, { threshold: 0.35 });

            counterObserver.observe($counter[0]);
        } else {
            $(window).on('scroll load', function () {
                var rect = $counter[0].getBoundingClientRect();

                if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                    runCounters();
                }
            });
        }
    }

    // logos slides
    // function setupPartnersMarquee($track) {
    //     if ($track.data('marquee-init')) {
    //         return;
    //     }

    //     var $list = $track.children('.partners__list').first();

    //     if (!$list.length) {
    //         return;
    //     }

    //     var minWidth = $track.closest('.partners__marquee').outerWidth() || $(window).width();

    //     while ($list[0].scrollWidth < minWidth) {
    //         $list.children().each(function () {
    //             $list.append($(this).clone());
    //         });
    //     }

    //     $list.clone().attr('aria-hidden', 'true').appendTo($track);
    //     $track.data('marquee-init', true);
    // }

    // function whenMarqueeImagesReady($scope, callback) {
    //     var $imgs = $scope.find('img');

    //     if (!$imgs.length) {
    //         callback();
    //         return;
    //     }

    //     var pending = 0;

    //     $imgs.each(function () {
    //         if (this.complete && this.naturalWidth) {
    //             return;
    //         }

    //         pending++;
    //         $(this).one('load error', function () {
    //             pending--;

    //             if (pending === 0) {
    //                 callback();
    //             }
    //         });
    //     });

    //     if (pending === 0) {
    //         callback();
    //     }
    // }

    // $('.marquee__track').each(function () {
    //     var $track = $(this);

    //     whenMarqueeImagesReady($track, function () {
    //         setupPartnersMarquee($track);
    //     });
    // });


    // slider
    var swiper = new Swiper('.mySwiper-projects', {
        slidesPerView: 1.15,
        spaceBetween: 16,
        loop: true,
        speed: 700,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
        },
    });
    
    // to top
    $('.totop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // burger menu
    $('.burger-menu').on('click', function () {
        $('.mobnav').toggleClass('active');
    });

    $('.close-menu').on('click', function () {
        $('.mobnav').removeClass('active');
    });

    // категорії
    $('.category-sidebar__toggle').on('click', function () {
        var $sidebar = $(this).closest('.category-sidebar');
        var isOpen = !$sidebar.hasClass('is-open');

        $sidebar.toggleClass('is-open', isOpen);
        $(this).attr('aria-expanded', isOpen ? 'true' : 'false');
    });

    $('.category-sidebar__list a').on('click', function () {
        if (window.matchMedia('(max-width: 991.8px)').matches) {
            $(this).closest('.category-sidebar').removeClass('is-open')
                .find('.category-sidebar__toggle').attr('aria-expanded', 'false');
        }
    });

    // product slider
    var swiper = new Swiper('.product-hero__thumbs', {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        speed: 700,
        breakpoints: {
            575: {
                slidesPerView: 5,
                spaceBetween: 24,
            },
           
        },
    });
    var swiper2 = new Swiper('.product-hero__slider', {
        loop: true,
        spaceBetween: 10,
        speed: 700,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: swiper,
        },
    });

    var similarProductsSlider = document.querySelector('.similar-products__slider');
    if (similarProductsSlider) {
        new Swiper(similarProductsSlider, {
            slidesPerView: 1,
            spaceBetween: 16,
            speed: 700,
            watchOverflow: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },
        });
    }

    if (typeof GLightbox !== 'undefined' && document.querySelector('.glightbox')) {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
        });
    }

});
