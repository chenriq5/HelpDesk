(function () {

        'use strict';

        angular
            .module('HelpDeskApp')
            .factory('LoginService', ['$http', loginService])
            .service('CatalogService', ['$http', catalogService])
            .service('TechnicianService', ['$http', technicianService])
            .service('TicketService', ['$http', ticketService])
            .service('SharedDataService', sharedData);

        loginService.$inject = ['$http'];
        catalogService.$inject = ['$http'];
        technicianService.$inject = ['$http'];
        ticketService.$inject = ['$http'];

        /****************************************************************************************************************
	 					L O G I N		S E R V I C E
	 ****************************************************************************************************************/
        function loginService($http) {
            var validUserCredentialss = function (user) {
                var request = {
                    method: 'POST',
                    url: '/HelpDesk/LoginController',
                    data: user
                };

                var promise = $http(request)
                    .then(
                        function (serverResponse) {
                            console.log(serverResponse.data.isValid);
                            return serverResponse.data.isValid;
                        },
                        function (error) {
                            return {
                                message: 'error while connecting to the server'
                            };
                        }
                    );
                return promise;
            }

            return {
                validUserCredentials: validUserCredentialss
            };
        }

        /****************************************************************************************************************
		C A T A L O G		S E R V I C E
	 ****************************************************************************************************************/
        function catalogService($http) {
            var groups = function () {
                return mockGroups;
            }
            var issueTypes = function () {
                return mockIssueTypes;
            };
            var priorities = function () {
                return mockPriorities;
            };
            var statuses = function () {
                return mockStatuses;
            };
            var prNameInCtlg = function (id) {
                for (var i = 0; i < mockPriorities.length; i++) {
                    //console.log(collection[i].id);
                    if (mockPriorities[i].id === id)
                        return mockPriorities[i].level;
                }
            }  
            var stNameInCtlg = function (id) {
                for (var i = 0; i < mockStatuses.length; i++) {
                    //console.log(collection[i].id);
                    if (mockStatuses[i].id === id)
                        return mockStatuses[i].status;
                }
            }   
            var grNameInCtlg = function (id) {
                for (var i = 0; i < mockGroups.length; i++) {
                    //console.log(collection[i].id);
                    if (mockGroups[i].id === id)
                        return mockGroups[i].groupName;
                }
            }  
            
            var itNameInCtlg = function (id) {
                for (var i = 0; i < mockIssueTypes.length; i++) {
                    //console.log(collection[i].id);
                    if (mockIssueTypes[i].id === id)
                        return mockIssueTypes[i].typeName;
                }
            }   

            return {
                getGroups: groups,
                getIssueTypes: issueTypes,
                getPriorities: priorities,
                getStatuses: statuses,
                getPrNameInCtlg: prNameInCtlg,
                getStNameInCtlg: stNameInCtlg,
                getGrNameInCtlg: grNameInCtlg,
                getItNameInCtlg: itNameInCtlg
            }

        }

        /****************************************************************************************************************
		T E C H N I C I A N		S E R V I C E
	 ****************************************************************************************************************/
        function technicianService() {
            var updateTicket = function (ticket, index) {
                angular.copy(ticket, mockTickets[index]);
            }

            var myTickets = function (tech) {
                var ticketsById = [];
                mockTickets.forEach(function (t) {
                    if (t.group.tech.id === tech.id) {
                        ticketsById.push(t);
                    }
                });
                return ticketsById;
            }

            var techName = function (tech) {
                for (var i = 0; i < mockGroups.length; i++) {
                    var group = mockGroups[i];
                    for (var j = 0; j < group.techs.length; j++) {
                        var techInMock = group.techs[j];
                        if (techInMock.id === tech.id)
                            return techInMock.techName;
                    }
                }
            }
                return {
                    updateTicket: updateTicket,
                    getMyTickets: myTickets,
                    getTechName: techName
                }

            }

            /****************************************************************************************************************
		T I C K E T 		S E R V I C E
	 ****************************************************************************************************************/
            function ticketService() {
                var updateTicket = function (ticket, index) {
                    console.log('UPDATING ' + index);
                    angular.copy(ticket, mockTickets[index]);
                }

                var allTickets = function () {
                    return mockTickets;
                }
                
                var createTickett = function(ticket){                    
                    ticket.number = getTicketNextSeq();
                    mockTickets.push(ticket);
                }
                
                var ticketsByStatus = function(tech){                    
                    var array = [];
                    var counL = 0;
                    var counN = 0;
                    var counH = 0;
                    var counU = 0;
                    for(var i=0; i<mockTickets.length; i++){
                        if((mockTickets[i].status.id === 11) && (tech.id === mockTickets[i].group.tech.id)){
                            counL++;
                        }
                        if((mockTickets[i].status.id === 22) && (tech.id === mockTickets[i].group.tech.id)){
                            counN++;
                        }
                        if((mockTickets[i].status.id === 33) && (tech.id === mockTickets[i].group.tech.id)){
                            counH++;
                        }
                        if((mockTickets[i].status.id === 44) && (tech.id === mockTickets[i].group.tech.id)){
                            counU++;
                        }
                    }
                    array.push(counL);
                    array.push(counN);
                    array.push(counH);
                    array.push(counU);
                    return array;
                }
                
                var ticketsByPriority = function(tech){                    
                    var array = [];
                    var counL = 0;
                    var counN = 0;
                    var counH = 0;
                    var counU = 0;
                    for(var i=0; i<mockTickets.length; i++){
                        if((mockTickets[i].priority.id === 10) && (tech.id === mockTickets[i].group.tech.id)){
                            counL++;
                        }
                        if((mockTickets[i].priority.id === 20) && (tech.id === mockTickets[i].group.tech.id)){
                            counN++;
                        }
                        if((mockTickets[i].priority.id === 30) && (tech.id === mockTickets[i].group.tech.id)){
                            counH++;
                        }
                        if((mockTickets[i].priority.id === 40) && (tech.id === mockTickets[i].group.tech.id)){
                            counU++;
                        }
                    }
                    array.push(counL);
                    array.push(counN);
                    array.push(counH);
                    array.push(counU);
                    return array;
                }
                
                function getTicketNextSeq(){
                    return mockTickets[mockTickets.length-1].number + 1;
                }
                
                return {
                    updateTicket: updateTicket,
                    getAllTickets: allTickets,
                    createTicket: createTickett,
                    getTicketsByStatus: ticketsByStatus,
                    getTicketsByPriority: ticketsByPriority
                }

            }

            /****************************************************************************************************************
		S H A R E D   D A T A	S E R V I C E
	 ****************************************************************************************************************/
            function sharedData() {
                var workingTicket = {};
                var workingTicketIndex = -1;
                var loggedInUser = {
                    id: ''
                };

                return {
                    getWorkingTicketIndex: function () {
                        //console.log('Working ticket index: ' + workingTicketIndex); 
                        return workingTicketIndex;
                    },
                    getWorkingTicket: function () {
                        console.log('Working ticket number: ' + workingTicket.number);
                        return workingTicket;
                    },
                    resetWorkingTicket: function () {
                        workingTicketIndex = -1;
                        workingTicket = {};
                    },
                    setWorkingTicket: function (ticket, index) {
                        console.log('Working ticket number: ' + workingTicket.number + '[' + workingTicketIndex + '] ' + 'setting ticket index: ' + ticket.number + '[' + index + ']');
                        angular.copy(ticket, workingTicket);
                        workingTicketIndex = index;
                    },
                    setLoggedInUser: function (tech) {
                        loggedInUser = tech;
                    },
                    getLoggedInUser: function (tech) {
                        return loggedInUser;
                    },
                    getTicketIndexInMock: function (ticket) {
                        for (var i = 0; i < mockTickets.length; i++) {
                            console.log(mockTickets[i].number);
                            if (mockTickets[i].number === ticket.number)
                                return i;
                        }
                    }
                };
            }

            /****************************************************************************************************************
		M O C K 		D A T A         -       D U M M Y   O B J E C T S   ! ! !
	 ****************************************************************************************************************/
            var mockIssueTypes = [
                {
                    id: 100,
                    typeName: 'Question',
        },
                {
                    id: 200,
                    typeName: 'Incident'
        },
                {
                    id: 300,
                    typeName: 'Problem'
        },
                {
                    id: 400,
                    typeName: 'Task'
        },
                {
                    id: 500,
                    typeName: 'Other'
        }
    ];

            var mockPriorities = [
                {
                    id: 10,
                    level: 'Low', // anmendoz
                    sla_tr_inHours: 48
        },
                {
                    id: 20,
                    level: 'Normal', // anmendoz
                    sla_tr_inHours: 24
        },
                {
                    id: 30,
                    level: 'High', // anmendoz
                    sla_tr_inHours: 4
        },
                {
                    id: 40,
                    level: 'Urgent', // anmendoz
                    sla_tr_inHours: 2
        }
    ];

            var mockGroups = [ // priority 10.20.30.40
                { // issueType 100.200.300.400.500
                    id: 111, // status   11.22.33.44
                    groupName: 'Tier 1 - Software',
                    techs: [
                        {
                            id: 'anmendoz',
                            techName: 'Angel Mendoza'
                },
                        {
                            id: 'chenriq5',
                            techName: 'Cassandre Henriquez'
                }
            ]
        },
                {
                    id: 222,
                    groupName: 'Tier 2 - Software',
                    techs: [
                        {
                            id: 'bhavyan',
                            techName: 'Bhavya Nannapaneni'
                },
                        {
                            id: 'krisp',
                            techName: 'Kris Pinga'
                },
                        {
                            id: 'prudvii',
                            techName: 'Prudvi Ineni'
                }
            ]
        },
                {
                    id: 333,
                    groupName: 'Tier 1 - Hardware',
                    techs: [
                        {
                            id: 'rford',
                            techName: 'Russell Ford'
                },
                        {
                            id: 'brodyb',
                            techName: 'Brody Blickle'
                }
            ]
        },
                {
                    id: 444,
                    groupName: 'Tier 2 - Hardware',
                    techs: [
                        {
                            id: 'sunilk',
                            techName: 'Sunil Khatri'
                },
                        {
                            id: 'anishs',
                            techName: 'Anish Singam'
                }
            ]
        }
    ];

            var mockStatuses = [
                {
                    id: 11,
                    status: 'New'
        },
                {
                    id: 22,
                    status: 'Open'
        },
                {
                    id: 33,
                    status: 'Pending'
        },
                {
                    id: 44,
                    status: 'Solved'
        }

    ];

    var mockTickets = [
        {
            number: 1,
            endUser: {
                email: 'carl.johnson@live.com',
                fname: 'Carl',
                lname: 'Johnson',
                phoneNumber:1111111111
            },
            group: {
                id: 111,
                tech: {
                    id: 'anmendoz',
                    name: 'Angel Mendoza'
                }
            },
            priority: {
                id: 10
            },
            issueType: {
                id: 500
            },
            status: {
                id: 33
            },
            description: 'Customer is complaining about his mobile service. Signal is too low.',
            sla_creation_dt : '05/09/2017 10:31',
            sla_expected_dt:'05/09/2017 15:31',
            sla_archive_dt: ''
        },
        {
            number: 2,
            endUser: {
                email: 'johan@yahoo.com',
                fname: 'Johan',
                lname: 'Mendez',
                phoneNumber:2222222222
            },
            group: {
                id: 111,
                tech: {
                    id: 'chenriq5'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 400
            },
            status: {
                id: 44
            },
            description: 'Customer is complaining about his internet service. He says internet does not work at all.',
            sla_creation_dt : '05/11/2017 11:42',
            sla_expected_dt:'05/11/2017 15:42',
            sla_archive_dt: '05/11/2017 15:22'
        },
        {
            number: 3,
            endUser: {
                email: 'pedro.bara@live.com',
                fname: 'Pedro',
                lname: 'Barahona',
                phoneNumber: 3333333333
            },
            group: {
                id: 222,
                tech: {
                    id: 'bhavyan'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 500
            },
            status: {
                id: 22
            },
            description: 'Pedro is requesting a new computer because his current laptop is too slow',
            sla_creation_dt : '05/08/2017 12:32',
            sla_expected_dt:'05/08/2017 18:32',
            sla_archive_dt: ''
        },
        {
            number: 4,
            endUser: {
                email: 'ed.ruiz@live.com',
                fname: 'Ed',
                lname: 'Ruiz',
                phoneNumber: 4444444444
            },
            group: {
                id: 222,
                tech: {
                    id: 'prudvii'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 11
            },
            description: 'Ed ruiz is complaining about his access to the local network. He says he gets the -not connected- message',
            sla_creation_dt : '05/10/2017 15:17',
            sla_expected_dt:'05/11/2017 10:17',
            sla_archive_dt: ''
        },
        {
            number: 5,
            endUser: {
                email: 'francisco.rodrig@live.com',
                fname: 'Francisco',
                lname: 'Rodriguez',
                phoneNumber: 5555555555
            },
            group: {
                id: 222,
                tech: {
                    id: 'krisp'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 33
            },
            description: 'Francisco is reporting a problem with the demo tablets for Focus POS. Tablets do not communicate with central server',
            sla_creation_dt : '05/09/2017 09:43',
            sla_expected_dt:'05/09/2017 15:43',
            sla_archive_dt: ''
        },
        {
            number: 6,
            endUser: {
                email: 'junioralf@live.com',
                fname: 'Junior',
                lname: 'Alfonso',
                phoneNumber: 6666666666
            },
            group: {
                id: 111,
                tech: {
                    id: 'anmendoz',
                    name: 'Angel Mendoza'
                }
            },
            priority: {
                id: 20
            },
            issueType: {
                id: 300
            },
            status: {
                id: 44
            },
            description: 'Junior is requesting a license for MS Visual Studio. He is starting a new project tomorrow.',
            sla_creation_dt : '05/08/2017 15:30',
            sla_expected_dt:'05/08/2017 19:30',
            sla_archive_dt: '05/08/2017 19:00'
        },
        {
            number: 7,
            endUser: {
                email: 'lseer@yahoo.com',
                fname: 'Liz',
                lname: 'Seer',
                phoneNumber: 7777777777
            },
            group: {
                id: 111,
                tech: {
                    id: 'chenriq5'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 100
            },
            status: {
                id: 11
            },
            description: 'Liz is reporting a problem with his outlook account. She says e-mails are not arriving on time.',
            sla_creation_dt : '05/08/2017 16:15',
            sla_expected_dt:'05/09/2017 12:15',
            sla_archive_dt: ''
        },
        {
            number: 8,
            endUser: {
                email: 'carlosc@live.com',
                fname: 'Carlos',
                lname: 'Cardona',
                phoneNumber: 8888888888
            },
            group: {
                id: 222,
                tech: {
                    id: 'bhavyan'
                }
            },
            priority: {
                id: 20
            },
            issueType: {
                id: 300
            },
            status: {
                id: 33
            },
            description: 'Carlos is requesting a technician on site tomorrow for a demo presentation.',
            sla_creation_dt : '05/10/2017 09:35',
            sla_expected_dt:'05/10/2017 18:15',
            sla_archive_dt: ''
        },
        {
            number: 9,
            endUser: {
                email: 'carlosapits@live.com',
                fname: 'Carlos',
                lname: 'Apits',
                phoneNumber: 9999999999
            },
            group: {
                id: 222,
                tech: {
                    id: 'prudvii'
                }
            },
            priority: {
                id: 20
            },
            issueType: {
                id: 400
            },
            status: {
                id: 22
            },
            description: 'Carlos is reporting his MAC computer is not turning on.',
            sla_creation_dt : '05/10/2017 15:15',
            sla_expected_dt:'05/11/2017 10:15',
            sla_archive_dt: ''
        },
        {
            number: 10,
            endUser: {
                email: 'jorgeh@live.com',
                fname: 'Jorge',
                lname: 'Hernandez',
                phoneNumber: 1010101010
            },
            group: {
                id: 222,
                tech: {
                    id: 'krisp'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 400
            },
            status: {
                id: 44
            },
            description: 'Jorge is requesting POS equipment for an installation he is performing tomorrow morning',
            sla_creation_dt : '05/09/2017 13:33',
            sla_expected_dt:'05/09/2017 17:33',
            sla_archive_dt: '05/09/2017 16:43'
        },
        {
            number: 11,
            endUser: {
                email: 'luccop@live.com',
                fname: 'Lucco',
                lname: 'Pierre',
                phoneNumber:1111111110
            },
            group: {
                id: 111,
                tech: {
                    id: 'anmendoz',
                    name: 'Angel Mendoza'
                }
            },
            priority: {
                id: 20
            },
            issueType: {
                id: 400
            },
            status: {
                id: 44
            },
            description: 'Lucco is complaining about internet service. He says he can not access resources he needs for a project',
            sla_creation_dt : '05/09/2017 10:45',
            sla_expected_dt:'05/09/2017 14:15',
            sla_archive_dt: '05/09/2017 14:05'
        },
        {
            number: 12,
            endUser: {
                email: 'melvint@yahoo.com',
                fname: 'Melvin',
                lname: 'Trochez',
                phoneNumber:1212121212
            },
            group: {
                id: 111,
                tech: {
                    id: 'chenriq5'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 44
            },
            description: 'Melvin is requesting tools for an installation he is performing tomorrow morning.',
            sla_creation_dt : '05/08/2017 10:53',
            sla_expected_dt:'05/08/2017 14:53',
            sla_archive_dt: '05/08/2017 13:56'
        },
        {
            number: 13,
            endUser: {
                email: 'cristinab@live.com',
                fname: 'Cristina',
                lname: 'Burgos',
                phoneNumber: 1313131313
            },
            group: {
                id: 222,
                tech: {
                    id: 'bhavyan'
                }
            },
            priority: {
                id: 20
            },
            issueType: {
                id: 200
            },
            status: {
                id: 33
            },
            description: 'Cristina is requesting a training session on Focus software',
            sla_creation_dt : '05/11/2017 11:23',
            sla_expected_dt:'05/11/2017 18:23',
            sla_archive_dt: ''
        },
        {
            number: 14,
            endUser: {
                email: 'alexaa@live.com',
                fname: 'Alexandra',
                lname: 'Arias',
                phoneNumber:1414141414
            },
            group: {
                id: 222,
                tech: {
                    id: 'prudvii'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 11
            },
            description: 'Alexandra is requesting a tech for a demo tomorrow. Tech has to bring the demo equipment with him',
            sla_creation_dt : '05/09/2017 08:38',
            sla_expected_dt:'05/10/2017 08:38',
            sla_archive_dt: ''
        },
        {
            number: 15,
            endUser: {
                email: 'cristianv@live.com',
                fname: 'Cristian',
                lname: 'Van Beer',
                phoneNumber: 1515151515
            },
            group: {
                id: 222,
                tech: {
                    id: 'krisp'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 33
            },
            description: 'Cristian complains about his headphones. He says potential customers can not hear him.',
            sla_creation_dt : '05/10/2017 14:15',
            sla_expected_dt:'05/10/2017 18:15',
            sla_archive_dt: ''
        },
        {
            number: 16,
            endUser: {
                email: 'robertu@live.com',
                fname: 'Robert',
                lname: 'Uruntu',
                phoneNumber: 1616161616
            },
            group: {
                id: 111,
                tech: {
                    id: 'anmendoz',
                    name: 'Angel Mendoza'
                }
            },
            priority: {
                id: 10
            },
            issueType: {
                id: 500
            },
            status: {
                id: 33
            },
            description: 'Robert is reporting he is not receiving any calls in DR.',
            sla_creation_dt : '05/09/2017 9:45',
            sla_expected_dt:'05/09/2017 15:45',
            sla_archive_dt: ''
        },
        {
            number: 17,
            endUser: {
                email: 'itula@yahoo.com',
                fname: 'Isel',
                lname: 'Tula',
                phoneNumber: 1717171717
            },
            group: {
                id: 111,
                tech: {
                    id: 'chenriq5'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 400
            },
            status: {
                id: 44
            },
            description: 'Isel is requesting a new monitor for software development purposes.',
            sla_creation_dt : '05/11/2017 13:47',
            sla_expected_dt:'05/11/2017 17:47',
            sla_archive_dt: '05/11/2017 17:15'
        },
        {
            number: 18,
            endUser: {
                email: 'rreno@live.com',
                fname: 'Rodolfo',
                lname: 'Reno',
                phoneNumber: 1818181818
            },
            group: {
                id: 222,
                tech: {
                    id: 'bhavyan'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 500
            },
            status: {
                id: 22
            },
            description: 'Rodolfo needs new light bulbs for his department office',
            sla_creation_dt : '05/08/2017 10:23',
            sla_expected_dt:'05/08/2017 18:23',
            sla_archive_dt: ''
        },
        {
            number: 19,
            endUser: {
                email: 'ed.ruiz@live.com',
                fname: 'Nicolas',
                lname: 'Maduro',
                phoneNumber: 1919191919
            },
            group: {
                id: 222,
                tech: {
                    id: 'prudvii'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 11
            },
            description: 'Nicolas Maduro is complaining about his administrative rights for installing new software',
            sla_creation_dt : '05/10/2017 14:15',
            sla_expected_dt:'05/11/2017 9:15',
            sla_archive_dt: ''
        },
        {
            number: 20,
            endUser: {
                email: 'francisco.rodrig@live.com',
                fname: 'Hugo',
                lname: 'Chavez',
                phoneNumber: 2020202020
            },
            group: {
                id: 222,
                tech: {
                    id: 'krisp'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 33
            },
            description: 'Hugo Chavez is complaining about his partners',
            sla_creation_dt : '05/09/2017 08:44',
            sla_expected_dt:'05/09/2017 15:44',
            sla_archive_dt: ''
        },
        {
            number: 21,
            endUser: {
                email: 'carl.johnson@live.com',
                fname: 'Hector',
                lname: 'Garcia',
                phoneNumber: 2121212121
            },
            group: {
                id: 111,
                tech: {
                    id: 'anmendoz',
                    name: 'Angel Mendoza'
                }
            },
            priority: {
                id: 10
            },
            issueType: {
                id: 500
            },
            status: {
                id: 33
            },
            description: 'Hector is requesting a training session on oracle forms',
            sla_creation_dt : '05/08/2017 11:36',
            sla_expected_dt:'05/08/2017 19:36',
            sla_archive_dt: ''
        },
        {
            number: 22,
            endUser: {
                email: 'johan@yahoo.com',
                fname: 'Lenin',
                lname: 'Moreno',
                phoneNumber: 2222222222
            },
            group: {
                id: 111,
                tech: {
                    id: 'chenriq5'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 400
            },
            status: {
                id: 44
            },
            description: 'Lenin is asking if someone can train him on Oracle forms usage for accounting',
            sla_creation_dt : '05/11/2017 8:13',
            sla_expected_dt:'05/11/2017 12:13',
            sla_archive_dt: '05/11/2017 11:35'
        },
        {
            number: 23,
            endUser: {
                email: 'pedro.bara@live.com',
                fname: 'Vinicio',
                lname: 'Alvarado',
                phoneNumber: 2323232323
            },
            group: {
                id: 222,
                tech: {
                    id: 'bhavyan'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 500
            },
            status: {
                id: 22
            },
            description: 'Vinicio is complaining about his data usage limit, he says he bought the premiun plan ',
            sla_creation_dt : '05/10/2017 15:17',
            sla_expected_dt:'05/10/2017 18:17',
            sla_archive_dt: ''
        },
        {
            number: 24,
            endUser: {
                email: 'ed.ruiz@live.com',
                fname: 'George',
                lname: 'Carrasco',
                phoneNumber:2424242424
            },
            group: {
                id: 222,
                tech: {
                    id: 'prudvii'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 11
            },
            description: 'George is requesting new batteries for his mouse',
            sla_creation_dt : '05/08/2017 10:15',
            sla_expected_dt:'05/08/2017 14:15',
            sla_archive_dt: ''
        },
        {
            number: 25,
            endUser: {
                email: 'francisco.rodrig@live.com',
                fname: 'Josue',
                lname: 'Fonsi',
                phoneNumber: 2525252525
            },
            group: {
                id: 222,
                tech: {
                    id: 'krisp'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 33
            },
            description: 'Josue is requesting a change of settings on his pos system',
            sla_creation_dt : '05/11/2017 12:34',
            sla_expected_dt:'05/11/2017 19:15',
            sla_archive_dt: ''
        },
        {
            number: 26,
            endUser: {
                email: 'carl.johnson@live.com',
                fname: 'Daddy',
                lname: 'Yankee',
                phoneNumber: 26226226262
            },
            group: {
                id: 111,
                tech: {
                    id: 'anmendoz',
                    name: 'Angel Mendoza'
                }
            },
            priority: {
                id: 10
            },
            issueType: {
                id: 500
            },
            status: {
                id: 33
            },
            description: 'Daddy yankee is requesting a tech on site because none of his computers turn on',
            sla_creation_dt : '05/11/2017 13:33',
            sla_expected_dt:'05/11/2017 16:45',
            sla_archive_dt: ''
        },
        {
            number: 27,
            endUser: {
                email: 'johan@yahoo.com',
                fname: 'Arcangel',
                lname: 'Jam',
                phoneNumber: 2727272727
            },
            group: {
                id: 111,
                tech: {
                    id: 'chenriq5'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 400
            },
            status: {
                id: 44
            },
            description: 'Arcangel says his phone keeps inhibiting',
            sla_creation_dt : '05/10/2017 12:53',
            sla_expected_dt:'05/10/2017 19:53',
            sla_archive_dt: '05/10/2017 17:45'
        },
        {
            number: 28,
            endUser: {
                email: 'pedro.bara@live.com',
                fname: 'James',
                lname: 'Bluntz',
                phoneNumber: 282828282
            },
            group: {
                id: 222,
                tech: {
                    id: 'bhavyan'
                }
            },
            priority: {
                id: 40
            },
            issueType: {
                id: 500
            },
            status: {
                id: 22
            },
            description: 'James is reporting a damaged lightbulb',
            sla_creation_dt : '05/09/2017 11:36',
            sla_expected_dt:'05/09/2017 15:36',
            sla_archive_dt: ''
        },
        {
            number: 29,
            endUser: {
                email: 'ed.ruiz@live.com',
                fname: 'Luciana',
                lname: 'Lopilato',
                phoneNumber: 2929292929
            },
            group: {
                id: 222,
                tech: {
                    id: 'prudvii'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 11
            },
            description: 'Luciana is requesting a brand new installation of the MS office package',
            sla_creation_dt : '05/09/2017 10:45',
            sla_expected_dt:'05/09/2017 18:15',
            sla_archive_dt: ''
        },
        {
            number: 30,
            endUser: {
                email: 'francisco.rodrig@live.com',
                fname: 'Estrella',
                lname: 'Suarez',
                phoneNumber: 3030303030
            },
            group: {
                id: 222,
                tech: {
                    id: 'krisp'
                }
            },
            priority: {
                id: 30
            },
            issueType: {
                id: 300
            },
            status: {
                id: 33
            },
            description: 'Estrella is reporting a physical damage on her computer. She says it does not turn on',
            sla_creation_dt : '05/10/2017 9:15',
            sla_expected_dt:'05/10/2017 18:15',
            sla_archive_dt: ''
        }
    ];

})();
