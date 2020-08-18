/* -----------------------------------------------
					Js Main
--------------------------------------------------

    Template Name: Baha - Personal Portfolio Template
    Author: Malyarchuk
    Copyright: 2019

--------------------------------------------------
Table des matières

1. préchargement
2. Début sonore
3. Configuration du portefeuille d'isotopes
4. Configuration de la maçonnerie des blogs
6. Lien actuel actif
7. Mobile Toggle Click Setup
8. Témoignages OwlCarousel
9. Configuration de la carte
10. Configuration de l'inclinaison du portefeuille
11. Lien de l'image du portfolio
12. Lien vidéo du portfolio
13. Lien vidéo blog
14. Valider le formulaire de contact

----------------------------------- */

$(window).on('load', function () {

	/* -----------------------------------
				1. Preloader
	----------------------------------- */
    $("#preloader").delay(10).addClass('loaded');

	/* -----------------------------------
			  2. Sound Setup
	----------------------------------- */
    $('body').append('<audio loop volume="0" id="audio-player"><source src="Jazz-Brunch.mp3" type="audio/mpeg"></audio>');
    var audio = document.getElementById("audio-player");
    audio.volume = 0.4;

    if ($(window).length) {
        $('.music-bg').css({ 'visibility': 'visible' });
        $('body').addClass("audio-off");
        if ($('body').hasClass('audio-on')) {
            $('body').removeClass('audio-on');
        }
        $(".music-bg").on('click', function () {
            $('body').toggleClass("audio-on audio-off");
            if ($('body').hasClass('audio-off')) {
                audio.pause();
            }
            if ($('body').hasClass('audio-on')) {
                audio.play();
            }
        });
    }

	/* -----------------------------------
			3. Isotope Portfolio Setup
	----------------------------------- */
    if ($('.portfolio-items').length) {
        var $elements = $(".portfolio-items"),
            $filters = $('.portfolio-filter ul li');
        $elements.isotope();

        $filters.on('click', function () {
            $filters.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).data('filter');
            $(".portfolio-items").isotope({
                filter: selector,
                hiddenStyle: {
                    transform: 'scale(.2) skew(30deg)',
                    opacity: 0
                },
                visibleStyle: {
                    transform: 'scale(1) skew(0deg)',
                    opacity: 1,
                },
                transitionDuration: '.5s'
            });
        });
    }

	/* -----------------------------------
			4. Blogs Masonry Setup
	----------------------------------- */
    $('.blog-masonry').isotope({ layoutMode: 'moduloColumns' });

});

$(document).ready(function () {
    "use strict";

	/* -----------------------------------
			6. Active Current Link
	----------------------------------- */
    $('.header-main ul li a').on('click', function () {
        if ($('.header-main.on').length) {
            $('.header-main').removeClass('on');
        }
    });

	/* -----------------------------------
		7. Mobile Toggle Click Setup
	----------------------------------- */
    $('.header-toggle').on('click', function () {
        $('.header-main').toggleClass('on');
    });

	/* -----------------------------------
	      8. Testimonials OwlCarousel
	----------------------------------- */
    $(".testimonial .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
            },
            800: {
                items: 1,
            },
            1000: {
                items: 2,
            },
        },
    });


	/* -----------------------------------
	      	10. Portfolio Tilt Setup
	----------------------------------- */
    $('.pt-portfolio .portfolio-items .item figure').tilt({
        maxTilt: 3,
        glare: true,
        maxGlare: .6,
        reverse: true
    });

	/* -----------------------------------
	      11. Portfolio Image Link
	----------------------------------- */
    $(".portfolio-items .image-link").magnificPopup({
        type: "image"
    });

	/* -----------------------------------
	      12. Portfolio Video Link
	----------------------------------- */
    $(".portfolio-items .video-link").magnificPopup({
        type: "iframe"
    });

	/* -----------------------------------
	      13. Blog Video Link
	----------------------------------- */
    $(".pt-blog .blog-item .thumbnail .btn-play").magnificPopup({
        type: "iframe"
    });

	/* -----------------------------------
	    14. Validate Contact Form
	----------------------------------- */
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

            },

            messages: {
                name: "S'il vous plaît entrez votre nom",
                email: "S'il vous plaît entrer votre adresse email"
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $("#loader").hide();
                        $("#success").slideDown("slow");
                        setTimeout(function () {
                            $("#success").slideUp("slow");
                        }, 3000);
                        form.reset();
                    },
                    error: function () {
                        $("#loader").hide();
                        $("#error").slideDown("slow");
                        setTimeout(function () {
                            $("#error").slideUp("slow");
                        }, 3000);
                    }
                });
                return false;
            }

        });
    }

});
