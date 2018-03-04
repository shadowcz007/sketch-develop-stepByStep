var doc=context.document;

var selectedLayers = context.selection;

var selectedCount = selectedLayers.count();

//log(selectedLayers)

//step 1 getBounds

var bounds=getBounds(selectedLayers);

//step2 reduceRandomOne

var x=bounds.x,

    y=bounds.y,

    w=bounds.w,

    h=bounds.h;

var layers=reduceOne(selectedLayers);

//step3 resize

var y_new=y+0.5*(h-sum(layers));

for (var i=0;i<layers.length;i++){

    var layer=layers[i].layer;

    resizeLayer(layer,y_new);

    y_new=layer.frame().height()+y_new;

};

function sum(arr) {

    var s = 0;

    for (var i=arr.length-1; i>=0; i--) {

        s += arr[i].height;

    };

   // log('-height----')

   //    log(s)

  //  log('-----')

    return s;

};

function reduceOne(selectedLayers){

    var res=[],str='';


    for(var i=0;i<selectedLayers.length;i++){

    var layer=selectedLayers[i];


       // log(layer)

        if(layer&&layer.isKindOfClass(MSTextLayer)){


            var frame=layer.frame();

            var obj={layer:layer,height:frame.height(),y:frame.y()};

            res.push(obj);

            str=str+layer.name().slice(0,4)+'=='+i+'_';

            //log(layer.frame())

        };


    };

    var index=[doc askForUserInput:str initialValue:@"1"];

   // var index=index||Math.ceil(Math.random()*res.length)-1;

    res[index].layer.removeFromParent();

    log(index)

    var r3=[];

    for(var i=0;i<res.length;i++){

        if(index!=i){

            r3.push(res[i])

        };

    }


    log(r3.length)

    function compare(property){

        return function(a,b){

            var value1 = a[property];

            var value2 = b[property];

            return value1 - value2;

        }

    };


    var res_new=r3.sort(compare('y'));

log('-----')

  //  log(hs)

   // log(ys)

    log(res_new)

log('-----')

    return res_new

}

function pixelFitLayer(layer) {

  var frame = layer.frame();

  var x = Math.round(frame.x());

  var y = Math.round(frame.y());

  var width = frame.width();

  var height = frame.height();

  layer.frame().setRectByIgnoringProportions(NSMakeRect(x, y, width, height))

};

function resizeLayer(layer,y) {

  var frame = layer.frame();

  var x =frame.x();

  var width = frame.width();

  var height = frame.height();

  layer.frame().setRectByIgnoringProportions(NSMakeRect(x, y, width, height))

};

function getBounds(selectedLayers){

var bounds= MSLayerGroup.groupBoundsForContainer(MSLayerArray.arrayWithLayers(selectedLayers));

log("x: "+bounds.origin.x);

log("y: "+bounds.origin.y);

log("width: "+bounds.size.width);

log("height: "+bounds.size.height);

var x=bounds.origin.x,

    y=bounds.origin.y,

    w=bounds.size.width,

    h=bounds.size.height;

// All coordinates are provided in pixels

var path = NSBezierPath.bezierPath();

path.moveToPoint(NSMakePoint(x,y));

path.lineToPoint(NSMakePoint(x+w,y));

path.lineToPoint(NSMakePoint(x+w,y+h));

path.lineToPoint(NSMakePoint(x,y+h));

path.closePath();

var shape = MSShapeGroup.shapeWithBezierPath(path);

var fill = shape.style().addStylePartOfType(0);

fill.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 0.2});

var documentData = context.document.documentData();

var currentParentGroup = documentData.currentPage().currentArtboard() || documentData.currentPage()

currentParentGroup.addLayers([shape]);

return {x:x,y:y,w:w,h:h}

}
