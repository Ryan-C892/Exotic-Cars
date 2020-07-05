function FixNavbar() {
    var scrollTop = $(window).scrollTop();
    var menuOffset = $('.menu-container').offset().top;
    var navbar = $('.navbar-top');
    if (scrollTop > menuOffset) {
        navbar.addClass('navbar-fixed-top navbar-fixed-shadow');
    } else {
        navbar.removeClass('navbar-fixed-top navbar-fixed-shadow');
    }
}

$(function () {
    var fixedNavbar = $("nav.navbar.dynamic-fixed").length;
    if (fixedNavbar) {
        FixNavbar();
        $(window).scroll(function () {
            FixNavbar();
        });
    }

    if (!_IsMobile) {
        $("ul.nav li.dropdown").hover(function() {
            if ($("button.navbar-toggle").hasClass("collapsed")) {
                //$(this).find(".dropdown-menu").stop(true, true).show();
                $(this).addClass("open");
            }
        }, function() {
            if ($("button.navbar-toggle").hasClass("collapsed")) {
                //$(this).find(".dropdown-menu").stop(true, true).hide();
                $(this).removeClass("open");
            }
        });

        $("ul.nav li.dropdown a.menu-heading").click(function() {
            if ($("button.navbar-toggle").hasClass("collapsed")) {
                var a = $(this).parent().find(".dropdown-menu").find("a").first();
                var href = a.attr("href");
                window.location = href;
            }
        });
    }
