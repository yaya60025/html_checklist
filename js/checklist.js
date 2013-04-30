//you can leave out the ngResource array item if you want to
var App = angular.module('YOUR_APP_NAME', ['ngResource']);

function TaskCtrl($scope, $http) {

    $http.get(url='tasks.json')
        .success(function(data, status) {
            $scope.tasks = angular.fromJson(data);
            console.log(data, typeof(data), status);
        })
        .error(function(data, status) {
            alert("can not reach or parse the file tasks.json, code: " + status);
        });

    var errorreporttomail = 'you@website.com';

    $scope.toggle = false;

    $scope.toggleState = function(value) {

        this.task[value] = !this.task[value];
        if (this.task.works && this.task.fails) {
            alert("What! It works and fails at the same time ...is it you, Chuck Norris?");
        }
    };

    $scope.addTask = function() {
        if ($scope.taskText) {
            $scope.tasks.push({text:$scope.taskText});
            $scope.taskText = '';
        } else {
            alert("Hey, you need to enter a nr. and description of the new task. Use the text input field left to this button ;)");
        }
    };

    $scope.addNote = function() {
        if (this.noteText) {
            this.task.note = this.noteText;
        } else {
            alert("First, you need to enter what fails!");
        }
    };

    $scope.failedtasks = function() {
        var count = 0;
        angular.forEach($scope.tasks, function(task) {
            count += task.fails ? 1 : 0;
        });
        return count;
    };

    $scope.workedtasks = function() {
        if ($scope.tasks !== undefined) {
            var count = 0;
            angular.forEach($scope.tasks, function(task) {
                count += task.works ? 1 : 0;
            });
            console.log($scope.tasks);
            if (count === $scope.tasks.length) {
                return true;
            }
        }
        return false;
    };


    $scope.archive = function() {
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldTasks, function(task) {
            if (task.fails) $scope.tasks.push(task);
        });
    };

    $scope.sendmail = function() {

        if ($scope.failedtasks() > 0) {
            var oldTasks = $scope.tasks;
            var body = $scope.failedtasks() + " tasks failed, check the notes!\n\n";

            $scope.tasks = [];
            angular.forEach(oldTasks, function(task) {
                if (task.fails) {
                    $scope.tasks.push(task);
                    body += 'task: ' + task.text + '\nnote: ' + task.note + "\n\n";
                }
            });
        } else {
            var body = "Great, all tasks work as expected ;)\n\n";
        }

        var link = "mailto:" + errorreporttomail
                 + "?subject=" + escape("checklist report")
                 + "&body=" + escape(body);
        window.location.href = link;
    };




}


angular.module('myApp.filters', [])

  .filter('conditional', function() {
    return function(condition, ifTrue, ifFalse) {
      return condition ? ifTrue : ifFalse;
    };
  });