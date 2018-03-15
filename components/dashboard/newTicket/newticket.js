

(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .controller('NewTicketController', newTicketController);

    newTicketController.$inject = ['CatalogService', 'TechnicianService', 'TicketService'];

    function newTicketController(catalogService, technicianService, ticketService){
        
        var vm = this;
        
        vm.ticketTypes = catalogService.getIssueTypes();
        vm.priorityLevels = catalogService.getPriorities();
        vm.statusType = catalogService.getStatuses();
        vm.groups = catalogService.getGroups();
        vm.ticket = {};

        vm.createTicket = function(ticket) {            
            if(ticket){	
                vm.submited = true;
                console.log('array size: '+ticketService.getAllTickets().length);
                ticketService.createTicket(ticket);
                console.log('new array size: '+ticketService.getAllTickets().length);
                vm.resetForm();
            }
        }

        vm.resetForm = function(){
            vm.myForm.$setPristine();
            vm.myForm.$setUntouched();
            vm.ticket = {};		
        }
    }	
})();
