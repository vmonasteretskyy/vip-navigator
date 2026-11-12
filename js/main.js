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

    function closeMobnav() {
        $('.mobnav').removeClass('active');
        $('.burger-menu').attr('aria-expanded', 'false').attr('aria-label', 'Відкрити меню');
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

        if (
            $('.mobnav').hasClass('active') &&
            window.matchMedia('(max-width: 1199.8px)').matches &&
            !$(e.target).closest('.mobnav').length &&
            !$(e.target).closest('header.header').length
        ) {
            closeMobnav();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMegaMenus();
            closeMobnav();
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
        var $mobnav = $('.mobnav');
        var isOpen = !$mobnav.hasClass('active');

        $mobnav.toggleClass('active', isOpen);
        $(this).attr('aria-expanded', isOpen ? 'true' : 'false');
        $(this).attr('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
    });

    $('.close-menu').on('click', function () {
        closeMobnav();
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

    // article table of contents
    var $articleToc = $('.article-toc');
    if ($articleToc.length) {
        var tocScrollOffset = 120;
        var tocReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var tocScrollDuration = tocReducedMotion ? 0 : 450;
        var usedTocIds = {};

        function getTocId($heading) {
            var existing = $heading.attr('id');
            if (existing) {
                usedTocIds[existing] = true;
                return existing;
            }

            var base =
                'toc-' +
                $heading
                    .text()
                    .trim()
                    .toLowerCase()
                    .replace(/[^\w\u0400-\u04FF-]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                    .slice(0, 72);

            if (!base || base === 'toc-') {
                base = 'toc-section';
            }

            var id = base;
            var index = 2;
            while (usedTocIds[id] || document.getElementById(id)) {
                id = base + '-' + index;
                index += 1;
            }

            usedTocIds[id] = true;
            $heading.attr('id', id);
            return id;
        }

        $articleToc.each(function () {
            var $toc = $(this);
            var $article = $toc.closest('article');
            var $content = $article.find('.entry-content').first();
            var $list = $toc.find('.article-toc__list');
            var $headings = $content.find('h2, h3');

            if (!$content.length || !$content.children().length) {
                $toc.closest('.col-lg-4').remove();
                return;
            }

            var introId = 'toc-intro';
            if (!$content.attr('id')) {
                $content.attr('id', introId);
            } else {
                introId = $content.attr('id');
            }
            usedTocIds[introId] = true;

            var introLabel = $toc.data('tocIntroLabel') || $toc.attr('data-toc-intro-label');
            if (introLabel) {
                $list.append(
                    $('<li/>', { class: 'article-toc__item' }).append(
                        $('<a/>', {
                            class: 'article-toc__link is-active',
                            href: '#' + introId,
                            text: introLabel,
                        })
                    )
                );
            }

            $headings.each(function () {
                var $heading = $(this);
                var id = getTocId($heading);
                var tag = $heading.prop('tagName').toLowerCase();
                var $item = $('<li/>', {
                    class: 'article-toc__item' + (tag === 'h3' ? ' article-toc__item--h3' : ''),
                });
                var $link = $('<a/>', {
                    class: 'article-toc__link',
                    href: '#' + id,
                    text: $heading.text().trim(),
                });

                $item.append($link);
                $list.append($item);
            });

            $toc.removeAttr('hidden');

            $toc.on('click', '.article-toc__link', function (e) {
                e.preventDefault();
                var hash = this.getAttribute('href');
                var $target = $(hash);
                if (!$target.length) {
                    return;
                }

                var top = $target.offset().top - tocScrollOffset;
                $('html, body').stop().animate({ scrollTop: top }, tocScrollDuration, function () {
                    if (history.replaceState) {
                        history.replaceState(null, '', hash);
                    } else {
                        window.location.hash = hash;
                    }
                });

                $toc.find('.article-toc__link').removeClass('is-active');
                $(this).addClass('is-active');
            });

            var $tocLinks = $toc.find('.article-toc__link');
            var headingElements = $headings.get();

            function setActiveTocFromScroll() {
                var scrollY = $(window).scrollTop() + tocScrollOffset + 8;

                $tocLinks.removeClass('is-active');

                var introLinkCount = introLabel ? 1 : 0;

                if (!headingElements.length) {
                    if (introLinkCount) {
                        $tocLinks.eq(0).addClass('is-active');
                    }
                    return;
                }

                var firstHeadingTop = $(headingElements[0]).offset().top;
                if (introLinkCount && scrollY < firstHeadingTop) {
                    $tocLinks.eq(0).addClass('is-active');
                    return;
                }

                var activeIndex = -1;
                for (var i = headingElements.length - 1; i >= 0; i -= 1) {
                    if ($(headingElements[i]).offset().top <= scrollY) {
                        activeIndex = i;
                        break;
                    }
                }

                if (activeIndex >= 0) {
                    $tocLinks.eq(activeIndex + introLinkCount).addClass('is-active');
                }
            }

            setActiveTocFromScroll();
            $(window).on('scroll.toc load.toc', setActiveTocFromScroll);
        });
    }

    // faq
    var $faqAnswers = $('.faq__answer');
    if ($faqAnswers.length) {
        var faqSlideMs = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;

        function closeFaqItem($item) {
            if (!$item.hasClass('is-open')) {
                return;
            }

            $item.find('.faq__answer').slideUp(faqSlideMs, function () {
                $(this).attr('hidden', 'hidden');
            });
            $item.removeClass('is-open');
            $item.find('.faq__summary').attr('aria-expanded', 'false');
        }

        $faqAnswers.hide().attr('hidden', 'hidden');
        $('.faq__item').removeClass('is-open');

        $('.faq__summary').on('click', function () {
            var $item = $(this).closest('.faq__item');
            var $answer = $item.find('.faq__answer');
            var isOpen = $item.hasClass('is-open');

            if (isOpen) {
                closeFaqItem($item);
            } else {
                $('.faq__item.is-open').each(function () {
                    closeFaqItem($(this));
                });
                $answer.removeAttr('hidden').hide().slideDown(faqSlideMs);
                $item.addClass('is-open');
                $(this).attr('aria-expanded', 'true');
            }
        });
    }

});
