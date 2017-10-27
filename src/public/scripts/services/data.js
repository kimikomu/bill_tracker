'use strict';

angular.module('billTrackerApp')
// Services
.service('dataService', function($http) {
    this.helloConsole = function() {
        console.log("Testing helloConsole");
    };

    // get bills from json file
    this.getBills = function(callback) {
        $http.get('data/bills.json')
        .then(callback)
    };

    // delete service
    this.deleteBill = function(bill) {
        console.log(`The ${bill.name} bill has been deleted`);
    }
});