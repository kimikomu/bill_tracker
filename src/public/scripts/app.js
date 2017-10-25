angular.module('billTrackerApp', [])
    .controller('MainCtlr', function($scope) {
        $scope.logTest = function() {
            console.log("Testing logTest");
        };
    });
