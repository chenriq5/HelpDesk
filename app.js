(function () {

    'use strict';

    angular
        .module('HelpDeskApp', ['auth0.lock', 'angular-jwt', 'ui.router'])
        .config(config)
        .controller('appController', AppController);

    config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider', '$locationProvider', '$httpProvider'];

    function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider, $locationProvider, $httpProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                controller: 'HomeController',
                templateUrl: 'components/home/home.html',                
                controllerAs: 'vm'
            })
            .state('techdashboard', {
                url: '/techdashboard',
                controller: 'techDashboardController',
                controllerAs: 'techDashCtrl',
                data: { requiresLogin:true },
                templateUrl: 'components/dashboard/tech-dashboard.html'
            })
            .state('techdashboard.newTicket', {
                url: '/newticket',
                controller: 'NewTicketController',
                controllerAs: 'newTicketCtrl',
                data: { requiresLogin:true },
                templateUrl: 'components/dashboard/newTicket/newTicket.html'
            })
            .state('techdashboard.myTickets', {
                url: '/mytickets',
                controller: 'MyTicketsController',
                controllerAs: 'myTicketsCtrl',
                data: { requiresLogin:true },
                templateUrl: 'components/dashboard/viewTickets/viewTickets.html'
            })
            .state('techdashboard.myTickets.editTicket' ,  {
                url:"/editticket",
                controller: 'EditTicketController',
                controllerAs: 'editTicketCtrl',
                data: { requiresLogin: true  },
                templateUrl: 'components/dashboard/editTicket/editticket.html'
             })
            .state('techdashboard.knowbase', {
                url: '/knowbase',
                controller: 'KnowbaseController',
                controllerAs: 'knowbaseCtrl',
                data: { requiresLogin:true },
                templateUrl: 'components/dashboard/knowbase/knowbase.html'
            });

        lockProvider.init({
            clientID: AUTH0_CLIENT_ID,
            domain: AUTH0_DOMAIN,
            redirectUri: window.location.href,
            //responseType: 'token id_token',
            options: {
                _idTokenVerification: false,
                rememberLastLogin: false,
                usernameStyle: 'username',
                theme: {
                    logo: 'images/hd-icon.png',
                    labeledSubmitButton: false
                },
                languageDictionary: {
                    title: 'HelpDesk HD',
                    signUpLabel: 'New Tech?'
                },
                auth: {
                    //autoParseHash: false,
                    redirect: true
                }
            }
        });
        
        // Add the jwtInterceptor to the array of HTTP interceptors
        // so that JWTs are attached as Authorization headers
        $httpProvider.interceptors.push('jwtInterceptor');
        
        $urlRouterProvider.otherwise('/home');

        // Configuration for angular-jwt
        jwtOptionsProvider.config({
            tokenGetter: ['options', function (options) {
                if (options && options.url.substr(options.url.length - 5) == '.html') {
                    return null;
                }
                return localStorage.getItem('id_token');
            }],
            whiteListedDomains: ['localhost'],
            unauthenticatedRedirectPath: '/home'
        });
        /* $locationProvider.html5Mode({
            enabled: true
        });*/
        //$locationProvider.hashPrefix('');
    }

    AppController.$inject = ['authService', 'SharedDataService'];

    function AppController(authService, sharedData) {
        var vm = this;
        vm.authService = authService;
        
        authService.getProfileDeferred().then(function (profile) {
            vm.profile = profile;
            sharedData.setLoggedInUser({id: profile.nickname});
        });
        
        vm.tab = 1;        
        vm.visible = false;

        vm.setTabValue = function(tabValue) {            
            vm.tab = tabValue;
        }                
        vm.isTabSelected = function(tabValue) {
            return vm.tab === tabValue;        
        }	

        vm.showBlockOC = function() {
            if(vm.visible === true) {
                vm.visible = false;
            }
            else {
                vm.visible = true;
            }
        };
    }

})();
