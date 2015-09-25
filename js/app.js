var app = angular.module('not-angry-angular', ['ui.router']);

app.config(function ($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html',
      authenticate: true
    })
    .state('about.potter', {
      url: '/potter',
      templateUrl: 'partials/list.html',
      controller: function ($scope) {
        $scope.list = [
          "Draco Malfoy",
          "Ernie Macmillan",
          "Irma Pince",
          "Rufus Scrimgeour"
        ];
      }
    })
    .state('about.lotr', {
      url: '/lotr',
      templateUrl: '/partials/list.html',
      controller: function ($scope) {
        $scope.list = [
          "Frodo Baggins",
          "Peregrin Took",
          "Sauron",
          "Gollum",
          "Aragorn"
        ];
      }
    });
});


app.run(function ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !AuthService.isAuthenticated()){
        // User isn’t authenticated
        $state.transitionTo("home");
        event.preventDefault();
      }
    });
  });
