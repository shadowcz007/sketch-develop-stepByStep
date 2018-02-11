var doc=context.document;
var page=doc.currentPage();

var textLayers=[];

var str=getStrFromPasteBoard();

var strs=splitStr(str);

for(var i=0;i<strs.length;i++){

    addTextLine(strs[i],i)

};



function addTextLine(_strs,_i){

var textLayer=[MSTextLayer new];

var newStr=_strs.join('\n')
log(newStr)

textLayer.setStringValue(newStr);
textLayer.name=_i.toString();

var textFrame=[textLayer frame];
textFrame.x=_i*20;
textFrame.y=0;
textFrame.width=10;
textFrame.height=200;

page.addLayer(textLayer)
    
}

function splitStr(_str){

    var _strs=_str.split('\n');
    //log(_strs);
    
    var _newStr=[];

    for(var i=0;i<_strs.length;i++){
        
        var _s=_strs[i],_ns=[];         

            for(var j=0;j<_s.length;j++){
                
                 log(_s[j].match('\U300a'))
                _s[j]=_s[j].replace('《','「').replace('》','」');
                 
                
                _ns.push(_s[j])
                
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

