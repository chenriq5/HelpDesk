(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .controller('MyTicketsController', myTicketsController);

    myTicketsController.$inject = ['CatalogService', 'TechnicianService', 'SharedDataService'];

    function myTicketsController(catalogService, technicianService, sharedData){
        var vm = this;
        
        vm.priorities = catalogService.getPriorities();
        vm.statuses = catalogService.getStatuses();
        
        vm.myTickets = technicianService.getMyTickets(sharedData.getLoggedInUser());
        
        vm.setWorkingTicket = function(ticket){
            console.log('Ticket of table number: ' + ticket.number);
            sharedData.setWorkingTicket(ticket);
        }
    
    }	
})();
