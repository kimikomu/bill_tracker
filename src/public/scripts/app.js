angular.module('billTrackerApp', [])

// set up the custom directive
.controller('MainCtlr', function($scope, dataService) {   
    $scope.stopEditing = function() {
        // TODO: if user is not editing an input field (input type != text), "editing" = false
        console.log("blur test");
    };

    $scope.helloConsole = dataService.helloConsole;

    dataService.getBills(function(res) {
        console.log(res.data);
        $scope.bills = res.data;
    });
})
.service('dataService', function($http) {
    this.helloConsole = function() {
        console.log("Testing helloConsole");
    };

    this.getBills = function(callback) {
        $http.get('data/bills.json')
        .then(callback)
    }
});


