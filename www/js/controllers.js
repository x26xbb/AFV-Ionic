angular.module('starter.controllers', [])

        .controller('AppCtrlLogin', function($scope, $ionicSideMenuDelegate, $state) {
            $scope.loginData = {};
            $ionicSideMenuDelegate.canDragContent(false);

            $scope.doLogin = function() {
                if (AFV.login($scope.loginData)) {
                    $state.go("app.home");
                    $ionicSideMenuDelegate.canDragContent(true);
                } else {
                    console.log("show error!!");
                }
            };
        })

        .controller('AppCtrl', function($scope) {
        })

        .controller('HomeCtrl', function($scope, $state) {
            AFV.checkSession($state);
            $scope.userData = AFV.getUser();
            // Called each time the slide changes
            $scope.slideChanged = function(index) {
                $scope.slideIndex = index;
            };
        })

        .controller('PresupuestosCtrl', function($scope, $state) {
            AFV.checkSession($state);
            $scope.presupuestos = AFV.getPresupuestos();
        })

        .controller('PresupuestoCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state) {
            AFV.checkSession($state);
            $scope.presupuesto = AFV.getPresupuesto($stateParams.presupuestoId);
            console.log($scope.presupuesto);

            $scope.goBack = function() {
                $ionicNavBarDelegate.back();
            };
        });
