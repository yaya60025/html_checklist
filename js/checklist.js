function TaskCtrl($scope) {

    var errorreporttomail = 'you@website.com';

    $scope.toggle = false;

    $scope.tasks = [
        {text: '1. go to x and check y', note: '', fails: false, works: false},
        {text: '2. click z and abc happens', note: '', fails: false, works: false},
        {text: '3. there is a list of ds and an edit buton at the end of each row', note: '', fails: false, works: false}
    ];

    $scope.toggleState = function(value) {

        this.task[value] = !this.task[value];
        if (this.task.works && this.task.fails) {
            alert("What! It works and fails at the same time ...is it you, Chuck Norris?");
        }
    };

    $scope.addTask = function() {
        if ($scope.taskText) {
            $scope.tasks.push({text:$scope.taskText, works:false, fails:false});
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

    $scope.archive = function() {
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldTasks, function(task) {
            if (task.fails) $scope.tasks.push(task);
        });
    };

    $scope.sendmail = function() {
        var oldTasks = $scope.tasks;
        var body = $scope.failedtasks() + " tasks failed, check the notes!\n\n";

        $scope.tasks = [];
        angular.forEach(oldTasks, function(task) {
            if (task.fails) {
                $scope.tasks.push(task);
                body += 'task: ' + task.text + '\nnote: ' + task.note + "\n\n";
            }
        });
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