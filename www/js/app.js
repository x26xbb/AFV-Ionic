// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('app.asesoramiento', {
                        url: "/asesoramiento",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/asesoramiento.html",
                                controller: 'AsesoramientoCtrl'
                            }
                        }
                    })
                    .state('app.cuentas', {
                        url: "/cuentas",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/cuentas.html",
                                controller: 'ProfileCtrl'
                            }
                        }
                    })
                    .state('app.profile', {
                        url: "/profile",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/profile.html",
                                controller: 'ProfileCtrl'
                            }
                        }
                    })
                    .state('app.settings', {
                        url: "/settings",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/settings.html",
                                controller: 'ProfileCtrl'
                            }
                        }
                    })
                    .state('app.prestamos', {
                        url: "/prestamos",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/prestamos.html",
                                controller: 'PrestamosCtrl'
                            }
                        }
                    })
                    .state('app.home', {
                        url: "/home",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/home.html",
                                controller: 'HomeCtrl'
                            }
                        }
                    })
                    .state('app.presupuestos', {
                        url: "/presupuestos",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/presupuestos.html",
                                controller: 'PresupuestosCtrl'
                            }
                        }
                    })

                    .state('app.presupuesto', {
                        url: "/presupuestos/:presupuestoId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/presupuesto.html",
                                controller: 'PresupuestoCtrl'
                            }
                        }
                    })

                    .state('app.categoria', {
                        url: "/presupuestos/:presupuestoId/categorias/:categoriaId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/categoria.html",
                                controller: 'CategoriaCtrl'
                            }
                        }
                    })


                    .state('app.login', {
                        url: "/",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/login.html",
                                controller: 'AppCtrlLogin'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback


            $urlRouterProvider.otherwise('/app/');


        });

