/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        Keyboard.automaticScrollToTopOnHiding = true;
        var options = { dimBackground: true };
        // SpinnerPlugin.activityStart("Searching For Trucks...", options);
    },

    loginUser: function() {
        var email = "test";
        var password = "123";
        var InputEmail = document.getElementById('email').value;
        var inputPassword = document.getElementById('password').value;
        if( InputEmail == email && inputPassword == password) {
            alert("user logged in succefully");
            window.location.href = 'dashboard.html';
        } 
        else {
            alert("Invalid credential")
        }
    },
    registerUser: function() {

    },

    listTrucks: function() {
        var options = { dimBackground: true };
        SpinnerPlugin.activityStart("Searching For Trucks...", options);
        jQuery.ajax ({
            type: 'GET',
            async: false,
            url: 'http://www.scmjunction.com/RakeshService.svc/Get_TruckByCategoryAll',

            success: function(myJson) {
               var data = myJson.d;
            data.map(function(item){
                var createList = document.createElement('li');
                // show date for every element
                var makeDate = document.createElement('div');
                makeDate.className = "date-text";
                makeDate.innerHTML = item.Date;
                createList.appendChild(makeDate);

                // make table
                var makeTable = document.createElement('table');
                // creating table head
                var makeTableHead = document.createElement('thead');
                // appending table head for table
                makeTable.appendChild(makeTableHead);
                // create table row for table head
                makeThRow = document.createElement('tr');
                // appending table row for table head;
                makeTableHead.appendChild(makeThRow);
                // create table headings
                var tableHeading = ['AD Id', 'Source', 'Destination', 'Truck Type', 'Available', 'Travel Type'];
                for(var i = 0; i< tableHeading.length; i++) {
                    var createTh = document.createElement('th');
                    createTh.innerHTML=tableHeading[i]
                    makeThRow.appendChild(createTh);
                }

                // creating table body to show data
                var createTbody = document.createElement('tbody');
                // append tbody to table
                makeTable.appendChild(createTbody);
                // create table row for table body to show actual data
                var createTbodyRow = document.createElement('tr');
                // append table row to tbody
                createTbody.appendChild(createTbodyRow);
                
                // create table data for data element AD id
                var AdId = document.createElement('td');
                AdId.innerHTML = item.AdID;
                // append td to table row
                createTbodyRow.appendChild(AdId);

                // create td for source
                var sourceData = document.createElement('td');
                sourceData.innerHTML = item.FromLocation;
                createTbodyRow.appendChild(sourceData);

                // create td for destination 
                var toLocationData = document.createElement('td');
                toLocationData.innerHTML = item.ToLocation;
                toLocationData.className = 'toLocation more'
                createTbodyRow.appendChild(toLocationData);

                // create td for type of truck 
                var typeOfTruck = document.createElement('td');
                typeOfTruck.innerHTML = item.TruckType;
                createTbodyRow.appendChild(typeOfTruck);

                // create td for number of Trucks;
                var numberOfTrucks = document.createElement('td');
                numberOfTrucks.innerHTML = item.TruckCount;
                createTbodyRow.appendChild(numberOfTrucks);

                // create td for travel type
                var travelType = document.createElement('td');
                travelType.innerHTML = item.TravelType;
                createTbodyRow.appendChild(travelType);

                createList.appendChild(makeTable);
                listTrucks.appendChild(createList);
            })
               
            },

            onError: function(error) {
                console.log('Error Occured: ' +error);
            }
                    
        })
        SpinnerPlugin.activityStop();
        // fetch('http://www.scmjunction.com/RakeshService.svc/Get_TruckByCategoryAll')
        //   .then(function(response) {
        //     return response.json();
        //   })
        //   .then(function(myJson) {
        //     // console.log(myJson.d);

        // });
    }



};

app.initialize();