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


    $('.datepicker--nav-action[data-action="prev"]').each((index, item) => {
        $(item).html('qwe')
    });



    $('.date-picker > input').datepicker({
        language: 'ru',
        minDate: new Date(),
        navTitles: {days: "MM yyyy", months: "yyyy", years: "yyyy1 - yyyy2"},
        prevHtml: "<svg width='17' height='18' viewBox='0 0 17 18' fill='#BC9CFF' xmlns='http://www.w3.org/2000/svg'><path d='M16.1757 8.01562V9.98438H3.98819L9.56632 15.6094L8.16007 17.0156L0.144441 9L8.16007 0.984375L9.56632 2.39062L3.98819 8.01562H16.1757Z' fill='#BC9CFF'/></svg>",
        nextHtml: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 0.984375L17.0156 9L9 17.0156L7.59375 15.6094L13.1719 9.98438H0.984375V8.01562H13.1719L7.59375 2.39062L9 0.984375Z\" fill=\"url(#paint0_linear)\"/><defs><linearGradient id=\"paint0_linear\" x1=\"9\" y1=\"-13\" x2=\"9\" y2=\"31\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#BC9CFF\"/><stop offset=\"1\" stop-color=\"#8BA4F9\"/></linearGradient></defs></svg>"
    });

    $('.range-date-picker > .date-picker:first-child > input').datepicker({
        onSelect: function (fd, date) {
            $('.range-date-picker > .date-picker:last-child > input').datepicker({
                minDate: date
            });
        }
    });

    $('.range-date-picker > .date-picker:last-child > input').datepicker({
        onSelect: function (fd, date) {
            $('.range-date-picker > .date-picker:first-child > input').datepicker({maxDate: date});
        }
    });
});