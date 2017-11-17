'use strict';

const billTrackerApp = angular.module('billTrackerApp');
let COUNTER = 0;

billTrackerApp.controller('MainCtlr', function($window, $scope, dataService) {
// -- Bills -- //
    // when the page loads, the data service attaches bills to scope
    dataService.getBills(function(res) {
        const bills = res.data.bills;
        $scope.bills = bills;

        // start with current month
        $scope.setDate(0);
    });

    // get to home page
    $scope.home = function() {
        $window.location.href = '/';
    };

    // Header is the month and year
    $scope.setDate = function(number) {
        let today = new Date();
        let thisMonth = today.getMonth() * 1;
        let monthToView = (thisMonth + number) % 12;
        let dateStr;

        const month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            
        // temp solution for new year change
        if(monthToView === 10 || monthToView === 11) {
            dateStr = `${month[monthToView]} ${today.getFullYear()}`;
        } else {
            dateStr = `${month[monthToView]} ${today.getFullYear() + 1}`;
        }
        document.getElementById("month").innerHTML = dateStr;
    };

    // show next month's bills
    $scope.nextMonth = function(bills) {
        // counter loops for the 12 months
        COUNTER += 1;
        if(COUNTER > 11) {
            COUNTER = 0;
        }

        // keep header and current month's bills in sync 
        $scope.setDate(COUNTER);

        // get the month's bills
        $scope.billsByMonth();
    };

    // show previous month's bills
    $scope.previousMonth = function(bills) {
        // counter loops for the 12 months
        COUNTER -= 1;
        if(COUNTER > 11) {
            COUNTER = 0;
        }

        // keep header and current month's bills in sync 
        $scope.setDate(COUNTER);

        // get the month's bills
        $scope.billsByMonth();
    };

    // filter for bills by month
    $scope.billsByMonth = function() {
        // include all bills in $scope
        dataService.getBills(function(res) {
            const bills = res.data.bills;
            $scope.bills = bills;

            let today = new Date();
            let thisMonth = today.getMonth();

            let filteredBills = $scope.bills.filter(function(bill) {
                let billDue = bill.due;
                let billDueToDate = new Date(billDue);

                if(billDueToDate.getMonth() === (thisMonth + COUNTER) % 12) {
                    return bill;
                };
            });
            $scope.bills = filteredBills;
        });
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
            alert('You cannot delete a paid bill');
        } else {
            if(confirm('Are you sure you want to delete this bill?')){
                $scope.bills.splice($index, 1);
                dataService.deleteBill(bill);
            };
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
