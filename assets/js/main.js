"use strict";

(function ($) {
  var office_base_js = {
    __init: function __init() {
      var self_obj = this;
      $(document).ready(this.initialize_ele); // $(window).load(this.onload_function);
      $(document).on('click', '.toggle__menu', this.on_click_menu);
      $(document).on('click', '.menu-item-has-children', this.on_click_mobile_submenu);
      /* ============= dropdown js start ==========*/
    },
    initialize_ele: function initialize_ele() {
        console.log("Ready");
        office_base_js.on_load_svg();
        office_base_js.on_load_aos();
        office_base_js.on_scroll_header();
        office_base_js.on_resize_submenu();
        office_base_js.on_load_swiper();
        office_base_js.accordion();
        office_base_js.model();
        office_base_js.typed_js();
    },
    on_load_svg: function on_load_svg(){
        jQuery('.in-svg').each(function (i, e) {
            var $img = jQuery(e);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');
                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', ' ' + imgClass + ' replaced-svg');
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');
                // Replace image with new SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    },
    on_load_aos: function on_load_aos(){
        $(function() {
            AOS.init({
                once: true,
            });
        });
    },
    on_scroll_header: function on_scroll_header(){
        // Header Fixed JS
        jQuery(window).scroll(function(){

            if (jQuery(this).scrollTop() > 60) {

            jQuery('.header__main').addClass('fixed');

            } else {

            jQuery('.header__main').removeClass('fixed');

            }
        });
    },
    on_click_menu: function on_click_menu(){
        // Menu Toggle JS
        jQuery(".toggle__menu").toggleClass("open");
        jQuery(".header__menu").toggleClass("active");
        jQuery("body").toggleClass("menu-open");
        //jQuery(".header__menu").slideToggle();
    },
    on_click_mobile_submenu: function on_click_mobile_submenu(){
        // Mobile View Submenu JS
        if ($(window).width() < 1200) {
            console.log('working');
            jQuery(this).children('a').attr('href', '#');
            
            jQuery(this).nextAll('li').removeClass('active');
            jQuery(this).prevAll('li').removeClass('active');

            jQuery(this).toggleClass('active');
        }
    },
    accordion: function accordion(){
        $(".accordion-group:not(:first-of-type) .accordion-content").css("display", "none");
        $(".accordion-group:first-of-type .js-accordion-title").addClass("open");
        
        $(".js-accordion-title").click(function () {
            $(".open").not(this).removeClass("open").next().slideUp(300);
            $(this).toggleClass("open").next().slideToggle(300);
        });
    },
    model: function model(){
        $(".open-modal").click(function() {
            $("body").addClass("popup-open");
        });
        $(".close__modal").click(function() {
            $("body").removeClass("popup-open");
        });
    },
    typed_js: function typed_js(){
        $(function() {
            var TxtType = function(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };
        
            TxtType.prototype.tick = function() {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];
        
                if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
        
                this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        
                var that = this;
                var delta = 200 - Math.random() * 100;
        
                if (this.isDeleting) { delta /= 2; }
        
                if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
                }
        
                setTimeout(function() {
                that.tick();
                }, delta);
            };
        
            window.onload = function() {
                var elements = document.getElementsByClassName('typewrite');
                for (var i=0; i<elements.length; i++) {
                    var toRotate = elements[i].getAttribute('data-type');
                    var period = elements[i].getAttribute('data-period');
                    if (toRotate) {
                      new TxtType(elements[i], JSON.parse(toRotate), period);
                    }
                }
                // INJECT CSS
                var css = document.createElement("style");
                css.type = "text/css";
                // css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
                document.body.appendChild(css);
            };
        });
    },
    on_resize_submenu: function on_resize_submenu(){
        if ($(window).width() < 1200) {
            $(".sub-menu").each(function() {
                 var num = $(this).find("li").length;
                 var liwnum = $(this).find("li").outerWidth();
                 var t = liwnum * num + 180;
                 $(this).css('width', t);
                 if($(this).width() >= 710){
                    $(this).css({"left": "-200%",'width': '710px'}); 
                 }else { 
                 }
             });
         }
         else {
             $(".sub-menu").each(function() {
                 var num = $(this).find("li").length;
                 var liwnum = $(this).find("li").outerWidth();
                 var t = liwnum * num + 180;
                 $(this).css('width', t);
                if($(this).width() > 750) {
                    $(this).css({"left": "-200%", 'width': '800px'}); 
                } 
            });
        }
    },
    on_load_swiper: function on_load_swiper(){
        // swiper bwc-silder
        if (jQuery('.bwc-silder').length > 0) {
            var swiper = new Swiper(".bwc-silder", {
                direction: "horizontal",
                autoplay: {
                delay: 5000
                },
                loop: true,
                slidesPerView: 6,
                slidesPerGroup: 6,
                effect: "fade",
                fadeEffect: {
                crossFade: true
                },
                // If we need pagination
                pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
                },
                // Navigation arrows
                navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
                }
            });
        }
        if (jQuery('.ec__business-slider').length > 0) {
            var swiper = new Swiper(".ec__business-slider", {
                direction: "horizontal",
                autoplay: {
                delay: 5000
                },
                loop: true,
                effect: "fade",
                fadeEffect: {
                crossFade: true
                },
                // If we need pagination
                pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
                },
                // Navigation arrows
                navigation: {
                nextEl: ".swiper-button-next-btn",
                prevEl: ".swiper-button-prev-btn"
                }
            });
        }
},

  };
  office_base_js.__init();
})(jQuery);