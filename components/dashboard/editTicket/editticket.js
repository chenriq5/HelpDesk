(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .controller('EditTicketController', editTicketController);

    editTicketController.$inject = ['CatalogService', 'TechnicianService', 'SharedDataService', 'TicketService'];

    function editTicketController(catalogService, technicianService, sharedData, ticketService){
        
        var vm = this;
        
        
        vm.priorities = catalogService.getPriorities();
        vm.statuses = catalogService.getStatuses();
        
        
        vm.workingTicket = sharedData.getWorkingTicket();
        
        vm.editTicket = function(ticket) {
            if(ticket){                   
                    console.log('UPDAAAAAAAAA:' + sharedData.getTicketIndexInMock(ticket));
                ticketService.updateTicket(ticket, sharedData.getTicketIndexInMock(ticket));
                    sharedData.resetWorkingTicket();
                    vm.resetForm();
                }
        }
        
        vm.resetForm = function(){
            vm.editForm.$setPristine();
            vm.editForm.$setUntouched();
            vm.workingTicket = {};
            vm.workingTicket = sharedData.getWorkingTicket();            
        }
    }	
})();
