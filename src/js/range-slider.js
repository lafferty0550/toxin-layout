$(document).ready(function () {
    const slider = $('.range-slider');
    const inputLeft = $(slider).find('#slider-left');
    const inputRight = $(slider).find('#slider-right');
    const thumbLeft = $(slider).find('.slider__thumb_left');
    const thumbRight = $(slider).find('.slider__thumb_right');
    const range = $(slider).find('.slider__range');
    const total = $(slider).find('.range-slider__total');

    const setValue = (isLeftThumb) => {
        const _this = isLeftThumb ? inputLeft : inputRight;
        const min = parseInt(_this.prop('min'));
        const max = parseInt(_this.prop('max'));
        if (isLeftThumb)
            _this.prop('value', Math.min(parseInt(_this.prop('value')), parseInt(inputRight.prop('value')) - 1));
        else
            _this.prop('value', Math.max(parseInt(_this.prop('value')), parseInt(inputLeft.prop('value'))));
        const percent = ((_this.prop('value') - min) / (max - min)) * 100;
        if (isLeftThumb) {
            thumbLeft.css('left', `${percent}%`);
            range.css('left', `${percent}%`);
            total.text(`${_this.prop('value')}₽ - ${inputRight.prop('value')}₽`);
        } else {
            thumbRight.css('right', `${100 - percent}%`);
            range.css('right', `${100 - percent}%`);
            total.text(`${inputLeft.prop('value')}₽ - ${_this.prop('value')}₽`);
        }
    }

    setValue();

    inputLeft.on('input change', () => setValue(true));
    inputRight.on('input change', () => setValue(false));
});