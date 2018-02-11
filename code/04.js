var doc=context.document;

var page=doc.currentPage();


var _num=100;


for(var i=0;i<_num;i++){
    
    var _x=i*Math.random(),_y=Math.tanh(i)*i*Math.random();    

    var p1=NSMakePoint(_x,i);
    var p2=NSMakePoint(i,_y);
    var p3=NSMakePoint(_x,_y);
    
    drawLine(p1,p2);

    //drawLine(p1,p3);
   // drawLine(p2,p3);
};



function drawLine(p1,p2){
//createBezierPath

var nsb=[NSBezierPath bezierPath];

    nsb.moveToPoint(p1);

    nsb.lineToPoint(p2);

var lineShape= [MSShapeGroup new];

    lineShape.setBezierPath(nsb);

    lineShape.name=(new Date()).getTime().toString();

// add border

var lineShapeStyle = lineShape.style(),

    borders = lineShapeStyle.borders();

if (borders.count() <= 0){

    lineShapeStyle.addStylePartOfType(1);

};

// set border style

var border = borders[0];

border.setColor(MSImmutableColor.colorWithSVGString('rgba('+255*Math.random()+','+255*Math.random()+','+255*Math.random()+','+Math.random()+')'));

border.thickness = Math.random();



//lineShape.firstLayer().setEndDecorationType(1);

page.addLayers([lineShape])

}

function createBezierPath(){

    return NSBezierPath.bezierPath();

};

function createShapeFromPathWithStyle(path,style){

    var shape = MSShapeGroup.shapeWithBezierPath(path);

    shape.setStyle(style);

    return shape;

};

function pathMoveTo(path,x,y){

    path.moveToPoint(NSMakePoint(x,y));

};

function pathLineTo(path,x,y){

    path.lineToPoint(NSMakePoint(x,y));

};

function pathLine(path,x0,y0,x1,y1){

    path.moveToPoint(NSMakePoint(x0,y0));

    path.lineToPoint(NSMakePoint(x1,y1));

};

function pathLineH(path,x0,x1,y){

    pathLine(path,x0,y,x1,y);

};

function pathLineV(path,x,y0,y1){

    pathLine(path,x,y0,x,y1);

};

function pathRect(path,x,y,width,height){

    path.appendBezierPathWithRect(NSMakeRect(x,y,width,height));

};
