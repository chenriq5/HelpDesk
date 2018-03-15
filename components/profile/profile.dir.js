(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .directive('profilebtn', profileBtn);

    function profileBtn() {
        return {
            templateUrl: 'components/profile/profile.tpl.html',
            controller: profileBtnController,
            controllerAs: 'profileBtnCtrl'
        }
    }

    function profileBtnController() {

        var vm = this;
        
        vm.visible = false;
        
        vm.showBlockOC = function () {
            if (vm.visible === true) {
                vm.visible = false;
            } else {
                vm.visible = true;
            }
        };
    }

})();
