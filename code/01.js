//新建 n 个页面的代码：

var doc=context.document;

var num=[doc askForUserInput:@"输入需要创建的页面数量" initialValue:@"5"];

log(num);

for(var n=0;n<num;n++){ 
   var newPage = doc.addBlankPage();
   newPage.setName(n.toString());
};


//复制当前页面为 n 份的代码：


var doc=context.document,
    page=doc.currentPage();

var num=[doc askForUserInput:@"输入需要创建的页面数量" initialValue:@"5"];

log(num);

for(var n=0;n<num;n++){

    var newPage = [page copy];
    var index=[[doc pages] count];
    var newName=page.name()+'_'+index;

    [newPage setName:newName]
    [[doc documentData] addPage:newPage]
    [doc setCurrentPage:page]    
    
};

