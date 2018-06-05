//改变header背景颜色及按钮 logo等样式
function changeHeaderStyle() {
    //header 的变化
    var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (top != 0) {
        $('.header').css({ 'background-color': '#fff', 'border-bottom': '1px solid #0d4494' });
        if (!$('.header .logo').hasClass('logo_blue')) {
            $('.header .logo').removeClass('logo_white').addClass('logo_blue');
        }

        $('#header_content ul li a').removeClass('header_text_white').addClass('header_text_blue');

        //hover:前四个
        $('.header .item_btn a').hover(function() {
            if ($(this).hasClass('header_active')) {
                return;
            }
            $(this).css('background-color', '#0d4494').removeClass('header_text_blue');
        }, function() {
            if ($(this).hasClass('header_active')) {
                return;
            }
            $(this).css('background-color', 'transparent').addClass('header_text_blue');
        });

    } else {
        $('.header').css({ 'background-color': '#428bf1', 'border-bottom': 'none' });
        $('.header .logo').removeClass('logo_blue').addClass('logo_white');
        $('#header_content ul li a').removeClass('header_text_blue').addClass('header_text_white');

        //hover
        $('.header .item_btn a').hover(function() {
            if ($(this).hasClass('header_active')) {
                return;
            }
            $(this).css('background-color', '#0d4494');
        }, function() {
            if ($(this).hasClass('header_active')) {
                return;
            }
            $(this).css('background-color', 'transparent');
        });
    }
}