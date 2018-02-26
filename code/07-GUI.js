// Create dialog

var dialog = NSAlert.alloc().init(); 
dialog.setMessageText("This a alert view");
dialog.addButtonWithTitle("Save"); 
dialog.addButtonWithTitle("Cancel");

var customView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 200, 180));

var label = createLabel(NSMakeRect(0, 150, 200, 25), 12, false, 'Label1:');
customView.addSubview(label);

var select=createSelect(NSMakeRect(0, 125, 200, 25), ["item1", "item2"]);
customView.addSubview(select);

var checkbox = createCheckbox(NSMakeRect(0, 60, 200, 25), "checked", "checked_value", true, true);     
customView.addSubview(checkbox);



// Add custom view to dialog
dialog.setAccessoryView(customView);


function createLabel(frame, size, bold, text) {
    var label = NSTextField.alloc().initWithFrame(frame);
    
    label.setStringValue(text);
    label.setBezeled(false);
    label.setDrawsBackground(false);
    label.setEditable(false); 
    label.setSelectable(false);
    
    if (bold) {         
        label.setFont(NSFont.boldSystemFontOfSize(size));
    }else {
        label.setFont(NSFont.systemFontOfSize(size));
    } 
    
    return label;
    
};
    

function createSelect(frame, items) {      
         
         var select = NSPopUpButton.alloc().initWithFrame(frame);
         
         select.addItemsWithTitles(items); 
         return select;
         
}; 
                    
                    
function createCheckbox(frame, name, value, onstate, enabled) {
    
    var checkbox = NSButton.alloc().initWithFrame(frame);
    
    checkbox.setButtonType(NSSwitchButton); 
    
    // checkbox.setBezelStyle(1); 
    
    checkbox.setTitle(name);     
    checkbox.setTag(value);     
    checkbox.setState(onstate ? NSOnState : NSOffState);     
    checkbox.setEnabled(enabled); 

     return checkbox; 
    
};


// Listen for select box change event

select.setCOSJSTargetFunction(function(sender) { 
       
    if (select.indexOfSelectedItem() == 0) {
       
         checkbox.setState(NSOnState);
         checkbox.setEnabled(true);
       
    } else if (select.indexOfSelectedItem() == 1) { 
       
         checkbox.setState(NSOffState);
         checkbox.setEnabled(false);
       
    }
         
});      






// Open dialog and exit if user selects Cancel

if (dialog.runModal() != NSAlertFirstButtonReturn) {

return;

}else{

//checkbox state
    log('checkbox state:'+checkbox.state())
    log('select selected Item:'+select.indexOfSelectedItem())        // Create save dialog and set properties
        
var save = NSSavePanel.savePanel();
     
    save.setNameFieldStringValue("untitled.mixlab");
    save.setAllowedFileTypes(["mixlab"]);
    save.setAllowsOtherFileTypes(false);
    save.setExtensionHidden(false);


    if (save.runModal()) {

        var fileData={
             "mixlab":"hello world",
             "version":48,
             "author":"shadow"
            };            

        var filePath = save.URL().path();            
        var file = NSString.stringWithString(JSON.stringify(fileData));

        file.writeToFile_atomically_encoding_error(filePath, true, NSUTF8StringEncoding, null);
        

    };
};









