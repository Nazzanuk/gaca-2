app.run(function () {
    $('body').addClass('active');

    $("img").on('error', function () {
        $(this).hide();
        // or $(this).css({visibility:"hidden"});
    });
});