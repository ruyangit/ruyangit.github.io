
if (self.frameElement && self.frameElement.tagName == "IFRAME") {
    top.location.reload()
}
$(function () {
    'use strict'

    feather.replace();

    ////////// NAVBAR //////////

    // Initialize PerfectScrollbar of navbar menu for mobile only
    // if (window.matchMedia('(max-width: 991px)').matches) {
    //     const psNavbar = new PerfectScrollbar('#navbarMenu', {
    //         suppressScrollX: true
    //     });
    // }

    // Showing sub-menu of active menu on navbar when mobile
    // function showNavbarActiveSub() {
    //     if (window.matchMedia('(max-width: 991px)').matches) {
    //         $('#navbarMenu .active').addClass('show');
    //     } else {
    //         $('#navbarMenu .active').removeClass('show');
    //     }
    // }

    // showNavbarActiveSub()
    // $(window).resize(function () {
    //     showNavbarActiveSub()
    // })

    // Initialize backdrop for overlay purpose
    //$('body').append('<div class="backdrop"></div>');


    // Showing sub menu of navbar menu while hiding other siblings
    $('.navbar-menu .with-sub .nav-link').on('click', function (e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).parent().siblings().removeClass('show');

        if (window.matchMedia('(max-width: 991px)').matches) {
            psNavbar.update();
        }
    })

    // Closing dropdown menu of navbar menu
    $(document).on('click touchstart', function (e) {
        e.stopPropagation();

        // closing nav sub menu of header when clicking outside of it
        if (window.matchMedia('(min-width: 992px)').matches) {
            var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
            if (!navTarg) {
                $('.navbar-header .show').removeClass('show');
            }
        }
    })

    $('#mainMenuClose').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('navbar-nav-show');
    });

    $('#sidebarMenuOpen').on('click', function (e) {
        e.preventDefault();
        $('body').addClass('sidebar-show');
    })

    // Navbar Search
    // $('#navbarSearch').on('click', function (e) {
    //     e.preventDefault();
    //     $('.navbar-search').addClass('visible');
    //     $('.backdrop').addClass('show');
    // })

    // $('#navbarSearchClose').on('click', function (e) {
    //     e.preventDefault();
    //     $('.navbar-search').removeClass('visible');
    //    $('.backdrop').removeClass('show');
    // })



    ////////// SIDEBAR //////////

    // Initialize PerfectScrollbar for sidebar menu
    if ($('#sidebarMenu').length) {
        const psSidebar = new PerfectScrollbar('#sidebarMenu', {
            suppressScrollX: true
        });


        // Showing sub menu in sidebar
        $('.sidebar-nav .with-sub').on('click', function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');

            psSidebar.update();
        })
    }


    $('#mainMenuOpen').on('click touchstart', function (e) {
        e.preventDefault();
        $('body').addClass('navbar-nav-show');
    })

    $('#sidebarMenuClose').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('sidebar-show');
    })

    // hide sidebar when clicking outside of it
    $(document).on('click touchstart', function (e) {
        e.stopPropagation();

        // closing of sidebar menu when clicking outside of it
        if (!$(e.target).closest('.burger-menu').length) {
            var sb = $(e.target).closest('.sidebar').length;
            var nb = $(e.target).closest('.navbar-menu-wrapper').length;
            if (!sb && !nb) {
                if ($('body').hasClass('navbar-nav-show')) {
                    $('body').removeClass('navbar-nav-show');
                } else {
                    $('body').removeClass('sidebar-show');
                }
            }
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

});

$(function () {

    'use strict'

    const asideBody = new PerfectScrollbar('.aside-body', {
        suppressScrollX: true
    });

    if ($('.aside-backdrop').length === 0) {
        $('body').append('<div class="aside-backdrop"></div>');
    }

    var mql = window.matchMedia('(min-width:992px) and (max-width: 1199px)');

    function doMinimize(e) {
        if (e.matches) {
            $('.aside').addClass('minimize');
        } else {
            $('.aside').removeClass('minimize');
        }

        asideBody.update()
    }

    mql.addListener(doMinimize);
    doMinimize(mql);

    $('.aside-menu-link').on('click', function (e) {
        e.preventDefault()

        if (window.matchMedia('(min-width: 992px)').matches) {
            $(this).closest('.aside').toggleClass('minimize');
        } else {

            $('body').toggleClass('show-aside');
        }

        $(window).resize();
        asideBody.update();

    })

    $('.nav-aside .with-sub').on('click', '.nav-link', function (e) {
        e.preventDefault();

        $(this).parent().siblings().removeClass('show');
        $(this).parent().toggleClass('show');

        asideBody.update()
    })

    $('body').on('mouseenter', '.minimize .aside-body', function (e) {
        
        $(this).parent().addClass('maximize');
    })

    $('body').on('mouseleave', '.minimize .aside-body', function (e) {
        $(this).parent().removeClass('maximize');

        asideBody.update()
    })

    $('body').on('click', '.aside-backdrop', function (e) {
        $('body').removeClass('show-aside');
    })
});

$(function () {
    js.initTabPage("tabpanel", {
        height: function () {
            var g = $(window).height()
                // , e = $(".main-header:visible").outerHeight()
                // , f = $(".main-footer:visible").outerHeight()
                , e = 50
                , f = 0
                , d = g - e - f;
            return d < 300 ? 300 : d
        }
    });
    $(window).resize();
    // var b = $("#desktopTabPage");
    // if (b.length > 0) {
    //     var a = b.data("url");
    //     if (a != "" && a != ctx) {
    //js.addTabPage(null, '我的首页', 'demo.html', false, false)
    js.addTabPage(null, '测试用例', 'demo2.html', true, false)
    //     }
    // }
    // var c = $("#modifyPasswordTip");
    // if (c.length > 0 && c.data("message") != "") {
    //     js.confirm(c.data("message"), function () {
    //         $("#modifyPassword").click()
    //     })
    // }
    window.isMenuClickFlag = false;
    $(window).bind("hashchange", function (h) {
        if (!window.isMenuClickFlag) {
            var g = window.location.hash.replace("#", "");
            if (g && g != "" && g != window.location.pathname) {
                var f = $('a.addTabPage[data-href="' + g + '"]:eq(0)');
                if (f && f.length > 0) {
                    f.click()
                } else {
                    if ($(".sidebar-menu").length > 0) {
                        js.addTabPage(null, js.text("tabpanel.newTabPage"), g)
                    }
                }
            } else {
                var d = $(".sidebar-menu > li:eq(0):not(.active) > a:eq(0)");
                if (d.data("href") == "blank") {
                    d.click()
                }
            }
        }
        window.isMenuClickFlag = false
    }).trigger("hashchange");
    // $("#fullScreen").click(function () {
    //     if ($(this).data("isOpen") == "true") {
    //         $(this).data("isOpen", "false");
    //         if (document.exitFullscreen) {
    //             document.exitFullscreen()
    //         } else {
    //             if (document.msExitFullscreen) {
    //                 document.msExitFullscreen()
    //             } else {
    //                 if (document.mozCancelFullScreen) {
    //                     document.mozCancelFullScreen()
    //                 } else {
    //                     if (document.webkitCancelFullScreen) {
    //                         document.webkitCancelFullScreen()
    //                     }
    //                 }
    //             }
    //         }
    //     } else {
    //         $(this).data("isOpen", "true");
    //         var d = document.documentElement;
    //         if (d.requestFullscreen) {
    //             d.requestFullscreen()
    //         } else {
    //             if (d.msRequestFullscreen) {
    //                 d.msRequestFullscreen()
    //             } else {
    //                 if (d.mozRequestFullScreen) {
    //                     d.mozRequestFullScreen()
    //                 } else {
    //                     if (d.webkitRequestFullScreen) {
    //                         d.webkitRequestFullScreen()
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return false
    // });
    // $("#switchSkin").click(function () {
    //     js.layer.open({
    //         type: 2,
    //         shadeClose: true,
    //         title: $(this).attr("title"),
    //         area: ["500px", "390px"],
    //         content: ctx + "/switchSkin/select",
    //         success: function (d, e) {
    //             if ($(js.layer.window).width() < 500 || $(js.layer.window).height() < 390) {
    //                 js.layer.full(e)
    //             }
    //         },
    //     })
    // })
});
