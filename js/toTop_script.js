$("div#footer a").click(function(){
//    alert("test")
//    alert($(window).scrollTop(0));

    $('html, body').animate({
        'scrollTop': 0
    }, 1000);

    return false;
});