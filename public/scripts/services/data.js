'use strict';

angular.module('billTrackerApp')
// Services
.service('dataService', function($http, $q) {
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

    this.saveBill = function(bill) {
        bill.edited = false;
        console.log(`Saved the ${bill.name} bill`);
    };

    // save service
    this.saveAllBills = function(bills) {
        for (let i = 0; i < bills.length; i++) {
            console.log(bills[i].name);
            bills[i].edited = false;
        };
        console.log(`Saved ${bills.length} bills`);
    };
});
