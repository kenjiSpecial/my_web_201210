/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 10/7/12
 * Time: 3:34 PM
 * To change this template use File | Settings | File Templates.
 */
if($.browser.msie){
    window.onload = function(){
        $("body").html("<div><img src='img/skull.gif' ></div><div>Sorry, my web site does not support Internet Explorer. I recommend you to check my site with <a href='https://www.google.com/intl/en/chrome/browser/'>chrome browser</a></div>");
        $("body").css({'background-color' : '#000', 'color' : '#ffffff'});
    }
}else{
    window.onload = main;
}



var maru_movement_check = true;

function main() {
    //setting variable

    var window_Wd = window.innerWidth;
    var window_Hg = window.innerHeight;


    var Num = 42;

    //array for contex1(upperweave)
    var cnx01_prevH = new Array(Num);
    var cnx01_cur1H = new Array(Num);
    var cnx01_cur2H = new Array(Num);

    //array for context2(middleweave)
    var cnx02_prevH = new Array(Num);
    var cnx02_cur1H = new Array(Num);
    var cnx02_cur2H = new Array(Num);

    //about maru movemnt

    var wave_movement_fin_check = true; // finish the wave movement
    var stage_move_check = true; //stage move to main to the next stage

    //setting css
    //setting css of div "Name"
    var HeaderDiv = $("div#headerId");

    var Header_posY = window_Hg / 3;
    var EndHeader_posY = Header_posY + $("div#headerId").height();

    var Header_posYStr = Header_posY.toString() + "px";
    HeaderDiv.css('top', Header_posYStr);


    //-----------------------------------------------------
    //setting canvas

    var canvas1 = document.getElementById("weave01");
    canvas1.width = window_Wd;
    canvas1.height = window_Hg;

    var canvas2 = document.getElementById("weave02");
    canvas2.width = window_Wd;
    canvas2.height = window_Hg;


    var canvasCircle = document.getElementById("drawingCircle");
    canvasCircle.width = window_Wd;
    canvasCircle.height = window_Hg;


    var context1 = canvas1.getContext("2d");
    var context2 = canvas2.getContext("2d");

    var contextCircle = canvasCircle.getContext("2d");

    //setting variable


    var maru = new Circle(window_Wd * Math.random(), -500, 0, 1000, 10);


    //setting weave
    for (var i = 0; i < Num; i++) {
        cnx01_prevH[i] = 0;
        cnx02_prevH[i] = 0;
    }

    //calculate
    for (var i = 1; i < Num - 1; i++) {
        cnx01_cur1H[i] = cnx01_prevH[i] + 0.5 * (cnx01_prevH[i + 1] + cnx01_prevH[i - 1] - 2 * cnx01_prevH[i]);
        cnx02_cur1H[i] = cnx02_prevH[i] + 0.5 * (cnx02_prevH[i + 1] + cnx02_prevH[i - 1] - 2 * cnx02_prevH[i]);
    }

    cnx01_cur1H[0] = cnx01_cur1H[1];
    cnx01_cur1H[Num - 1] = cnx01_cur1H[Num - 2];

    cnx02_cur1H[0] = cnx02_cur1H[1];
    cnx02_cur1H[Num - 1] = cnx02_cur1H[Num - 2];

    //--------------------------------


    //setting var
    var masatsu01 = 0.93;
    var masatsu02 = 0.94;


    var curTime;
    var prevTime = (new Date()).getTime();


    var gapW = window_Wd / (Num - 3);

    var cnx1_centerPosY = (window_Hg / 3 - 10) | 0;
    var cnx2_centerPosY = EndHeader_posY + 60;

    var idOpen = $("div#Main_Menu")
    idOpen.removeClass("hideclass");
    idOpen.addClass("displayclass");


    $(HeaderDiv).css("opacity", "0");
    var idRoad = $("div#road");
    idRoad.animate({
        opacity:0
    }, 500, function () {
        idRoad.addClass("hideclass");

        setTimeout(function(){
            $(HeaderDiv).animate({
                opacity:1
            }, 1500);
        },500);

    });






    loopCanvas();


    function loopCanvas() {
        var i;

        curTime = (new Date()).getTime()
        var dt = (curTime - prevTime) / 1000;

        //calcuration maru position
        if (maru_movement_check) maru.update(dt, contextCircle);


        for (i = 1; i < Num - 1; i++) {
            cnx01_cur2H[i] = (2.0 * cnx01_cur1H[i] - cnx01_prevH[i] + (cnx01_cur1H[i + 1] + cnx01_cur1H[i - 1] - 2 * cnx01_cur1H[i]) ) * masatsu01;
            cnx02_cur2H[i] = (2.0 * cnx02_cur1H[i] - cnx02_prevH[i] + (cnx02_cur1H[i + 1] + cnx02_cur1H[i - 1] - 2 * cnx02_cur1H[i]) ) * masatsu02;
        }

        cnx01_cur2H[0] = cnx01_cur2H[1];
        cnx01_cur2H[Num - 1] = cnx01_cur2H[Num - 2];

        cnx02_cur2H[0] = cnx02_cur2H[1];
        cnx02_cur2H[Num - 1] = cnx02_cur2H[Num - 2];

        //----------------------------------
        //drawing context1


        context1.clearRect(0, 0, window_Wd, window_Hg);

        context1.beginPath();

        context1.moveTo(0, cnx1_centerPosY - cnx01_cur2H[1] * 10);
        for (i = 2; i < Num - 1; i++) {
            context1.lineTo(gapW * i, cnx1_centerPosY - cnx01_cur2H[i] * 10);
        }
        context1.lineTo(window_Wd, window_Hg);
        context1.lineTo(0, window_Hg);

        context1.fillStyle = "#333";

        context1.fill();
        context1.closePath();

        //----------------------------------

        //----------------------------------
        //drawing context2
        //convert function
        //        function wave_convertY(posY) {
        //        return About_posY - posY * 10;
        //      }

        context2.clearRect(0, 0, window_Wd, window_Hg);

        context2.beginPath();
        context2.moveTo(0, cnx2_centerPosY - cnx02_cur2H[0] * 10);

        //for sentence
        for (i = 2; i < Num - 1; i++) {
            context2.lineTo(gapW * i, cnx2_centerPosY - cnx02_cur2H[i] * 10);
        }

        context2.lineTo(window_Wd, window_Hg);
        context2.lineTo(0, window_Hg);
        context2.fillStyle = "#000";
        context2.fill();
        context2.closePath();


        //----------------------------------
        //----------------------------------

        //----------------------------------
        //drawing drawingCircle
        //
        //**
        //context name: contextCircle
        //**

        if (maru_movement_check) {
            maru.draw(contextCircle);
        } else {

            //after clicking
            //maru clear

            maru.clear(contextCircle);
            //----------------------------------

            //----------------------------------
            //upping the bottom of cnx3_centerPosY
            //*********************************

            if (cnx2_centerPosY > 2) {
                cnx2_centerPosY *= 0.95;
            } else {
                cnx2_centerPosY = 0;
            }

            if (Header_posY > cnx2_centerPosY + 60) {

                //setting css of div "HeaderDiv"
                HeaderDiv = $("div#headerId");
                Header_posY = cnx2_centerPosY + 60;

                Header_posYStr = Header_posY.toString() + "px";
                HeaderDiv.css("top", Header_posYStr);

            }

            if (wave_movement_fin_check && cnx2_centerPosY == 0) {
//                console.log("wave_movement_fin");

                wave_movement_fin_check = false;
                var divContainer = $("div#container");



//                $("body").css("background-color", "#000000")
//                $()
//                $("body").animate({background-color: #000000}, 1000);
//                $("body").animate({backgroundcolor: #000000}, 1000);
//                TODO add animatio background color from white to black



                setTimeout(function () {
//                    console.log("test2");
                    //**
                    //stop the loopcanvas method
                    //**

                    stage_move_check = false;

                    $("canvas").remove();
                    $("body").css("background-color", "#000000");

                    divContainer.removeClass("hideclass");
                    divContainer.addClass("displayclass");

                    divContainer.css("opacity", 0);
                    divContainer.animate()
                    $(divContainer).animate({
                        opacity:1
                    }, 1000, function () {
                    });


                }, 1000);

            }


        }

        //collision
        //-------------------------
        //collision test to weave01

        //current location maru.posy
        //


        if (maru.posy >= cnx1_centerPosY && maru.prevPosy <= cnx1_centerPosY) {

            var number01 = Math.round(maru.posx / gapW) + 1;

            var startPt01 = number01 - 2;
            if (startPt01 < 0) {
                startPt01 = 0;
            }

            var endPt01 = number01 + 2;
            if (endPt01 > Num) {
                endPt01 = Num
            }

            for (var i01 = startPt01; i01 < endPt01; i01++) {
                cnx01_cur2H[i01] = -20 * Math.cos((i01 - number01) / (endPt01 - startPt01) * Math.PI);
            }

        }

        if (maru.posy >= cnx2_centerPosY && maru.prevPosy <= cnx2_centerPosY) {
            var number02 = Math.round(maru.posx / gapW) + 1;

            var startPt02 = number02 - 2;
            if (startPt02 < 0) {
                startPt02 = 0;
            }

            var endPt02 = number02 + 2;
            if (endPt02 > Num) {
                endPt02 = Num
            }

            for (var i02 = startPt02; i02 < endPt02; i02++) {
                cnx02_cur2H[i02] = -30 * Math.cos((i02 - number02) / (endPt02 - startPt02) * Math.PI);
            }

        }


        //update for next loop


        for (var j = 0; j < Num; j++) {
            cnx01_prevH[j] = cnx01_cur1H[j];
            cnx01_cur1H[j] = cnx01_cur2H[j];

            cnx02_prevH[j] = cnx02_cur1H[j];
            cnx02_cur1H[j] = cnx02_cur2H[j];
        }


        //----------------------------------

        prevTime = curTime;

        if (maru.posy > window_Hg + maru.width) {
//            contextCircle.clearRect()
            //init
            maru.posx = window_Wd * Math.random();
            maru.posy = -2500;

        }

        if (stage_move_check) {
            requestAnimFrame(loopCanvas);
        }

    }


//    function wave_convertY(posY) {
//        return window_Hg * 1 / 3 - posY * 10;
//    }

    $(window).resize(function () {

        if (maru_movement_check) {
            window_Wd = window.innerWidth;
            window_Hg = window.innerHeight;

            HeaderDiv = $("div#headerId");

            Header_posY = window_Hg / 3;
            EndHeader_posY = Header_posY + $("div#headerId").height();

            Header_posYStr = Header_posY.toString() + "px";
            HeaderDiv.css('top', Header_posYStr);


            //canvas cal

            canvas1.width = window_Wd;
            canvas1.height = window_Hg;

            canvas2.width = window_Wd;
            canvas2.height = window_Hg;

            canvasCircle.width = window_Wd;
            canvasCircle.height = window_Hg;

            //gap cal
            gapW = window_Wd / (Num - 3);

            cnx1_centerPosY = window_Hg / 3;
            cnx2_centerPosY = EndHeader_posY + 30;
        }


    });

    $("div#Main_Menu").find("a").click(function () {

        //stop the motion of the maru movement
        if (maru_movement_check) {

            maru_movement_check = false;

            for (var i = Num / 2 - 5; i < Num / 2 + 5; i++) {
                cnx01_cur1H[i] = -20 * Math.cos((i - Num / 2) / 10 * Math.PI);
                cnx02_cur1H[i] = -30 * Math.cos((i - Num / 2) / 10 * Math.PI);
            }

        }

        return false;
    });


}


window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();