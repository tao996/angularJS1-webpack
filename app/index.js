require('./css/main.scss');

var myApp = angular.module('MyApp',['ui.router']);

myApp.run(['$rootScope','$state','$stateParams', function($rootScope, $state, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])

myApp.controller('MyCtrl',['$scope', function($scope){
    $scope.text = 'Hello, AngularJS';
}]);

myApp.config(['$stateProvider', function($stateProvider){
    // 默认路由

    $stateProvider
        .state('home', {
            template: '<h1>H</h1>',
        })
        .state('views',{
            views: {
                '' : { templateUrl: './templates/tpls/home.html' },
                'main@views' : { templateUrl : './templates/tpls/main.html' }
            }
        })
}]);