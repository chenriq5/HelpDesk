(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .controller('techDashboardController', TechDashboardController);
    
    function TechDashboardController(){
        var vm = this;
        vm.tab = 1;        
        vm.visible = false;

        vm.setTabValue = function(tabValue) {            
            vm.tab = tabValue;
        }                
        vm.isTabSelected = function(tabValue) {
            return vm.tab === tabValue;        
        }	

        vm.vamo = function(){
            alert('techDC:' + (vm.statusFilter ? vm.statusFilter.id : 'nothing' ));
        }
        
    }

})();