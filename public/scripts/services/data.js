'use strict';

angular.module('billTrackerApp')
// Services
.service('dataService', function($http, $q) {
    // get bills
    this.getBills = function(callback) {
        $http.get('/bills')
        .then(callback)
    };

    // save a bill
    this.saveBill = function(bill) {
        let request;
        // create new bill
        if(!bill._id) {
            request = $http.post('/bills', bill);
        // update preexisting bill
        } else {
            request = $http.put(`/bills/${bill._id}`, bill).then(function(result) {
                bill = result.data.bill;
                return bill;
            });
        };
        bill.edited = false;
        
        return $q.resolve(this.bill).then(function(result) {
            console.log(`Saved the ${bill.name} bill`);
        });
    };

    // save all bills
    this.saveAllBills = function(bills) {
        // push each bill into an array
        const queue = [];
        bills.forEach(function(bill) {
            let request;
            // create new bills
            if(!bill._id) {
                request = $http.post('/bills', bill);
            // update preexisting bills
            } else {
                request = $http.put(`/bills/${bill._id}`, bill).then(function(result) {
                    bill = result.data.bill;
                    return bill;
                });
            };
            bill.edited = false;

            queue.push(request);
            console.log(`${bill.name} was edited`);
        });
        // return all bills in the array
        return $q.all(queue).then(function(result) {
            console.log(`Saved ${bills.length} bills`);            
        })
    };

    // delete a bill
    this.deleteBill = function(bill) {
        let request;
        if(!bill.payed) {
            request = $http.delete(`/bills/${bill._id}`).then(function(result) {
                console.log(`The ${bill.name} bill has been deleted`);
            });
        };
    };

    // this.getRegister = function() {
    //     $http.get('../register.html')
    //     .then(function(response) {
    //         const raw_html = response.data;
    //         return raw_html;
    //     });
    // }
    
});
