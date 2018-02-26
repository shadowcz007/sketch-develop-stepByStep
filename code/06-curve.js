var doc=context.document;
var page=doc.currentPage();


r=1000;
n=100;
step=2*Math.PI/n;

for (var i=0;i<2*Math.PI;i+=step){
    
    x=r*Math.cos(i);
    y=r*Math.sin(i);
    x2=r*Math.cos(i-1.5);
    y2=r*Math.sin(i-1.5);


    log(x)
    log(y)
    log('-------')
 

    var p1=NSMakePoint(0,0);
    var p2=NSMakePoint(x,y);
    var p3=NSMakePoint(x2,y2);
 
//createBezierPath

var nsb=[NSBezierPath bezierPath];

    nsb.moveToPoint(p1);

    [nsb
      curveToPoint:p1
      controlPoint1:p2
      controlPoint2:p3
    ];

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
border.setColor(MSImmutableColor.colorWithSVGString('black'));
border.thickness = 2;

page.addLayers([lineShape])

}


