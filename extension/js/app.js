/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

'use strict';

(function () {
    // The initialize function is run each time the page is loaded.
    Office.initialize = function (reason) {
        $(document).ready(function () {
			switch (reason) {
				case 'inserted': console.log('The add-in was just inserted.');
				case 'documentOpened': console.log('The add-in is already part of the document.');
			}
            // Set up event handler for the UI.
            $('#highlight').click(highlight);
        });
    };

    // Add the contents of the text area to the page.
    function highlight() {
        OneNote.run(function (context) {
            var code = $('#textBox').val();
            
            return $.post('https://highlighter.azurewebsites.net/api', { code: code, lang: $('#lexer').val() }, function(data) {

                // Get the current page.
                var page = context.application.getActivePage();

                var outline = page.addOutline(40, 90, data);
                
                return context.sync()
                    .then(function () {
                        console.log('Added outline to page ' + page.title);
                    })
                    .catch(function (error) {
                        console.log("Error: " + error);
                        if (error instanceof OfficeExtension.Error) {
                            console.log("Debug info: " + JSON.stringify(error.debugInfo));
                        }
                    });
            });
        });
    }

})();