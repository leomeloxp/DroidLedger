angular.module('starter.controllers', [])

.factory('transactionsList', function() {
  var transactions = [
    {
      id: 1,
      payee: "Month Wage",
      date: "2015/07/01",
      consolidated: true,
      accounts: [
      {
        name: ["assets", "bank", "current"],
        amount: "1500.00",
        currency: "£"
      }, {
        name: ["income", "wage"],
        amount: null,
        currency: "£"
      }]
    },
    {
      id: 2,
      payee: "Gym fee",
      date: "2015/07/02",
      consolidated: true,
      accounts: [
      {
        name: ["expenses", "personal", "sports"],
        amount: "40.00",
        currency: "£"
      }, {
        name: ["assets", "bank", "current"],
        amount: null,
        currency: "£"
      }]
    },
    {
      id: 3,
      payee: "Takeaway Food",
      date: "2015/07/03",
      consolidated: true,
      accounts: [
      {
        name: ["expenses", "food", "takeaway"],
        amount: "15.00",
        currency: "£"
      }, {
        name: ["assets", "bank", "current"],
        amount: null,
        currency: "£"
      }
      ]
    },
    {
      id: 4,
      payee: "Takeaway Food 2",
      date: "2015/07/04",
      consolidated: true,
      accounts: [
      {
        name: ["expenses", "food", "takeaway"],
        amount: "20.00",
        currency: "£"
      }, {
        name: ["assets", "bank", "current"],
        amount: null,
        currency: "£"
      }
      ]
    }
  ];

  return {
  transactions: function () {
  return transactions;
},

  categories: function() {
    var categories = [
    {"name": ["assets", "bank", "current"], "amount": "1500.00", "currency": "£"},
    {"name": ["expenses"], "amount": "75.00", "currency": "£"},
    {"name": ["expenses", "food", "takeaway"], "amount": "35.00", "currency": "£"},
    {"name": ["expenses", "personal", "sports"], "amount": "40.00", "currency": "£"}];
    return categories;
  },

  add: function(transaction) {
    transactions.push(transaction);
  }
};
})

.factory('transactionHolding', function() {
  var transaction = {};

  return {
    get: function() {
      return transaction;
    },
    set: function(t) {
      transaction = t;
    }
  };


})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AddCtrl', ['$scope', '$stateParams', 'transactionsList', function($scope, $stateParams, transactionsList) {

  console.log("State " + $stateParams.transaction);

  $scope.update = function() {
    console.log($scope.transaction);
    transactionsList.add($scope.transaction);
  };
}])

.controller('BalanceCtrl', ['$scope', 'transactionsList', function($scope, transactionsList) {
  var categories = transactionsList.categories();
  categories.forEach(function(category){
    category.name = category.name.join(":");
  });
  console.log(categories);
  $scope.accounts = categories;
}])

.controller('EditCtrl', ['$scope', 'transactionHolding', "transactionsList", function($scope, transactionHolding, transactionsList) {
  $scope.transactions = transactionsList.transactions();
  $scope.transaction = transactionHolding.get();
  console.log($scope.transaction);
}])

.controller('RecentCtrl', ['$scope', '$state', 'transactionHolding', 'transactionsList', function($scope, $state, transactionHolding, transactionsList) {
  $scope.transactions = transactionsList.transactions();
  $scope.edit = function (transaction) {
    console.log(transaction);
    transactionHolding.set(transaction);
    $state.go("app.edit");
  };
}]);
