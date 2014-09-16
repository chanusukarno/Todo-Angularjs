/* 
 * mainApp.js
 * Routes
 */
var serviceApp = angular.module('serviceApp', ['ngRoute', 'serviceApp.controllers', 'serviceApp.services']);
serviceApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/TodoList', {
                    templateUrl: 'partials/todo_list.html',
                    controller: 'todoListController'
                }).
                // AddTodo will take an url parameter as 'id'.
                // Since we will re-use same route for Edit we use this additional parameter.
                // We treat 'id' if 0: new todo, else: we are editing some todo.
                when('/AddTodo/:id', {
                    templateUrl: 'partials/todo_add.html',
                    controller: 'todoAddController'
                }).
                otherwise({
                    redirectTo: '/TodoList'
                });
    }]);

// Main controller:
function mainController($rootScope, $location, $window) {

    // Handle redirection to relative path
    $rootScope.goTo = function(link) {
        $location.path(link);
    };

    // Handle history back
    $rootScope.goBack = function() {
        $window.history.back();
    };

}