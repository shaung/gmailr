/**
    This is the example app using the Gmailr API.

    In this file, you have access to the Gmailr object.
 */

Gmailr.debug = true; // Turn verbose debugging messages on 

Gmailr.init(function(G) {
    G.insertCss(getData('css_path'));
    G.insertTop($("<div id='gmailr'><span>Gmailr Status:</span> <span id='status'>Loaded.</span> </div>"));

    var status = function(msg) {
        G.$('#gmailr #status').html(msg);
    };

    var generateRandomString = function(s){
        var f = function(){
            return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
        }
        return '__hoge__shaung.org__' + f();
    };

    var replaceSelectedText = function(replace){
        var tempStr = generateRandomString();
        if (window.getSelection) {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var range = sel.getRangeAt(0);
                var selstr = range.toString();
                range.deleteContents();
                range.insertNode(document.createTextNode(tempStr));
            }
        } else if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange();
            var selstr = range.toString();
            range.text = tempStr;
        }
        if (selstr) {
            $('.editable').html($('.editable').html().replace(replace(selstr), tempStr));
        }
    };

    $('#cancel-text-button').live('click', function(){
        replaceSelectedText(function(s){
            return '<span style="color: red; text-decoration: line-through;">' + s + '</span>';
        });
    });

    var makeCancelButton = function(){
        if (!$('#cancel-text-button').length) {
            $('div[command=+underline]').each(function(){
                $('<button id="cancel-text-button">取消<button>').insertAfter($(this));
            });
        }
    };

    G.observe('viewChanged', function(){
        makeCancelButton();
    });

    G.observe('archive', function(num) {
        status('You archived ' + num + ' emails.');
    });

    G.observe('delete', function(c) {
        status('You deleted ' + c + ' emails.');
    });

    G.observe('spam', function(c) {
        status('You marked ' + c + ' emails as spam.');
    });

    G.observe('compose', function() {
        status('You composed an email.');
    });

    G.observe('reply', function(c) {
        status('You replied to an email.');
    });

    G.observe('applyLabel', function(label,emails) {
       status("you applied label " + label + " to " + emails.length + " email(s)");
    });
});
