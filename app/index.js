require('./css/main.scss');

var myapp = angular.module('MyApp',[]);
myapp.controller('MyCtrl',['$scope', function($scope){
    $scope.text = 'Hello, AngularJS';
}])