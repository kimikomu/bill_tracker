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

    // save a bill
    this.saveBill = function(bill) {
        let request;
        if(!bill._id) {
            request = $http.post('/routes/bills', bill);
        };
        bill.edited = false;
        return $q.resolve(this.bill).then(function(results) {
            console.log(`Saved the ${bill.name} bill`);
        });
    };

    // save all bills
    this.saveAllBills = function(bills) {
        // push each bill into an array
        const queue = [];
        bills.forEach(function(bill) {
            let request;
            // new bills get posted to the route
            if(!bill._id) {
                request = $http.post('/routes/bills', bill);
            };
            
            bill.edited = false;
            queue.push(request);
            console.log(`${bill.name} was edited`);
        });
        // return all bills in the array
        return $q.all(queue).then(function(results) {
            console.log(`Saved ${bills.length} bills`);            
        })
    };
});
