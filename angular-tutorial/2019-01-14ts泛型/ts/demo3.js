window.onload = function () {
    var Color;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    ;
    var c = Color.Green; //1
    //let c: Color = Color.Green;  //1
    //let c: string = Color[1];  //Green
    console.log(c);
};
