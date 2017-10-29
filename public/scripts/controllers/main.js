'use strict';

angular.module('billTrackerApp')
// set up the custom directive
.controller('MainCtlr', function($scope, dataService) {  
    // when the page loads, the data service attaches bills to scope
    dataService.getBills(function(res) {
        const bills = res.data.bills;
        $scope.bills = bills;
    });

    // add a bill to the front of the bill array
    $scope.addNewBill = function() {
        const bill = { name: 'New', amount: 0.00, due: 'Jan 1' };
        $scope.bills.unshift(bill);
    };

    // remove a bill from scope
    $scope.deleteBill = function(bill, $index) {
        dataService.deleteBill(bill);
        if (bill.payed) {
            console.log('Delete disabled');
        } else {
            $scope.bills.splice($index, 1);
        }
    };

    
    $scope.saveBill = function(bill) {
        dataService.saveBill(bill);
    };
})