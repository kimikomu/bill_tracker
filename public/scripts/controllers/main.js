'use strict';

angular.module('billTrackerApp')
// set up the custom directive
.controller('MainCtlr', function($window, $scope, dataService) {
//-- Bills --
    // when the page loads, the data service attaches bills to scope
    dataService.getBills(function(res) {
        const bills = res.data.bills;
        $scope.bills = bills;
    });

    // add a bill to the UI
    $scope.addNewBill = function() {
        const bill = { name: 'New', amount: 0.00, due: '2017-01-31', edited: true };
        $scope.bills.unshift(bill);
    };
    
    // send an edited bill to the save service
    $scope.saveBill = function(bill) {
        if(bill.edited) {
            dataService.saveBill(bill)
            .finally($scope.resetTodoState(bill));
        };
    };

    // send all edited bills to the save all service
    $scope.saveAllBills = function() {
        const filteredBills = $scope.bills.filter(function(bill) {
            if(bill.edited) {
                return bill;
            };
        });
        dataService.saveAllBills(filteredBills)
        .finally($scope.resetAll());             
    };

    // remove a bill from UI
    $scope.deleteBill = function(bill, $index) {
        if (bill.payed) {
            console.log('Delete disabled');
        } else {
            $scope.bills.splice($index, 1);
            dataService.deleteBill(bill);
        };
    };

    // reset bills;
    $scope.resetAll = function() {
        $scope.bills.forEach($scope.resetTodoState)
    };

    // reset a bill;
    $scope.resetTodoState = function(bill) {
        bill.edited = false;   
        bill.nameColor = false;
        bill.amountColor = false;
        bill.dueColor = false;
    };

//-- Register --
    // will need a new controller?
    $scope.getRegister = function() {
        $window.location.href = '/register';
        console.log("test");
    };
});
