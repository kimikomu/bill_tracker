angular.module('billTrackerApp', [])
    // set up the custom directive
    .controller('MainCtlr', function($scope) {
        $scope.stopEditing = function() {
            // TODO: if user is not editing an input field (input type != text), "editing" = false
            
            console.log("blur test");
        };

        // test array
        $scope.bills = [
            {"name": "water", "amount": "137", "due": "Nov 14"},
            {"name": "car", "amount": "268", "due": "Nov 21"},
            {"name": "car insurance", "amount": "123", "due": "Nov 18"},
            {"name": "Verizon", "amount": "120", "due": "Nov 6"},
            {"name": "trash", "amount": "20", "due": "Nov 31"},
        ]
});


