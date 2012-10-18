function Circle( posx, posy, divx, divy, wd){

    this.width = wd;

    this.posx = posx;
    this.posy = posy;

    this.prevPosy = posy;


    this.divx = divx;
    this.divy = divy;

}

Circle.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc( this.posx, this.posy, this.width/2, 0, Math.PI *2, true);
//    console.log(this.posx);
    ctx.fill();
    ctx.closePath();
}

Circle.prototype.update = function(dt, ctx){
    ctx.clearRect(this.posx - this.width, this.posy - this.width, this.width*2, this.width*2);

//    this.divy += this.gravity * dt;

    this.prevPosy = this.posy;

    this.posx += this.divx * dt;
    this.posy += this.divy * dt;

    if(this.posy > window.innerHeight){
        this.color = "#ffffff";
    }else if(this.posy < 0){
        this.color = "#000000";
    }else{
        var rate = (500 * this.posy / window.innerHeight)|0;
        var rateStr = rate.toString(16);

        var colStr;
        if(rate < 16){
            colStr = "#0" + rateStr + "0" + rateStr + "0" + rateStr;
        }else if(rate> 255){
            colStr = "#ffffff";
        }else{
            colStr = "#" + rateStr +  + rateStr +  + rateStr;
        }

        this.color  = colStr;
    }
}

Circle.prototype.clear = function(ctx){
    ctx.clearRect(this.posx - this.width, this.posy - this.width, this.width*2, this.width*2);
}

