$(document).ready(function () {
    const counter = $('.counter');
    counter.each(function() {
        let total = 0;
        $(this).find('.counter__btn:first').click(function() {
            if (total > 0)
                $(this).find('+ .counter__total').text(--total);
        });
        $(this).find('.counter__btn:last').click(function() {
            $(this).parent().find('.counter__total').text(++total);
        });
    });
});