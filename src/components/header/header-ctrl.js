(function () {
    app.controller('HeaderCtrl', ['$scope', function ($scope) {

        var events = function () {
            $(document).on('focus', '.search-box input', function () {
                $('.search-box').css({'width': '150px'});
            });

            $(document).on('blur', '.search-box input', function () {
                $('.search-box').css({'width': ''});
            });

            $(document).on('mouseover', '.sub-item', function () {
                if (!$(this).hasClass('active')) {
                    $('.sub-item').removeClass('active');
                    $('.sub-menu').velocity('stop');
                    $('.sub-menu').hide();
                    $(this).addClass('active');
                    $(this).find('.sub-menu').velocity('stop').velocity('transition.slideDownIn', 300);
                    $(this).find('[class^="col-"]').velocity('stop').velocity('transition.slideLeftIn', {
                        stagger: 100,
                        duration: 600
                    });
                }
            });

            $(document).on('mouseleave', '.sub-item', function () {
                var that = this;
                if ($(this).hasClass('active')) {
                    $(that).removeClass('active');
                    $(this).find('.sub-menu').velocity('stop').velocity('transition.slideUpOut', {delay:500,duration:300});
                }
            });

            $(document).on('click', '.hide-alert', function () {
                $('.hide-alert').velocity('stop').hide();
            });
        };

        var init = function () {
            events();
        };

        init();

    }]);
}());
