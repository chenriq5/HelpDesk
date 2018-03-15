

(function () {

    'use strict';

    angular
        .module('HelpDeskApp')
        .controller('KnowbaseController', knowbaseController);

    knowbaseController.$inject = ['CatalogService', 'TechnicianService', 'TicketService', 'SharedDataService'];

    function knowbaseController(catalogService, technicianService, ticketService, sharedData){

        var vm = this;
        
        var ctxS = document.getElementById('myChartS').getContext('2d');
        var myChartS = new Chart(ctxS, {
            type: 'pie',
            data: {
                labels: ["New", "Open", "Pending", "Solved"],
                datasets: [{
                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6"
                    ],
                    //data: [12, 19, 3, 17]
                    //                    data: function(){
                    //                        var array=[]
                    //                        array = ticketService.getTicketsByStatus();
                    //                        return array;
                    //                    }
                    data: ticketService.getTicketsByStatus(sharedData.getLoggedInUser())
                }]
            }
        });
        
        var ctxP = document.getElementById('myChartP').getContext('2d');
        var myChartP = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: ["Low", "Normal", "High", "Urgent"],
                datasets: [{
                    backgroundColor: [
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6"
                    ],
                    data: ticketService.getTicketsByPriority(sharedData.getLoggedInUser())
                }]
            }
        });
        

    }	
})();
