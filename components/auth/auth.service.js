(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .service('authService', authService);

    authService.$inject = ['lock', 'authManager', '$location', '$state', '$q', '$rootScope'];

    function authService(lock, authManager, $location, $state, $q, $rootScope) {
        
        var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
        
        var deferredProfile = $q.defer();

        if (userProfile) {
            deferredProfile.resolve(userProfile);
        }
        
        function login() {
            lock.show();
        }

        // Logging out just requires removing the user's
        // id_token and profile
        function logout() {
            deferredProfile = $q.defer();
            localStorage.removeItem('id_token');
            localStorage.removeItem('profile');
            authManager.unauthenticate();
            $location.path('/home');
            userProfile = null;
        }

        // Set up the logic for when a user authenticates
        // This method is called from app.run.js
        function registerAuthenticationListener() {
            lock.on('authenticated', function (authResult) {
                localStorage.setItem('id_token', authResult.idToken);                
                authManager.authenticate();
                lock.getProfile(authResult.idToken, function (error, profile) {
                    if (error) {
                        return console.log(error);
                    }
                    localStorage.setItem('profile', JSON.stringify(profile));
                    deferredProfile.resolve(profile);
                });
                $location.path('/techdashboard/newticket');
                //$state.go('techdashboard.newTicket');
            });

            lock.on('authorization_error', function (err) {
                console.log(err);
            });
        }
        
        $rootScope.$on('$stateChangeStart', function(event, nextRoute) {
            if(nextRoute.requiresLogin === true) {
                if (!authService.isAuthenticated) {
                    $state.go('home');;
                    return event.preventDefault();
                }
            }
        });
        
        function getProfileDeferred() {
            return deferredProfile.promise;
        }

        return {
            login: login,
            logout: logout,
            registerAuthenticationListener: registerAuthenticationListener,
            getProfileDeferred: getProfileDeferred
        }
    }
})();
