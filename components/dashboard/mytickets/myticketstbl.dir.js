(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .directive('myticketstbl', myTicketsTbl);

    myTicketsTblController.$inject = ['CatalogService', 'TechnicianService', 'SharedDataService'];

    function myTicketsTbl() {
        return {
            templateUrl: 'components/dashboard/mytickets/myticketstbl.tpl.html',
            controller: myTicketsTblController,
            controllerAs: 'myTicketsTblCtrl'
        }
    }


    function myTicketsTblController(catalogService, technicianService, sharedData) {

        var vm = this;        

        vm.myTickets = technicianService.getMyTickets(sharedData.getLoggedInUser());
        console.log('size of myTickets: ' + vm.myTickets.length);            
        vm.catalogueService = catalogService;
        vm.technicianService = technicianService;
        
        vm.setWorkingTicket = function (ticket) {
            console.log('Ticket of table number: ' + ticket.number);
            sharedData.setWorkingTicket(ticket);
        }

    }

})();
