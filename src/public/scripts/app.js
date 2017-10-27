angular.module('billTrackerApp', [])

// set up the custom directive
.controller('MainCtlr', function($scope, dataService) {   
    $scope.stopEditing = function() {
        // TODO: if user is not editing an input field (input type != text), "editing" = false
        console.log("blur test");
    };

    // add a bill to the scope
    $scope.addNewBill = function() {
        const bill = { name: 'New' };
        $scope.bills.push(bill);
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
        $scope.bills.splice($index, 1);
    };
})
// Services
.service('dataService', function($http) {
    this.helloConsole = function() {
        console.log("Testing helloConsole");
    };

    // get bills from json file
    this.getBills = function(callback) {
        $http.get('data/bills.json')
        .then(callback)
    };

    // delete service
    this.deleteBill = function(bill) {
        console.log(`The ${bill.name} bill has been deleted`);
    }


});


