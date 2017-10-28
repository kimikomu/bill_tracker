'use strict';

// replace <bills> tag in index.html with html from bills template
angular.module('billTrackerApp')
.directive('bills', function() {
    return {
        templateUrl: 'templates/bills.html',
        controller: 'MainCtlr',
        replace: true 
    }
})