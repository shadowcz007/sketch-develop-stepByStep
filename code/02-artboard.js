var doc = context.document;

var page=doc.currentPage();

var path='/Users/zhank/Downloads/designSize.json';

var data=JSON.parse(NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, nil));

var sizes=data.data;

var x=0;

//log(sizes[1])

var newArtboards=[NSArray array];

for(var i=0;i<sizes.length;i++){

    var s=sizes[i];


    if(i>=1){

        x=x+(sizes[i-1].size.width)+50

    };


    var newArtboard=createArtboard(s.name,s.size.width,s.size.height,x);

    newArtboards=[newArtboards arrayByAddingObjectsFromArray:[newArtboard]]

}

page.addLayers(newArtboards)


 function createArtboard(_name,_w,_h,_x){

      var newArtboard=[MSArtboardGroup new]

      newArtboard.name=_name;

      var artboardFrame = [newArtboard frame];

        artboardFrame.setX(_x)

        artboardFrame.setY(0)

        artboardFrame.setWidth(_w)

        artboardFrame.setHeight(_h)

        return newArtboard

}
