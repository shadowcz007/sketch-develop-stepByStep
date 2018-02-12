function openJsonFile(){
var fileTypes = [NSArray arrayWithObjects:@"json", @"txt"];

var panel = [NSOpenPanel openPanel];
    
    [panel setCanChooseFiles:true];
    [panel setCanChooseDirectories:false];
    [panel setAllowsMultipleSelection:false]; 

    [panel setAllowedFileTypes:fileTypes];

    var isConfirm = [panel runModal];
    //isConfirm

    if (isConfirm) {
        
        var firstURL = [[panel URLs] objectAtIndex:0];
        var firstURLPath = [NSString stringWithFormat:@"%@", firstURL];
        var path=[panel URLs][0];
           
        var data=JSON.parse(NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, nil));
    

return data
          
    }
};
