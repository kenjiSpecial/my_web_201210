/*subMenuList click action*/
var workNum = $(".work").length;

$('#sub_menu a').click(function () {
    var selectElement = $('#sub_menu a').filter(".selected");
    selectElement.removeClass("selected");

    $(this).addClass("selected");

//    $("div.displayclass").attr("class", "hideclass subsublist");

    var currentId = $(this).parent().attr("id");

    var subMenuId = "ul#sub" + currentId;

    $("ul.display").attr("class", "sub_sub_menu displayNone");

    var selectElement = $('ul.sub_sub_menu a').filter(".selected");
    selectElement.removeClass("selected");

    $(subMenuId + " a:first").addClass("selected");

    $(subMenuId).removeClass("displayNone");
    $(subMenuId).addClass("display");
    $(subMenuId).css("opacity", "0.4");
    $(subMenuId).animate({
        opacity:1
    }, 300, function () {
    });

    $("#workDetail").animate({height:"0"}, 500, function() {
    });

    $workcontainer.isotope({ filter:"*" });


    return false;
});


var $workcontainer = $('#works');

/*subsubMenuList click action*/
$('ul.sub_sub_menu a').click(function () {
    var selector = $(this).attr('data-filter');

    var selectElement = $('ul.sub_sub_menu a').filter(".selected");
    selectElement.removeClass("selected");

    $(this).addClass("selected");

    $("#workDetail").animate({height:"0"}, 500, function() {
    });

    $workcontainer.isotope({ filter:selector });
    return false;
});

//isotop image loading
$workcontainer.imagesLoaded(function () {
    $workcontainer.isotope({
        itemSelector:'.work'
    });
});

$("div.work a").click(function () {
    var className = $(this).attr("id");

    $("#workDetailContent").html("<div class='clear'></div>");
    $("#workDetailContent").css({opacity: 0});
    $("#workDetailContent").animate({opacity: 1}, 500);

    $("#workDetail").animate({height:"480px"}, 400);
//    var height = $("#Main_Menu").position().top;

    $('body,html').animate({
        scrollTop:210
    }, 800);

//    var workId =

    var workid = $(this).attr("id")
//    alert(workid);
    $("#workDetailContent").attr("class", workid);

    $("#workDetailContent").prepend($(this).next().html());

    $("#workDetailContent a.workDelete").click(function () {
        $("#workDetail").animate({height:"0"}, 500, function() {
        });

        return false;
    });

    //work detail guide click action
    $("a#workbefore").click(function(){

        $("#workDetailContent").removeClass(className);

        var numName = parseInt(className.substring(4));
        var nexNum = (numName - 1 + workNum)%workNum;
        className = "work" + nexNum;

        $("#workDetailContent").html("<div class='clear'></div>");
        $("#workDetailContent").prepend($("a#"+className).next().html());

        $("#workDetailContent").css({opacity: 0});
        $("#workDetailContent").animate({opacity: 1}, 300);

        $("#workDetailContent a.workDelete").click(function () {
            $("#workDetail").animate({height:"0"}, 300, function() {
            });

            return false;
        });

        return false;
    });

    $("a#worknext").click(function(){
        $("#workDetailContent").removeClass(className);

        var numName = parseInt(className.substring(4));
        var nexNum = (numName + 1)%workNum;
        className = "work" + nexNum;

        $("#workDetailContent").html("<div class='clear'></div>");
        $("#workDetailContent").prepend($("a#"+className).next().html());

        $("#workDetailContent").css({opacity: 0});
        $("#workDetailContent").animate({opacity: 1}, 500);

        $("#workDetailContent a.workDelete").click(function () {
            $("#workDetail").animate({height:"0"}, 500, function() {
            });

            return false;
        });

        return false;
    });

    return false;
});
