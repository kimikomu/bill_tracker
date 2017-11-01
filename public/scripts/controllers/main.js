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
        const bill = { name: 'New', amount: 0.00, due: '2017-01-31', edited: true };
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
    
    // send an edited bill to the save service
    $scope.saveBill = function(bill) {
        if(bill.edited) {
            dataService.saveBill(bill);
        };
    };

    // send all edited bills to the save all service
    $scope.saveAllBills = function() {
        const filteredBills = $scope.bills.filter(function(bill) {
            if(bill.edited) {
                return bill;
            };
        });
        dataService.saveAllBills(filteredBills);
        // .finally($scope.resetTodoState());             
    };

    // set edited to false;
    $scope.resetTodoState = function() {
        $scope.bills.forEach(function(bill) {
            bill.edited = false;
        });
    };

});
