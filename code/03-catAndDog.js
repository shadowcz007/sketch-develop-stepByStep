var doc = context.document;
var page = [doc currentPage];

var data = openImageFiles();

var _newArtboard = [MSArtboardGroup new];
_newArtboard.name = (new Date()).getTime().toString();

var _artboardFrame =_newArtboard.frame();

var _ab_w = 0,
    _ab_h = 0,
    _w=[doc askForUserInput:@"width" initialValue:@"2000"],
    _h=[doc askForUserInput:@"height" initialValue:@"200"];;

for (var i = 0; i < data.length; i++) {
  
  var _url = data[i];

  //   var _x=Math.random()*1000,_y=Math.random()*1000;

  var _x = Math.abs(Math.random() * _w * Math.tanh(i)),
      _y = Math.abs(Math.random() * _h * Math.cos(i));

  var _imageLayer = drawImg(_x, _y, _url);

  _ab_w = Math.max(_imageLayer.width, _ab_w);
  _ab_h = Math.max(_imageLayer.height, _ab_h);

  _newArtboard.addLayer(_imageLayer.layer);
  
};


_artboardFrame.setX(0);
_artboardFrame.setY(0);
_artboardFrame.setWidth(_ab_w);
_artboardFrame.setHeight(_ab_h);


var textLayer = drawText(_ab_w, _ab_h, _h*0.05);

_newArtboard.addLayer(textLayer);
page.addLayer(_newArtboard);



function drawText(x, y, fontSize) {

  var textLayer = [MSTextLayer new];
  var _fontSize = fontSize;
  var title = '猫猫狗狗全家福';

  textLayer.setStringValue(title);
  textLayer.name = title;
  textLayer.fontSize = _fontSize;

  var textFrame = [textLayer frame];
  textFrame.x =_fontSize*title.length;
  textFrame.y = y - _fontSize*2;

  return textLayer

}

function drawImg(x, y, _url) {
  var image = [[NSImage alloc] initByReferencingFile:_url];

  var img = MSImageData.alloc().initWithImage(image);
  
  let _w=100,
      _h=100*image.size().width/image.size().height;
  
  var rect = drawRect(x, y, _w, _h);

  img2Fill(rect, img);

  return {
    layer: rect,
    width: _w + x,
    height: _h + y
  };
  
};

function drawRect(x, y, w, h) {
  
  var nsb = [NSBezierPath bezierPath];
  nsb.appendBezierPathWithRect(NSMakeRect(x, y, w, h));

  var lineShape = [MSShapeGroup new];

  lineShape.setBezierPath(nsb);
  lineShape.name = '12';

  var lineShapeStyle = lineShape.style(),
       fills = lineShapeStyle.fills();

  if (fills.count() <= 0) {
    lineShapeStyle.addStylePartOfType(0);
  };

  // page.addLayers([lineShape]);

  return lineShape
  
};

function img2Fill(layer, img) {
  
  let style = layer.style();

  let fill = style.fills()[0];

  fill.setFillType(4);
  fill.setImage(img);
  
  fill.setPatternFillType(3);
  //fit

};

function openImageFiles() {
  
  var fileTypes = [NSArray arrayWithObjects: @"png", @"jpg",@"jpeg"];
  var imageFileNames = [];
  var panel = [NSOpenPanel openPanel];

  [panel setCanChooseFiles: true];
  [panel setCanChooseDirectories: false];
  [panel setAllowsMultipleSelection: true];
  [panel setAllowedFileTypes: fileTypes];

  var isConfirm = [panel runModal];
  
  //isConfirm
  if (isConfirm) {

    var firstURL =[[panel URLs] objectAtIndex:0];
    var firstURLPath =[NSString stringWithFormat:@"%@", firstURL];

    var loop = [[panel URLs] objectEnumerator];

    while (url = [loop nextObject]) {

      imageFileNames.push([url path]);

    };

    return imageFileNames

  }
};
