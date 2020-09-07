$(document).ready(function () {
    $('.dropdown').each(function () {
        const dropdown = $(this);
        const select = dropdown.find('> .dropdown__select');
        const options = dropdown.find('> .dropdown__options');
        const acceptBtn = dropdown.find('.dropdown__accept');
        const declineBtn = dropdown.find('.dropdown__decline');

        const hideOptions = () => {
            options.removeClass('shown');
            select.removeClass('opened');
        };

        const toggleOptions = () => {
            options.toggleClass('shown');
            select.toggleClass('opened');
        };

        // on click hide or show options block
        select.click(toggleOptions);
        // on mouse leave out of options block hide it
        options.mouseleave(hideOptions);
        // on click on accept button render selected items
        acceptBtn.click(() => {
            let text = '';
            options.children('.dropdown__option').each(function () {
                const name = $(this).find('.dropdown__option-name').text();
                const count = Number($(this).find('.counter__total').text());
                if (count > 0)
                    text += `${text ? ' ' : ''}${name} ${count},`;
            });
            if (text.endsWith(','))
                text = text.slice(0, -1);
            select.find('.dropdown__label').text(text);
            hideOptions();
        });
        // on click on decline button hide options block
        declineBtn.click(hideOptions);
    });
});