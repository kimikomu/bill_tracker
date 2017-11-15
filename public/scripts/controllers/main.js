'use strict';

const billTrackerApp = angular.module('billTrackerApp');

billTrackerApp.controller('MainCtlr', function($window, $scope, dataService) {
// -- Bills -- //
    // when the page loads, the data service attaches bills to scope
    dataService.getBills(function(res) {
        const bills = res.data.bills;
        $scope.bills = bills;
        // const user = res.data.user;        
        // $scope.user = user;
    });

    // get to home page
    $scope.home = function() {
        $window.location.href = '/';
    };

    // add a bill to the UI
    $scope.addNewBill = function() {
        let currentDate = Date.now();
        const bill = { name: 'New', amount: 0.00, due: currentDate, edited: true, payed: false };
        $scope.bills.unshift(bill);
    };
    
    // send an edited bill to the save service
    $scope.saveBill = function(bill) {
        console.log('Made it to controller');
        if(bill.edited) {
            dataService.saveBill(bill)
            .finally($scope.resetTodoState(bill));
            console.log('Made it inside bill.edited block');
        };
    };

    // send all edited bills to the save-all service
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
        if(bill.payed) {
            $scope.resetTodoState(bill);
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
        bill.payedColor = false;
    };

});
