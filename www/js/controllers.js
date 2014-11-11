angular.module('starter.controllers', [])

        .controller('AppCtrlLogin', function($scope, $ionicSideMenuDelegate, $state, $ionicModal, $ionicPopup) {
            $scope.loginData = {};
            $scope.accountData = {};
            $ionicSideMenuDelegate.canDragContent(false);

            $scope.doLogin = function() {
                if (AFV.login($scope.loginData)) {
                    $state.go("app.home");
                    $ionicSideMenuDelegate.canDragContent(true);
                } else {
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Ocurrio un error ingresando al sistema! Vuelva a intentar...'
                    });
                }
            };

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/form_modal/create_account.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

            // Triggered in the Create Account to close it
            $scope.closeModal = function() {
                $scope.modal.hide();
                $scope.accountData = {};//Clear form
            };

            // Open the Create Account modal
            $scope.openModal = function() {
                $scope.modal.show();
            };

            $scope.createAccount = function() {
                console.log("createAccount", $scope.accountData);
                var response = AFV.createAccount($scope.accountData);
                if (response) {
                    console.log("createAccount-Login", response);
                    $scope.loginData = response;
                    $scope.modal.hide();
                    $scope.accountData = {};//Clear form
                    $scope.doLogin();
                } else {
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Ocurrio un error creado su cuenta! Vuelva a intentar...'
                    });
                }
            };

        })

        .controller('AppCtrl', function($scope) {
        })

        .controller('HomeCtrl', function($scope, $state) {
            AFV.checkSession($state);
            $scope.userData = AFV.getUser();
            AFV.chartInit($scope, $scope.userData.user.presupuestos[0]);
            // Called each time the slide changes
            $scope.slideChanged = function(index) {
                $scope.slideIndex = index;
            };
        })

        .controller('PresupuestosCtrl', function($scope, $state, $ionicModal, $ionicPopup) {
            $scope.presupuestoData = {};
            AFV.checkSession($state);
            $scope.presupuestos = AFV.getPresupuestos();

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/form_modal/create_presupuesto.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

            // Triggered in the Create Presupuesto to close it
            $scope.closeModal = function() {
                $scope.modal.hide();
                $scope.presupuestoData = {};//Clear form
            };

            // Open the Create Account modal
            $scope.openModal = function() {
                $scope.modal.show();
            };

            $scope.createPresupuesto = function() {
                console.log("createPresupuesto", $scope.presupuestoData);
                var response = AFV.createPresupuesto($scope.presupuestoData);
                if (response) {
                    $scope.closeModal();
                    $state.go($state.current, {}, {reload: true});
                } else {
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Ocurrio un error creado este presupuesto! Vuelva a intentar...'
                    });
                }
            };



        })

        .controller('PresupuestoCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state, $ionicModal, $ionicPopup) {
            AFV.checkSession($state);
            $scope.categoriaData = {};
            $scope.presupuesto = AFV.getPresupuesto($stateParams.presupuestoId);
            AFV.chartInit($scope, $scope.presupuesto);
            console.log($scope.presupuesto);
            $scope.goBack = function() {
                $ionicNavBarDelegate.back();
            };

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/form_modal/create_categoria.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

            // Triggered in the Create Account to close it
            $scope.closeModal = function() {
                $scope.modal.hide();
                $scope.categoriaData = {};//Clear form
            };

            // Open the Create Account modal
            $scope.openModal = function() {
                $scope.modal.show();
            };
            $scope.createCategoria = function() {
                console.log("createCategoria", $scope.categoriaData);
                var response = AFV.createCategoria($scope.categoriaData, $stateParams.presupuestoId);
                if (response) {
                    $scope.closeModal();
                    $state.go($state.current, {}, {reload: true});
                } else {
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Ocurrio un error creado esta categoria! Vuelva a intentar...'
                    });
                }
            };

        })

        .controller('CategoriaCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state, $ionicModal, $ionicPopup) {
            AFV.checkSession($state);
            $scope.gastoData = {};
            $scope.categoria = AFV.getCategoria($stateParams.presupuestoId, $stateParams.categoriaId);

            $scope.goBack = function() {
                $ionicNavBarDelegate.back();
            };

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/form_modal/create_gasto.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });

            // Triggered in the Create Account to close it
            $scope.closeModal = function() {
                $scope.modal.hide();
                $scope.gastoData = {};//Clear form
            };

            // Open the Create Account modal
            $scope.openModal = function() {
                $scope.modal.show();
            };

            $scope.createGasto = function() {
                console.log("createGasto", $scope.gastoData);
                var response = AFV.createGasto($scope.gastoData, $stateParams.presupuestoId, $stateParams.categoriaId);
                if (response) {
                    $scope.closeModal();
                    $state.go($state.current, {}, {reload: true});
                } else {
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Ocurrio un error creado este gasto! Vuelva a intentar...'
                    });
                }
            };




        });

