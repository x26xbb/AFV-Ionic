angular.module('starter.controllers', [])
        .controller('AppCtrlLogin', function($scope, $ionicSideMenuDelegate, $state, $ionicModal, $ionicPopup) {
            $scope.loginData = {};
            $scope.accountData = {};
            AFV.showProfileButton = false;
            //AFV.preLogin();
            $ionicSideMenuDelegate.canDragContent(false);
            $scope.doLogin = function() {
                if (AFV.login($scope.loginData)) {
                    $state.go("app.home");
                    $ionicSideMenuDelegate.canDragContent(true);
                    AFV.showProfileButton = true;
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
                $scope.accountData = {}; //Clear form
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
                    $scope.accountData = {}; //Clear form
                    $scope.doLogin();
                } else {
                    $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Ocurrio un error creando su cuenta! Vuelva a intentar...'
                    });
                }
            };
        })

        .controller('AppCtrl', function($scope) {
            $scope.showProfileButton = function (){
                return AFV.showProfileButton;
            };
        })
        .controller('PrestamosCtrl', function($scope) {
            $scope.prestamoData = {};

            $scope.calcpayments = function() {
                console.log("calcpayments");
                var nprice = $scope.prestamoData.nprice;
                var interest = $scope.prestamoData.rate;
                var dpayment = $scope.prestamoData.payment;
                var plazo = $scope.prestamoData.plazo;

                var result = (((nprice * (interest / 100)) + nprice) - dpayment) / plazo;

                $("#monthlypayment").html("¢" + result);
                $("#resultado").show();
            };
            $scope.buttonReset = function() {
                $scope.prestamoData = {};
                $("#resultado").hide();
            };
        })
        .controller('HomeCtrl', function($scope, $state) {
            AFV.checkSession($state);
            $scope.userData = AFV.getUser();
            AFV.tempPresupuestos = $scope.userData.user.presupuestos;
            $(function() {
                $scope.$on('$viewContentLoaded', function() {
                    setTimeout(function() {
                        AFV.chartInitHome();
                        AFV.showUs();
                    }, AFV.timeOut);
                });
            });

            // Called each time the slide changes
            $scope.slideChanged = function(index) {
                $scope.slideIndex = index;
            };

        })

        .controller('PresupuestosCtrl', function($scope, $state, $ionicModal, $ionicPopup) {
            $scope.presupuestoData = {};
            AFV.checkSession($state);
            $scope.presupuestos = AFV.getPresupuestos();
            $scope.$on('$viewContentLoaded', function() {
                if (!$scope.presupuestos || $scope.presupuestos.length === 0) {
                    $("#presupuestos").addClass("hide");
                    $("#noPresupuestosCard").removeClass("hide");
                }
            });
            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/form_modal/create_presupuesto.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
            });
            // Triggered in the Create Presupuesto to close it
            $scope.closeModal = function() {
                $scope.modal.hide();
                $scope.presupuestoData = {}; //Clear form
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
                        template: 'Ocurrio un error creando este presupuesto! Vuelva a intentar...'
                    });
                }
            };
            $scope.deletePresupuesto = function($event, presupuestoNombre, presupuestoId) {
                $event.preventDefault();
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Borrar Presupuesto',
                    template: 'Está seguro que desea borrar el presupuesto ' + presupuestoNombre + '?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        var response = AFV.deletePresupuesto(presupuestoId);
                        if (response) {
                            $state.go($state.current, {}, {reload: true});
                        } else {
                            $ionicPopup.alert({
                                title: 'Error!',
                                template: 'Ocurrio un error al eliminar este presupuesto! Vuelva a intentar...'
                            });
                        }
                    }
                });
            };
        })

        .controller('PresupuestoCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state, $ionicModal, $ionicPopup) {
            AFV.checkSession($state);
            $scope.categoriaData = {};
            $scope.presupuesto = AFV.getPresupuesto($stateParams.presupuestoId);

            $(function() {
                $scope.$on('$viewContentLoaded', function() {
                    setTimeout(function() {
                        AFV.chartInit($scope.presupuesto);
                    }, AFV.timeOut);
                });
            });

            console.log($scope.presupuesto);
            $scope.$on('$viewContentLoaded', function() {
                if (!$scope.presupuesto.categorias || $scope.presupuesto.categorias.length === 0) {
                    $("#categorias").addClass("hide");
                    $("#noCategoriasCard").removeClass("hide");
                }
            });
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
                $scope.categoriaData = {}; //Clear form
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
                        template: 'Ocurrio un error creando esta categoria! Vuelva a intentar...'
                    });
                }
            };
            $scope.deleteCategoria = function($event, categoriaNombre, categoriaId) {
                $event.preventDefault();
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Borrar Categoria',
                    template: 'Está seguro que desea borrar la categoria ' + categoriaNombre + '?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        var response = AFV.deleteCategoria($stateParams.presupuestoId, categoriaId);
                        if (response) {
                            $state.go($state.current, {}, {reload: true});
                        } else {
                            $ionicPopup.alert({
                                title: 'Error!',
                                template: 'Ocurrio un error al eliminar esta categoria! Vuelva a intentar...'
                            });
                        }
                    }
                });
            };
        })

        .controller('CategoriaCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $state, $ionicModal, $ionicPopup) {
            AFV.checkSession($state);
            $scope.gastoData = {};
            $scope.categoria = AFV.getCategoria($stateParams.presupuestoId, $stateParams.categoriaId);
            $scope.$on('$viewContentLoaded', function() {
                if (!$scope.categoria.gastos || $scope.categoria.gastos.length === 0) {
                    $("#gastos").addClass("hide");
                    $("#noGastosCard").removeClass("hide");
                }
            });
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
                $scope.gastoData = {}; //Clear form
            };
            // Open the Create Account modal
            $scope.openModal = function() {
                $scope.modal.show();
            };
            $scope.deleteGasto = function($event, gastoNombre, gastoId) {
                $event.preventDefault();
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Borrar Gasto',
                    template: 'Está seguro que desea borrar el gasto ' + gastoNombre + '?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        var response = AFV.deleteGasto($stateParams.presupuestoId, $stateParams.categoriaId, gastoId);
                        if (response) {
                            $state.go($state.current, {}, {reload: true});
                        } else {
                            $ionicPopup.alert({
                                title: 'Error!',
                                template: 'Ocurrio un error al eliminar este gasto! Vuelva a intentar...'
                            });
                        }
                    }
                });
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
                        template: 'Ocurrio un error creando este gasto! Vuelva a intentar...'
                    });
                }
            };
        });
       

