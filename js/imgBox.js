/**
 * Created on 11.06.2015.
 */
"use strict";
$(document).ready(function () {
    (function ($) {
        $.fn.imgBox = function (method) {
            var methods = {
                init: function (arg) {
                    if (this.length < 1) return false;
                    else $('body').addClass('newSlide');
                    var this_ = $(this),
                        arrey_img = this_.find('img'),
                        img = $('<img class="slide_img">'),
                        img_index = 0,
                        id = arg != undefined ? arg['id'] : null,
                        div_conteyner = $('<div>')
                            .addClass('OverSlideConteyner')
                            .attr({
                                'id': id,
                                'data': this_.attr('class')
                            }).append('<div class="bg_close"></div>'),
                        imgConteyner = $('<div class="imgConteynerSlide">'),
                        slideButton = $('<button>');
                    arrey_img.each(function () {
                        var src = $(this).addClass('clickablImg').attr({
                            'data': this_.attr('class'),
                            'data-index': img_index
                        }).attr('src');
                        img.clone().attr({
                            'src': src,
                            'data-index': img_index++
                        }).appendTo(imgConteyner);
                    });
                    slideButton.clone().addClass('buttons left_btn_sl').appendTo(imgConteyner);
                    slideButton.clone().addClass('buttons right_btn_sl').appendTo(imgConteyner);
                    imgConteyner.appendTo(div_conteyner.appendTo('body'));
                },
                show: function (index) {
                    if (!$('body').hasClass('newSlide')) return false;
                    var conteyner = $('.OverSlideConteyner'),
                        viz_img_offset = conteyner.find('.slide_img.active'),
                        img_arrey = conteyner.find('.slide_img').length;
                    if (index) {
                        if (index < img_arrey + 1) {
                            conteyner.fadeIn();
                            viz_img_offset.removeClass('active').fadeOut();
                            $('.imgConteynerSlide img[data-index = ' + --index + ']').addClass('active').fadeIn();
                            methods['btn_resize']();
                        }
                    } else {
                        conteyner.fadeIn();
                        $('.slide_img.active').removeClass('active').fadeOut();
                        $('.imgConteynerSlide img').first().addClass('active').fadeIn();
                        methods['btn_resize']();
                    }
                },
                btn_resize: function () {
                    var btn = $('.OverSlideConteyner .buttons'),
                        active = $('.slide_img.active'),
                        imgLenght = $('.slide_img').length,
                        scroll = $(document).scrollTop(),
                        marginTop = active.offset().top - scroll + 'px';
                    if (imgLenght < 2) {
                        btn.fadeOut();
                        return false;
                    }
                    btn.css({'height': active.height() + 'px'});
                    btn.first().css({
                            'left': active.offset().left + 'px',
                            'top': marginTop,
                        }
                    ).fadeIn();
                    btn.last().css({
                        'left': active.offset().left + active.width() - btn.first().width() + 'px',
                        'top': marginTop
                    }).fadeIn();
                },
                hide: function () {
                    $('.OverSlideConteyner, .buttons,.slide_img.active ').fadeOut();
                }
                ,
                slide: function (btn) {
                    var imgActive = btn.parent().find('.slide_img.active'),
                        imgLenght = btn.parent().find('.slide_img'),
                        move_left = btn.hasClass('left_btn_sl');
                    if (imgLenght.length <= 1) return false;
                    $('.OverSlideConteyner .buttons').fadeOut();
                    if (move_left) {
                        moveLeft()
                    } else {
                        moveRight()
                    }
                    function moveRight() {
                        if (imgActive.attr('data-index') == imgLenght.last().attr('data-index')) {
                            imgActive.fadeOut(function () {
                                $(this).removeClass('active');
                                imgLenght.first().fadeIn().addClass('active');
                                methods['btn_resize']();
                            })
                        } else {
                            imgActive.fadeOut(function () {
                                $(this).removeClass('active');
                                imgActive.next().fadeIn().addClass('active');
                                methods['btn_resize']();
                            })
                        }
                    }

                    function moveLeft() {
                        if (imgActive.attr('data-index') == imgLenght.first().attr('data-index')) {
                            imgActive.fadeOut(function () {
                                $(this).removeClass('active');
                                imgLenght.last().fadeIn().addClass('active');
                                methods['btn_resize']();
                            });
                        } else {
                            imgActive.fadeOut(function () {
                                $(this).removeClass('active');
                                imgActive.prev().fadeIn().addClass('active');
                                methods['btn_resize']();
                            });
                        }
                    }
                }
            };
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method udefine ' + method + ' in jQuery.imgBox()');
            }
        };
        $(document).on({
            click: function () {
                $().imgBox('slide', $(this));
            }
        }, '.buttons');
        $(document).on({
            click: function () {
                var index = $(this).attr('data-index');
                $().imgBox('show', ++index);
            }
        }, '.clickablImg');
        $(document).on({
            click: function () {
                $().imgBox('hide');
            }
        }, '.bg_close');
    })
    (jQuery);
});
