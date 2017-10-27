angular.module('billTrackerApp', [])
    // set up the custom directive
    .controller('MainCtlr', function($scope) {
        $scope.logTest = function() {
            console.log("Bill has been payed!");
        };

        // test array
        $scope.bills = [
            {"name": "water", "amount": "137"},
            {"name": "car", "amount": "268"},
            {"name": "car insurance", "amount": "123"},
            {"name": "Verizon", "amount": "120"},
            {"name": "trash", "amount": "20"},
        ]
});


