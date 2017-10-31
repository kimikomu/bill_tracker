'use strict';

angular.module('billTrackerApp')
// Services
.service('dataService', function($http) {
    // get bills from json file
    this.getBills = function(callback) {
        $http.get('/routes/bills')
        .then(callback)
    };

    // delete service
    this.deleteBill = function(bill) {
        if(!bill.payed) {
            console.log(`The ${bill.name} bill has been deleted`);
        };
    };

    // save service
    this.saveBill = function(bill) {
        bill.newBill = false;
        console.log(`Saved the ${bill} bill`);
    };
});
