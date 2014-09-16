/* 
 * mainController.js
 */
var controllerModule = angular.module('serviceApp.controllers', []);

// Todo list controller
controllerModule.controller('todoListController', ['$scope', 'todoFactory', function($scope, todoFactory) {

        // set todo list
        todoFactory.getAllTodos().then(function(data) {
            // alert("data: " + JSON.stringify(data));
            $scope.todos = data;
            $scope.totalTodos = data.length;
        }, function(error) {
            console.log('Error get all todos: ' + error);
        });

    }]);

// Todo add controller
controllerModule.controller('todoAddController', ['$scope', '$routeParams', '$rootScope', 'todoFactory', function($scope, $routeParams, $rootScope, todoFactory) {

        // get url paramter - id 
        var id = +$routeParams.id; // '+' will convert string to integer

        // init the view
        if (id === 0) {
            // Create new todo
            $scope.todo = todoFactory.getNewTodo();
            $scope.isSave = true;
        } else {
            // Edit todo
            $scope.todo = todoFactory.getTodoOfId(id);
            $scope.isSave = false;
        }

        // Save /Update todo
        $scope.saveTodo = function(todo) {
            if (id === 0) {
                todoFactory.addNewTodo(todo);
            } else {
                todoFactory.updateTodo(todo);
            }
            $rootScope.goBack();
        };

        // Delete todo
        $scope.deleteTodo = function(id) {
            todoFactory.deleteTodo(id);
            $rootScope.goBack();
        };


    }]);