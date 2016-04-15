"use strict";

app.run(function () {
    $('body').addClass('active');

    $('body').on('onerror', 'img', function () {
        console.log('img error')
        $(this).hide();
        // or $(this).css({visibility:"hidden"});
    });
});