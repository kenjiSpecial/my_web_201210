/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 10/7/12
 * Time: 3:34 PM
 * To change this template use File | Settings | File Templates.
 */
window.onload = main;



function main() {
    //setting variable



    var window_Wd = window.innerWidth;
    var window_Hg = window.innerHeight;

    var RoadDiv = $("div#road");
    var Road_posX = (window_Wd - RoadDiv.width())/2;
    var Road_posY = (window_Hg - RoadDiv.height())/2;

    var Road_posXStr = Road_posX.toString() + "px";
    var Road_posYStr = Road_posY.toString() + "px";
    RoadDiv.css({top: "200px", left: "100px"});

    var Num = 100;

    //array for contex1(upperweave)
    var cnx01_prevH = new Array(Num);
    var cnx01_cur1H = new Array(Num);
    var cnx01_cur2H = new Array(Num);

    //array for context2(middleweave)
    var cnx02_prevH = new Array(Num);
    var cnx02_cur1H = new Array(Num);
    var cnx02_cur2H = new Array(Num);

    //array for context3(lower weave)
    var cnx03_prevH = new Array(Num);
    var cnx03_cur1H = new Array(Num);
    var cnx03_cur2H = new Array(Num);

    //about maru movemnt
    var maru_movement_check = true;
    var wave_movement_fin_check = true; // finish the wave movement
    var stage_move_check = true; //stage move to main to the next stage


    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    //setting css
    //setting css of div "Name"
    var NameDiv = $("div#name");

    var Name_posX = (window_Wd - NameDiv.width()) / 2;
    var Name_posY = window_Hg / 3;

    var Name_posXStr = Name_posX.toString() + "px";
    var Name_posYStr = Name_posY.toString() + "px";
    NameDiv.css({top:Name_posYStr, left:Name_posXStr});

    //setting css of div "position"
    var PosDiv = $("div#position");

    var Pos_posX = (window_Wd - PosDiv.width()) / 2;
    var Pos_posY = Name_posY + NameDiv.height() + 10;

    var Pos_posXStr = Pos_posX.toString() + "px";
    var Pos_posYStr = Pos_posY.toString() + "px";
    PosDiv.css({top:Pos_posYStr, left:Pos_posXStr});

    //setting main:
    var AboutDiv = $("div#Main_about");

    var About_posX = (window_Wd - AboutDiv.width()) / 2;
    var About_posY = Pos_posY + PosDiv.height() + 30;

    var About_posXStr = About_posX.toString() + "px";
    var About_posYStr = About_posY.toString() + "px";
    AboutDiv.css({top:About_posYStr, left:About_posXStr});

    var workDiv = $("div#Main_work");

    var Work_posX = (window_Wd - workDiv.width()) / 2;
    var Work_posY = About_posY + AboutDiv.height() + 10;

    var Work_posXStr = Work_posX.toString() + "px";
    var Work_posYStr = Work_posY.toString() + "px";
    workDiv.css({top:Work_posYStr, left:Work_posXStr});

    var contactDiv = $("div#Main_contact");

    var Contact_posX = (window_Wd - contactDiv.width()) / 2;
    var Contact_posY = Work_posY + workDiv.height() + 8;

    var Contact_posXStr = Contact_posX.toString() + "px";
    var Contact_posYSt = Contact_posY.toString() + "px";
    contactDiv.css({top:Contact_posYSt, left:Contact_posXStr});



    //-----------------------------------------------------
    //setting canvas


    var canvas1 = document.getElementById("weave01");
    canvas1.width = window_Wd;
    canvas1.height = window_Hg;

    var canvas2 = document.getElementById("weave02");
    canvas2.width = window_Wd;
    canvas2.height = window_Hg;

    var canvas3 = document.getElementById("weave03");
    canvas3.width = window_Wd;
    canvas3.height = window_Hg;

    var canvasCircle = document.getElementById("drawingCircle");
    canvasCircle.width = window_Wd;
    canvasCircle.height = window_Hg;


    var context1 = canvas1.getContext("2d");
    var context2 = canvas2.getContext("2d");
    var context3 = canvas3.getContext("2d")

    this.contextCircle = canvasCircle.getContext("2d");

    //setting variable


    var maru = new Circle(window_Wd * Math.random(), -100, 0, 1000, 8);


    //setting weave
    for (var i = 0; i < Num; i++) {
        cnx01_prevH[i] = 0;
        cnx02_prevH[i] = 0;
        cnx03_prevH[i] = 0;
    }

    //calculate
    for (var i = 1; i < Num - 1; i++) {
        cnx01_cur1H[i] = cnx01_prevH[i] + 0.5 * (cnx01_prevH[i + 1] + cnx01_prevH[i - 1] - 2 * cnx01_prevH[i]);
        cnx02_cur1H[i] = cnx02_prevH[i] + 0.5 * (cnx02_prevH[i + 1] + cnx02_prevH[i - 1] - 2 * cnx02_prevH[i]);
        cnx03_cur1H[i] = cnx03_prevH[i] + 0.5 * (cnx03_prevH[i + 1] + cnx03_prevH[i - 1] - 2 * cnx03_prevH[i]);
    }

    cnx01_cur1H[0] = cnx01_cur1H[1];
    cnx01_cur1H[Num - 1] = cnx01_cur1H[Num - 2];

    cnx02_cur1H[0] = cnx02_cur1H[1];
    cnx02_cur1H[Num - 1] = cnx02_cur1H[Num - 2];

    cnx03_cur1H[0] = cnx03_cur1H[1];
    cnx03_cur1H[Num - 1] = cnx03_cur1H[Num - 2];

    //--------------------------------


    //setting var
    var masatsu01 = 0.92;
    var masatsu02 = 0.93;
    var masatsu03 = 0.94;



    var curTime;
    var prevTime = (new Date()).getTime();


    var gapW = window_Wd / (Num - 3);

    var cnx1_centerPosY = (window_Hg / 3 - 10)|0;
    var cnx2_centerPosY = (About_posY - 15)|0;
    var cnx3_centerPosY = (Contact_posY + contactDiv.height() + 15)|0;


    loopCanvas();


    function loopCanvas() {
        console.log("loopCanvas;");
        var i;

        curTime = (new Date()).getTime()
        var dt = (curTime - prevTime) / 1000;

        //calcuration maru position
        if(maru_movement_check) maru.update(dt, contextCircle);


        for (i = 1; i < Num - 1; i++) {
            cnx01_cur2H[i] = (2.0 * cnx01_cur1H[i] - cnx01_prevH[i] + (cnx01_cur1H[i + 1] + cnx01_cur1H[i - 1] - 2 * cnx01_cur1H[i]) ) * masatsu01;
            cnx02_cur2H[i] = (2.0 * cnx02_cur1H[i] - cnx02_prevH[i] + (cnx02_cur1H[i + 1] + cnx02_cur1H[i - 1] - 2 * cnx02_cur1H[i]) ) * masatsu02;
            cnx03_cur2H[i] = (2.0 * cnx03_cur1H[i] - cnx03_prevH[i] + (cnx03_cur1H[i + 1] + cnx03_cur1H[i - 1] - 2 * cnx03_cur1H[i]) ) * masatsu03;
        }

        cnx01_cur2H[0] = cnx01_cur2H[1];
        cnx01_cur2H[Num - 1] = cnx01_cur2H[Num - 2];

        cnx02_cur2H[0] = cnx02_cur2H[1];
        cnx02_cur2H[Num - 1] = cnx02_cur2H[Num - 2];

        cnx03_cur2H[0] = cnx03_cur2H[1];
        cnx03_cur2H[Num - 1] = cnx03_cur2H[Num - 2];


        //----------------------------------
        //drawing context1


        context1.clearRect(0, 0, window_Wd, window_Hg);

        context1.beginPath();

        context1.moveTo(0, cnx1_centerPosY - cnx01_cur2H[1] * 10);
        for (i = 2; i < Num - 1; i++) {
            context1.lineTo(gapW * i, cnx1_centerPosY - cnx01_cur2H[i] * 10);
        }
        context1.lineTo( window_Wd, window_Hg);
        context1.lineTo(0, window_Hg);

        context1.fillStyle = "#666";

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

        context2.lineTo( window_Wd, window_Hg);
        context2.lineTo(0, window_Hg);
        context2.fillStyle = "#333";
        context2.fill();
        context2.closePath();


        //----------------------------------

        //----------------------------------
        //drawing context2
        //convert function
        //        function wave_convertY(posY) {
        //        return About_posY - posY * 10;
        //      }

        context3.clearRect(0, 0, window_Wd, window_Hg);

        context3.beginPath();
        context3.moveTo(0, cnx3_centerPosY - cnx03_cur2H[0] * 10);

        //for sentence
        for (i = 2; i < Num - 1; i++) {
            context3.lineTo(gapW * i, cnx3_centerPosY - cnx03_cur2H[i] * 10);
        }

        context3.lineTo( window_Wd, window_Hg);
        context3.lineTo(0, window_Hg);
        context3.fillStyle = "#000000";
        context3.fill();
        context3.closePath();



        //----------------------------------

        //----------------------------------
        //drawing drawingCircle
        //
        //**
        //context name: contextCircle
        //**

        if(maru_movement_check) {
            maru.draw(contextCircle);
        }else{

            //after clicking
            //maru clear

            maru.clear(contextCircle);
            //----------------------------------

            //----------------------------------
            //upping the bottom of cnx3_centerPosY
            //*********************************

            if(cnx3_centerPosY > 2){
                cnx3_centerPosY *= 0.95;
            }else{
                cnx3_centerPosY = 0;
            }

            if(Name_posY > cnx3_centerPosY + 50){

                //setting css of div "Name"
                NameDiv = $("div#name");
                Name_posY = cnx3_centerPosY + 50;

                Name_posYStr = Name_posY.toString() + "px";
                NameDiv.css("top",Name_posYStr);

                //setting css of div "position"
                PosDiv = $("div#position");

                Pos_posY = Name_posY + NameDiv.height() + 10;

                Pos_posYStr = Pos_posY.toString() + "px";
                PosDiv.css("top",Pos_posYStr);
            }

            if(wave_movement_fin_check && cnx3_centerPosY == 0){
//                console.log("wave_movement_fin");

                wave_movement_fin_check = false;

                setTimeout(function(){
//                    console.log("test2");
                    //**
                    //stop the loopcanvas method
                    //**

                    stage_move_check = false;

                }, 3000);

            }




        }

        //collision
        //-------------------------
        //collision test to weave01

        //current location maru.posy
        //



        if (maru.posy >= cnx1_centerPosY  && maru.prevPosy  <= cnx1_centerPosY ) {

            var number01 = Math.round(maru.posx / gapW) + 1;

            var startPt01 = number01 - 5;
            if (startPt01 < 0) {
                startPt01 = 0;
            }

            var endPt01 = number01 + 5;
            if (endPt01 > Num) {
                endPt01 = Num
            }

            for (var i01 = startPt01; i01 < endPt01; i01++) {
                cnx01_cur2H[i01] = -10 * Math.cos((i01 - number01) / (endPt01 - startPt01) * Math.PI);
            }

        }

        if (maru.posy >= cnx2_centerPosY && maru.prevPosy  <= cnx2_centerPosY) {
            var number02 = Math.round(maru.posx / gapW) + 1;

            var startPt02 = number02 - 5;
            if (startPt02 < 0) {
                startPt02 = 0;
            }

            var endPt02 = number02 + 5;
            if (endPt02 > Num) {
                endPt02 = Num
            }

            for (var i02 = startPt02; i02 < endPt02; i02++) {
                cnx02_cur2H[i02] = -12 * Math.cos((i02 - number02) / (endPt02 - startPt02) * Math.PI);
            }

        }

        if (maru.posy  >= cnx3_centerPosY  && maru.prevPosy <= cnx3_centerPosY ) {
            var number03 = Math.round(maru.posx / gapW) + 1;
//            console.log("number03: " + number03);

            var startPt03 = number03 - 5;
            if (startPt03 < 0) {
                startPt03 = 0;
            }

            var endPt03 = number03 + 5;
            if (endPt03 > Num) {
                endPt03 = Num
            }

            for (var i03 = startPt03; i03 < endPt03; i03++) {
                cnx03_cur2H[i03] = -15 * Math.cos((i03 - number03) / (endPt03 - startPt03) * Math.PI);
            }

        }

        //update for next loop


        for (var j = 0; j < Num; j++) {
            cnx01_prevH[j] = cnx01_cur1H[j];
            cnx01_cur1H[j] = cnx01_cur2H[j];

            cnx02_prevH[j] = cnx02_cur1H[j];
            cnx02_cur1H[j] = cnx02_cur2H[j];

            cnx03_prevH[j] = cnx03_cur1H[j];
            cnx03_cur1H[j] = cnx03_cur2H[j];
        }


        //----------------------------------

        prevTime = curTime;

        stats.update();

        if(maru.posy > window_Hg + maru.width){
//            contextCircle.clearRect()
            //init
            maru.posx = window_Wd * Math.random();
            maru.posy = -2500;

        }

        if(stage_move_check){
            requestAnimFrame(loopCanvas);
        }

    }


//    function wave_convertY(posY) {
//        return window_Hg * 1 / 3 - posY * 10;
//    }

    $(window).resize(function () {
        window_Wd = window.innerWidth;
        window_Hg = window.innerHeight;

        NameDiv = $("div#name");

        Name_posX = (window_Wd - NameDiv.width()) / 2;
        Name_posY = window_Hg / 3;

        Name_posXStr = Name_posX.toString() + "px";
        Name_posYStr = Name_posY.toString() + "px";
        NameDiv.css({top:Name_posYStr, left:Name_posXStr});

        //setting css of div "position"
        PosDiv = $("div#position");

        Pos_posX = (window_Wd - PosDiv.width()) / 2;
        Pos_posY = Name_posY + NameDiv.height() + 10;

        Pos_posXStr = Pos_posX.toString() + "px";
        Pos_posYStr = Pos_posY.toString() + "px";
        PosDiv.css({top:Pos_posYStr, left:Pos_posXStr});

        //setting main:
        AboutDiv = $("div#Main_about");

        About_posX = (window_Wd - AboutDiv.width()) / 2;
        About_posY = Pos_posY + PosDiv.height() + 30;

        About_posXStr = About_posX.toString() + "px";
        About_posYStr = About_posY.toString() + "px";
        AboutDiv.css({top:About_posYStr, left:About_posXStr});

        workDiv = $("div#Main_work");

        Work_posX = (window_Wd - workDiv.width()) / 2;
        Work_posY = About_posY + AboutDiv.height() + 10;

        Work_posXStr = Work_posX.toString() + "px";
        Work_posYStr = Work_posY.toString() + "px";
        workDiv.css({top:Work_posYStr, left:Work_posXStr});

        contactDiv = $("div#Main_contact");

        Contact_posX = (window_Wd - contactDiv.width()) / 2;
        Contact_posY = Work_posY + workDiv.height() + 8;

        Contact_posXStr = Contact_posX.toString() + "px";
        Contact_posYSt = Contact_posY.toString() + "px";
        contactDiv.css({top:Contact_posYSt, left:Contact_posXStr});

        //canvas cal

        canvas1.width = window_Wd;
        canvas1.height = window_Hg;

        canvas2.width = window_Wd;
        canvas2.height = window_Hg;

        canvas3.width = window_Wd;
        canvas3.height = window_Hg;

        canvasCircle.width = window_Wd;
        canvasCircle.height = window_Hg;

        //gap cal
        gapW = window_Wd / (Num - 3);

        cnx1_centerPosY = window_Hg / 3 - 10;
        cnx2_centerPosY = About_posY - 15
        cnx3_centerPosY = Contact_posY + contactDiv.height() + 15;

    });

    //click action

    $('a[href=#Main_about]').click(function(){

        //stop the motion of the maru movement
        maru_movement_check = false;

        for (var i = Num/2 - 5; i < Num/2 + 5; i++) {
            cnx01_cur1H[i] = -18 * Math.cos((i - Num/2) / 10 * Math.PI);
            cnx02_cur1H[i] = -25 * Math.cos((i - Num/2) / 10 * Math.PI);
            cnx03_cur1H[i] = -30 * Math.cos((i - Num/2) / 10 * Math.PI);
        }

        //setting css to about work contact
        AboutDiv.css("visibility", "hidden");
        workDiv.css("visibility", "hidden");
        contactDiv.css("visibility", "hidden");


        return false;//no effect to click the link
    });

    $('a[href=#Main_work]').click(function(){

        //stop the motion of the maru movement
        maru_movement_check = false;

        for (var i = Num/2 - 5; i < Num/2 + 5; i++) {
            cnx01_cur1H[i] = -18 * Math.cos((i - Num/2) / 10 * Math.PI);
            cnx02_cur1H[i] = -25 * Math.cos((i - Num/2) / 10 * Math.PI);
            cnx03_cur1H[i] = -30 * Math.cos((i - Num/2) / 10 * Math.PI);
        }

        //setting css to about work contact
        AboutDiv.css("visibility", "hidden");
        workDiv.css("visibility", "hidden");
        contactDiv.css("visibility", "hidden");

        return false;//no effect to click the link
    });

    $('a[href=#Main_contact]').click(function(){

        //stop the motion of the maru movement
        maru_movement_check = false;

        for (var i = Num/2 - 5; i < Num/2 + 5; i++) {
            cnx01_cur1H[i] = -18 * Math.cos((i - Num/2) / 10 * Math.PI);
            cnx02_cur1H[i] = -25 * Math.cos((i - Num/2) / 10 * Math.PI);
            cnx03_cur1H[i] = -30 * Math.cos((i - Num/2) / 10 * Math.PI);
        }

        //setting css to about work contact
        AboutDiv.css("visibility", "hidden");
        workDiv.css("visibility", "hidden");
        contactDiv.css("visibility", "hidden");

        return false; // no effect to click the link
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