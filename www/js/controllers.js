angular.module('starter.controllers', [])

        .controller('AppCtrlLogin', function ($scope, $ionicSideMenuDelegate, $state, $ionicModal) {
            $scope.loginData = {};
            $scope.accountData = {};
            $ionicSideMenuDelegate.canDragContent(false);

            $scope.doLogin = function () {
                if (AFV.login($scope.loginData)) {
                    $state.go("app.home");
                    $ionicSideMenuDelegate.canDragContent(true);
                } else {
                    console.log("show error!!");
                }
            };

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/form_modal/create_account.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the Create Account to close it
            $scope.closeModal = function () {
                $scope.modal.hide();
                $scope.accountData = {};//Clear form
            };

            // Open the Create Account modal
            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.createAccount = function () {
                console.log("createAccount", $scope.accountData);
                var response = AFV.createAccount($scope.accountData);
                if (response) {
                    console.log("createAccount-Login", response);
                    $scope.loginData = response;
                    $scope.modal.hide();
                    $scope.accountData = {};//Clear form
                    $scope.doLogin();
                } else {
                    //TODO: Show error!!
                }
            };

        })

        .controller('AppCtrl', function ($scope) {
        })

        .controller('HomeCtrl', function ($scope, $state) {
            AFV.checkSession($state);
            $scope.userData = AFV.getUser();
            AFV.chartInit($scope.userData);
            // Called each time the slide changes
            $scope.slideChanged = function (index) {
                $scope.slideIndex = index;
            };
        })

        .controller('PresupuestosCtrl', function ($scope, $state, $ionicModal) {
            $scope.presupuestoData = {};
            AFV.checkSession($state);
            $scope.presupuestos = AFV.getPresupuestos();

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/form_modal/create_presupuesto.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the Create Presupuesto to close it
            $scope.closeModal = function () {
                $scope.modal.hide();
                $scope.presupuestoData = {};//Clear form
            };

            // Open the Create Account modal
            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.createPresupuesto = function () {
                console.log("createPresupuesto", $scope.presupuestoData);
                var response = AFV.createPresupuesto($scope.presupuestoData);
                if (response) {
                    $scope.closeModal();
                    $state.go($state.current, {}, {reload: true});
                } else {
                    //Show error
                }
            };



        })

        .controller('PresupuestoCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, $state) {
            AFV.checkSession($state);
            $scope.presupuesto = AFV.getPresupuesto($stateParams.presupuestoId);
            console.log($scope.presupuesto);

            $scope.goBack = function () {
                $ionicNavBarDelegate.back();
            };
        });
