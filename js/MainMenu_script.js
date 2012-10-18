$("div#Main_Menu a").click(function () {

//    alert($('body').scrollTop());
    if($(window).scrollTop() == 0 ){
        $('html, body').animate({
            'scrollTop':0
        }, 1, function () {

            $("div#footer").css("opacity", "0");

            var currentId = $(selectId).parent().attr("id");
//        alert(currentId);
            var currentContentId = "div#" + currentId + "_content";

            $("div.content").attr("class", "content hideclass");

            $(currentContentId).removeClass("hideclass");
            $(currentContentId).addClass("displayclass");
            $(currentContentId).css("opacity", "0");
            $(currentContentId).animate({
                opacity:1
            }, 400, function () {
            });

            $("div#footer").animate({
                opacity:1
            }, 400, function () {
            });

        });
    }else{
        $('html, body').animate({
            'scrollTop':0
        }, 500, function () {

            $("div#footer").css("opacity", "0");

            var currentId = $(selectId).parent().attr("id");
//        alert(currentId);
            var currentContentId = "div#" + currentId + "_content";

            $("div.content").attr("class", "content hideclass");

            $(currentContentId).removeClass("hideclass");
            $(currentContentId).addClass("displayclass");
            $(currentContentId).css("opacity", "0");
            $(currentContentId).animate({
                opacity:1
            }, 400, function () {
            });

            $("div#footer").animate({
                opacity:1
            }, 400, function () {
            });

        });

    }



    var selectId = this;
    $("div#Main_Menu a").filter(".selected").removeClass("selected");
    $(this).addClass("selected");


//    alert($(this).parent().attr("id"));
    if ($(this).parent().attr("id") == "work") {
        $("ul.display").attr("class", "sub_sub_menu displayNone");

        var subYearListStr = "#subYearList";

        $(subYearListStr).removeClass("displayNone");
        $(subYearListStr).addClass("display");

        var subSelectElement = $('ul#sub_menu a').filter(".selected");
        subSelectElement.removeClass("selected");

        $('ul#sub_menu a:first').addClass("selected");

        var subsubSelectElement = $('ul.sub_sub_menu a').filter(".selected");
        subsubSelectElement.removeClass("selected");

        $(subYearListStr + " a:first").addClass("selected");

        $("#workDetail").css("height", "0");

        //initializing


    } else {
        $workcontainer.isotope({ filter:"*" });
    }

    return false;
});
