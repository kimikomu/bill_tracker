'use strict';

angular.module('billTrackerApp')
// set up the custom directive
.controller('MainCtlr', function($scope, dataService) {   
    $scope.stopEditing = function() {
        // TODO: if user is not editing an input field (input type != text), "editing" = false
        console.log("blur test");
    };

    // add a bill to the scope
    $scope.addNewBill = function() {
        const bill = { name: 'New', amount: 0.00, due: 'Jan 1' };
        $scope.bills.unshift(bill);
    };

    $scope.helloConsole = dataService.helloConsole;

    // get bills into the scope
    dataService.getBills(function(res) {
        console.log(res.data);
        $scope.bills = res.data;
    });

    // remove a bill from scope
    $scope.deleteBill = function(bill, $index) {
        dataService.deleteBill(bill);
        if (bill.payed) {
            console.log('Delete disabled');
        } else {
            $scope.bills.splice($index, 1);
        }
    };

    // remove a bill from scope
    $scope.saveBill = function(bill) {
        dataService.saveBill(bill);
    };
})