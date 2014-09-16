/* 
 * services.js
 */
var serviceModule = angular.module('serviceApp.services', []);

var allTodos;
var newTodo = {"id": 0, "title": "", "date": "", "notes": ""};
// Maintaing a unique id for session, as it is not using any real services
var currentUniqueItemId = 0;

serviceModule.factory('todoFactory', ['$http', '$q', function($http, $q) {
        return {
            // get all todos
            getAllTodos: function() {
                var deferred = $q.defer();
                if (!allTodos) {
                    $http.get('data/myTodos.json').success(function(data) {
                        console.log('todoFactory - getAllTodos SUCCESS: ' + angular.toJson(data));
                        allTodos = data;
                        currentUniqueItemId = allTodos.length;
                        deferred.resolve(allTodos);
                    }).error(function(error) {
                        console.log('todoFactory - getAllTodos ERROR: ' + angular.toJson(error));
                        deferred.reject(error);
                    });
                } else {
                    deferred.resolve(allTodos);
                }
                return deferred.promise;
            },
            // get new todo
            getNewTodo: function() {
                return angular.copy(newTodo);
            },
            // get todo of id
            getTodoOfId: function(id) {
                var selectedItem;
                angular.forEach(allTodos, function(item) {
                    if (item.id === id) {
                        selectedItem = item;
                    }
                });
                return selectedItem;
            },
            // Add new todo
            addNewTodo: function(todo) {
                todo.date = new Date().getTime();
                // incrementing the unique id
                currentUniqueItemId = currentUniqueItemId + 1;
                todo.id = currentUniqueItemId;
                allTodos.splice(0, 0, todo);
            },
            // Update todo
            updateTodo: function(todo) {
                angular.forEach(allTodos, function(item, index) {
                    if (item.id === todo.id) {
                        allTodos.splice(index, 1, todo);
                    }
                });
            },
            // Delete todo
            deleteTodo: function(id) {
                angular.forEach(allTodos, function(item, index) {
                    if (item.id === id) {
                        allTodos.splice(index, 1);
                    }
                });
            }
        };
    }]);