var doc=context.document;
var page=doc.currentPage();

var textLayers=[];

var str=getStrFromPasteBoard();

var strs=splitStr(str);
var title=getTitle(str);

var _newArtboard=newArtboard(title);

var _x=0,_y=0,_w=0,_h=0;

for(var i=0;i<strs.length;i++){
   var _tLayer= addTextLine(strs[i],i);
      textLayers.push(_tLayer);
    var _textFrame=_tLayer.frame();

   log(_textFrame.x())
    _w=_textFrame.x()+_textFrame.width();
    //log(_w)
    ((_textFrame.height()+_textFrame.y())>_h)?_h=(_textFrame.height()+_textFrame.y()):null;
    
    _newArtboard.addLayers([_tLayer]);

};



 log(_w)
log(_h)

 

 
 

var _artboardFrame = _newArtboard.frame();
  _artboardFrame.setX(_x);

  _artboardFrame.setY(_y);

  _artboardFrame.setWidth(_w);

  _artboardFrame.setHeight(_h);
 
page.addLayers([_newArtboard]);



function newArtboard(_name){
    var newArtboard=[MSArtboardGroup new]
    newArtboard.name=_name;

 
var artboardFrame = [newArtboard frame];
  
  artboardFrame.setX(0);

  artboardFrame.setY(0);

  artboardFrame.setWidth(100);

  artboardFrame.setHeight(100);

  //page.addLayers([newArtboard]);
 

  return newArtboard
}


function addTextLine(_strs,_i){

var textLayer=[MSTextLayer new];

var newStr=_strs.join('\n')

var _fontSize=20,_margin=10,_y=0,_x=_fontSize;

textLayer.setStringValue(newStr);
textLayer.name=_i.toString();

(_i==0)?_fontSize=_fontSize*1.5:null;
(i==1)?_fontSize=8:null;

(_i>1)?_y=_fontSize*2:null;
(i==1)?_y=_fontSize*3:null;

(i==1)?_x=_x*1.2:null;

textLayer.fontSize=_fontSize;


var textFrame=[textLayer frame];

textFrame.x=_i*(_x+_margin);
textFrame.y=_y;

textFrame.width=_fontSize;
//textFrame.height=200;

//page.addLayer(textLayer)
  return textLayer  
};

function getTitle(_str){
var _strs=_str.split('\n');
return _strs[0]
}


function splitStr(_str){

    var _strs=_str.split('\n');
    //log(_strs);
    
    var _newStr=[];

    for(var i=0;i<_strs.length;i++){
        
        var _s=_strs[i],_ns=[];         

            for(var j=0;j<_s.length;j++){
                 
                var _sc=_s[j];

                 _s[j].match('《')?_sc='︻':null;
                 _s[j].match('》')?_sc='︼':null;
                 //_s[j].match(':')?_sc='-':null;                    
                
                _ns.push(_sc)
                
            }; 

        _newStr.push(_ns);
                
    };
    
    return _newStr
};



function getStrFromPasteBoard(){

    var pasteBoard=[NSPasteboard generalPasteboard];
    var stringFromPasteBoard = [pasteBoard stringForType:NSPasteboardTypeString];
    var _nstr=stringFromPasteBoard.toString();
   // log(_nstr)
    return _nstr
};

