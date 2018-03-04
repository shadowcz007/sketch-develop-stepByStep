
function KMeans(centroids) {
   this.centroids = centroids || [];

   this.distance = function(v1, v2) {
      var total = 0;
      for (var i = 0; i < v1.length; i++) {
         total += Math.pow(v2[i] - v1[i], 2);      
      }
      return Math.sqrt(total);
   };
}

KMeans.prototype.randomCentroids = function(points, k) {
   var centroids = points.slice(0); // copy
   centroids.sort(function() {
      return (Math.round(Math.random()) - 0.5);
   });
   return centroids.slice(0, k);
};

KMeans.prototype.classify = function(point) {
   var min = Infinity, index = 0;

   for (var i = 0; i < this.centroids.length; i++) {
      var dist = this.distance(point, this.centroids[i]);
      if (dist < min) {
         min = dist;
         index = i;
      }
   }
   return index;
};

KMeans.prototype.cluster = function(points, k) {
   k = k || Math.max(2, Math.ceil(Math.sqrt(points.length / 2)));

   this.centroids = this.randomCentroids(points, k);

   var assignment = new Array(points.length);
   var clusters = new Array(k);

   var movement = true;
   while (movement) {
      // update point-to-centroid assignments
      for (var i = 0; i < points.length; i++) {
         assignment[i] = this.classify(points[i]);
      }

      // update location of each centroid
      movement = false;
      for (var j = 0; j < k; j++) {
         var assigned = [];
         for (var i = 0; i < assignment.length; i++) {
            if (assignment[i] === j) {
               assigned.push(points[i]);
            }
         }
         if (!assigned.length) {
            continue;
         }
         var centroid = this.centroids[j];
         var newCentroid = new Array(centroid.length);

         for (var g = 0; g < centroid.length; g++) {
            var sum = 0;
            for (var i = 0; i < assigned.length; i++) {
               sum += assigned[i][g];
            }
            newCentroid[g] = sum / assigned.length;

            if (newCentroid[g] !== centroid[g]) {
               movement = true;
            }
         }
         this.centroids[j] = newCentroid;
         clusters[j] = assigned;
      }
   }
   return clusters;
};

///////

var doc=context.document;

var selectedLayers = context.selection;
var selectedCount = selectedLayers.count();

//log(selectedLayers)

//step 1  getBounds 
var bounds=getBounds(selectedLayers);

var layers=sortLayers(selectedLayers);

//log(layers)

//step 2 kmean by 2
var points=sum(layers);

var kmeans = new KMeans();

kmeans.cluster(points, 2);
var max_dis=[];
kmeans.centroids.forEach(function(centroid) {
log('centroid');
	log(centroid);
    max_dis.push(centroid);
});

var range=distance(max_dis[0],max_dis[1])/2;

//log(range)


for (var i = 0; i < points.length; i++) {
    var dis=distance(max_dis[0],points[i]);
   // log(dis)
    if(dis<range){
        layers[i].group=1;
    }else{
        layers[i].group=0;
    };

};

//log(layers)


//step3 reduce
var indexGroup=Math.random()>0.4?0:1;
log(indexGroup)
log('indexGroup')
var layers_new=reduceOne(layers,indexGroup);

//step4 resize
var layers_layer=[];
for (var i=0;i<layers_new.length;i++){
    layers_layer.push(layers_new[i].layer);
};
var bounds=getBounds(layers_layer);

var h=bounds.h,y=bounds.y;

var y_new=y+0.5*(h-sumByHeight(layers_new));


for (var i=0;i<layers_new.length;i++){
        
        var layer=layers_new[i].layer;
        resizeLayer(layer,y_new);
        y_new=layer.frame().height()+y_new;
    
};




function distance(v1, v2) {
      var total = 0;
      for (var i = 0; i < v1.length; i++) {
         total += Math.pow(v2[i] - v1[i], 2);      
      }
      return Math.sqrt(total);
};


function sortLayers(selectedLayers){
    var layers=[];

for (var i=0;i<selectedLayers.length;i++){
    var layer=selectedLayers[i];
    var frame=layer.frame();
    var x=frame.x(),
        y=frame.y(),
        w=frame.width(),
        h=frame.height();
    
    layers.push({layer:layer,y:y,x:x});
};

    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    };
    
var layers_new=layers.sort(compare('y'));
return layers_new
};

function sum(layers){
    var s=0,ys=[];
    
    for (var i=0;i<layers.length;i++){
        s=s+layers[i].y;
    };

    for (var i=0;i<layers.length;i++){
        ys.push([layers[i].x,layers[i].y])
    };

    //log(ys)
    return ys
};


function sumByHeight(arr) {

    var s = 0;

    for (var i=arr.length-1; i>=0; i--) {

        s += arr[i].height;

    };

   // log('-height----')

   //    log(s)

  //  log('-----')

    return s;

};




/*
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


*/




function reduceOne(selectedLayers,indexGroup){

    var res=[],str='';
    var sls=[];

    for(var i=0;i<selectedLayers.length;i++){
        if(selectedLayers[i].group==indexGroup){
            sls.push(selectedLayers[i]);
        }

    }
    
    for(var i=0;i<sls.length;i++){
        
               var layer=sls[i].layer;
                
                var frame=layer.frame();
                var obj={layer:layer,height:frame.height(),y:frame.y()};
                res.push(obj);
                str=str+layer.name().slice(0,4)+'=='+i+'_';
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

