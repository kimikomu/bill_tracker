'use strict';

angular.module('billTrackerApp')
// set up the custom directive
.controller('MainCtlr', function($scope, dataService) {  
    // when the page loads, the data service attaches bills to scope
    dataService.getBills(function(res) {
        const bills = res.data.bills;
        $scope.bills = bills;
    });

    // add a bill to the UI
    $scope.addNewBill = function() {
        const bill = { name: 'New', amount: 0.00, due: '2017-01-31', newBill: true };
        $scope.bills.unshift(bill);
    };

    // remove a bill from UI
    $scope.deleteBill = function(bill, $index) {
        if (bill.payed) {
            console.log('Delete disabled');
        } else {
            $scope.bills.splice($index, 1);
            dataService.deleteBill(bill);
        }
    };
 
    $scope.saveBill = function(bill) {
            if(bill.newBill) {
                dataService.saveBill(bill);
            };
                
    };
})
