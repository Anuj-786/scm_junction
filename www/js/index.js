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
 var globalUserName;
 var globalUid;
 var global_session_token;
 var deviceid;
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
        // Keyboard.automaticScrollToTopOnHiding = true;
        // var options = { dimBackground: true };
        // SpinnerPlugin.activityStart("Searching For Trucks...", options);
        deviceid = device.uuid
        // alert(deviceid)
    },

    LoginUser: function() {
        var userName = document.getElementById('email').value;
        var userPassword = document.getElementById('password').value;
        
        if( userName == "") {
            navigator.notification.alert(
                'Please Enter Username', // message
                // alertDismissed, // callback
                'Fail', // title
                'ok' // buttonName
            );
        }
        else if( userPassword == "") {
            navigator.notification.alert(
                'Please Enter Password', // message
                // alertDismissed, // callback
                'Fail', // title
                'ok' // buttonName
            );
        }

        else {
             $.ajax({
                     type: 'GET',
                     async: true,
                     url: 'http://www.scmjunction.com/RakeshService.svc/Login',
                     data: { username: userName, password: userPassword, deviceid: deviceid },
                     dataType: 'json',
                     success: function (datajson) {
                        console.log(datajson)
                        if(datajson.d.username == userName) {
                            global_session_token = window.localStorage.setItem("session_token", datajson.usertoken);
                            globalUserName = window.localStorage.setItem('userName', datajson.d.username);
                            console.log(datajson)
                        // console.log('data:' +window.localStorage.getItem("userName"));
                        // window.location.href = 'index.html';
                        }
                        else {
                            navigator.notification.alert(
                                'Username or Password wrong', // message
                                // alertDismissed, // callback
                                'Fail', // title
                                'Fialed To Login' // buttonName
                            );
                        }
                        
                     },
                     error: function(datajson) {
                         alert("There was an error. Try again please!");
                         // $("#div_message").html(datajson.d.message);
                     }
                 });
        }
         
        
    },

    RegisterUser: function() {
        // console.log(window.localStorage.getItem("userName"))
        var companyName = document.getElementById('mySelect').value
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var cname = document.getElementById('cname').value;
        var designation = document.getElementById('designation').value;
        var noOfTrucks = document.getElementById('noOfTrucks').value
        var address = document.getElementById('address').value;
        var area = document.getElementById('area').value;
        var pincode = document.getElementById('pincode').value;
        var deviceId = document.getElementById('deviceId').value;
        var branch = document.getElementById('branch').value;
        var phone_number = document.getElementById('phone_number').value;
        var city = document.getElementById('city').value;

        $.ajax({
            type: 'GET',
            async: true,
            url: 'http://www.scmjunction.com/RakeshService.svc/Registration',
            data: { transportid: companyName, fname: fname, companyname: cname, email: email, mobile: phone_number, address: address, city: city, lname: lname, Designation: designation, number_of_truck: noOfTrucks, password: password, area: area, pincode: pincode, deviceid: deviceId, branches: branch },
            dataType: 'json',
            success: function (datajson) {
                console.log(datajson)
                    if(datajson.d == "user allready Exist!") {
                        navigator.notification.alert(
                            'user already Exist!', // message
                                // alertDismissed, // callback
                            'Failed' // title
                        );
                        window.location.href = 'login.html'  
                    } 
                    else {
                        navigator.notification.alert(
                            'Thanks For Registration', // message
                                // alertDismissed, // callback
                            'Fail', // title
                            'Registration Successfully' // buttonName
                        );
                        window.location.href = 'login.html'
                    }
                    
                
            }
        })
            
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
            data.map(function(item, index){
                console.log(index)
                var createList = document.createElement('li');
                    // createList.dataset.postId =  item.postId
                    
                // show date for every element
                var makeDate = document.createElement('div');
                makeDate.className = "date-text";
                makeDate.innerHTML = item.Date;
                createList.appendChild(makeDate);

                // make table
                var makeTable = document.createElement('table');
                    makeTable.className = 'main-table'
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

                // creating details button for every li
                
                var detailsUl = document.createElement('ul');
                    detailsUl.className = 'collapsible'

                    var detailsLi = document.createElement('li')
                        detailsLi.className=''
                        var detailsHeader = document.createElement('div')
                            detailsHeader.className = "collapsible-header";
                            // if(globalUserName) {
                                detailsHeader.addEventListener('click', function(){
                                    console.log(window.localStorage.getItem("userName"))
                                    if(window.localStorage.getItem("userName")) {
                                        $('.collapsible').collapsible();
                                        $.ajax({
                                            type: 'GET',
                                            async: true,
                                            url: 'http://www.scmjunction.com/RakeshService.svc/Update_Post_Impressions',
                                            data: { post_id: item.PostID, CountImpressions: item.CountImpressions, CountViews: item.CountViews, CountQuotes: item.CountQuotes },
                                            dataType: 'json',
                                            success: function (datajson) {
                                                console.log(datajson)
                                            }
                                        });
                                    }
                                    else {
                                        navigator.notification.alert(
                                            'You need to login or register first', // message
                                            // alertDismissed, // callback
                                            'Fail', // title
                                            '' // buttonName
                                        );
                                        window.location.href = 'login.html'
                                         // SpinnerPlugin.activityStop();
                                    }

                                })
                            // }
                            // else {
                            //     window.location.href = ('login.html')
                            // }
                            var detailsIcon = document.createElement('i');
                                detailsIcon.className = 'material-icons';
                                detailsIcon.innerHTML = 'details';
                            detailsHeader.appendChild(detailsIcon);
                            var detailLab = document.createElement('span');
                                    detailLab.innerHTML = "Details";
                            detailsHeader.appendChild(detailLab)
                        detailsLi.appendChild(detailsHeader)

                        var detailsBody = document.createElement('div');
                            detailsBody.className = 'collapsible-body';
                            var detailTable = document.createElement('table');
                                var detailTableBody =  document.createElement('tbody');
                                    // create tr for id
                                    var detailId = document.createElement('tr')
                                        var detailIdLable = document.createElement('td');
                                            detailIdLable.innerHTML = "<b>" +'Ad Id'+"</b>"
                                        var detailIdValue = document.createElement('td');
                                            detailIdValue.innerHTML = item.AdID
                                        detailId.appendChild(detailIdLable)
                                        detailId.appendChild(detailIdValue)
                                    detailTableBody.appendChild(detailId)

                                    // create tr for source destination
                                    var detailSource = document.createElement('tr');
                                        var detailSourceLable = document.createElement('td')
                                            detailSourceLable.innerHTML = "<b>" +'Source'+"</b>"
                                        var detailSourceData = document.createElement('td');
                                            detailSourceData.innerHTML = item.FromLocation
                                        var detailDesLable = document.createElement('td');
                                            detailDesLable.innerHTML = "<b>" +'Destination'+"</b>"
                                        var detailDesData = document.createElement('td');
                                            detailDesData.innerHTML = item.ToLocation;
                                        detailSource.appendChild(detailSourceLable)
                                        detailSource.appendChild(detailSourceData)
                                        detailSource.appendChild(detailDesLable);
                                        detailSource.appendChild(detailDesData)
                                    detailTableBody.appendChild(detailSource)

                                    // create tr for truck type and capacity
                                    var truckTypecapacity = document.createElement('tr');
                                        var dTruckTypeLable = document.createElement('td')
                                            dTruckTypeLable.innerHTML = "<b>" +'Truck Type'+"</b>"
                                        var dTruckTypeData = document.createElement('td');
                                            dTruckTypeData.innerHTML = item.TruckType;
                                        var dTruckCapacityLab = document.createElement('td');
                                            dTruckCapacityLab.innerHTML = "<b>" +'Capacity'+"</b>"
                                        var dtruckCapacityData = document.createElement('td');
                                            dtruckCapacityData.innerHTML = item.Capacity
                                        truckTypecapacity.appendChild(dTruckTypeLable)
                                        truckTypecapacity.appendChild(dTruckTypeData)
                                        truckTypecapacity.appendChild(dTruckCapacityLab);
                                        truckTypecapacity.appendChild(dtruckCapacityData)
                                    detailTableBody.appendChild(truckTypecapacity)

                                    // create tr for cost and ship
                                    var dCostShip = document.createElement('tr');
                                        var dCostLab = document.createElement('td')
                                            dCostLab.innerHTML = "<b>" +'Cost'+"</b>"
                                        var dCostData = document.createElement('td');
                                            dCostData.innerHTML = item.CostPerTruck;
                                        var dShipsLab = document.createElement('td');
                                            dShipsLab.innerHTML = "<b>" +'Goods and Ships'+"</b>"
                                        var dShipsData = document.createElement('td');
                                            dShipsData.innerHTML = "dummy"
                                        dCostShip.appendChild(dCostLab)
                                        dCostShip.appendChild(dCostData)
                                        dCostShip.appendChild(dShipsLab);
                                        dCostShip.appendChild(dShipsData)
                                    detailTableBody.appendChild(dCostShip)

                                    // encl and goods Goodscategory
                                    var dEnclCat = document.createElement('tr');
                                        var dEnclLab = document.createElement('td')
                                            dEnclLab.innerHTML = "<b>" +'Encl. Type:'+"</b>"
                                        var dEnclData = document.createElement('td');
                                            dEnclData.innerHTML = item.EnclosureType;
                                        var dCategoryLab = document.createElement('td');
                                            dCategoryLab.innerHTML = "<b>" +'Goodscategory'+"</b>"
                                        var dCategoryData = document.createElement('td');
                                            dCategoryData.innerHTML = item.GoodsType;
                                        dEnclCat.appendChild(dEnclLab)
                                        dEnclCat.appendChild(dEnclData)
                                        dEnclCat.appendChild(dShipsLab);
                                        dEnclCat.appendChild(dCategoryData)
                                    detailTableBody.appendChild(dEnclCat)  

                                    // posted date last date
                                    var dPosetdLastDate = document.createElement('tr');
                                        var dPostedDateLab = document.createElement('td')
                                            dPostedDateLab.innerHTML = "<b>" +'Posted Date'+"</b>"
                                        var dPostedData = document.createElement('td');
                                            dPostedData.innerHTML = item.PostedDateTime;
                                        var dLastDateLab = document.createElement('td');
                                            dLastDateLab.innerHTML = "<b>" +'Last Date'+"</b>"
                                        var dLastDateData = document.createElement('td');
                                            dLastDateData.innerHTML = item.Date;
                                        dPosetdLastDate.appendChild(dPostedDateLab)
                                        dPosetdLastDate.appendChild(dPostedData)
                                        dPosetdLastDate.appendChild(dLastDateLab);
                                        dPosetdLastDate.appendChild(dLastDateData)
                                    detailTableBody.appendChild(dPosetdLastDate)  

                                    // comments
                                    var dcomments = document.createElement('tr');
                                        var dCommentLab = document.createElement('td')
                                            dCommentLab.innerHTML = "<b>" +'Comments'+"</b>"
                                        var dCommentData = document.createElement('td');
                                            dCommentData.innerHTML = item.AdditionalComments
                                        dcomments.appendChild(dCommentLab)
                                        dcomments.appendChild(dCommentData)
                                    detailTableBody.appendChild(dcomments)

                                    // impression 
                                    var dImpressionViwes = document.createElement('tr');
                                        var dImpLab = document.createElement('td')
                                            dImpLab.innerHTML = "<b>" +'Impression: '+"</b>" +item.CountImpressions
                                        
                                        var dViewLab = document.createElement('td');
                                            dViewLab.innerHTML = "<b>" +'Viwes: '+"</b>" +item.CountViews;

                                        var dQuotes = document.createElement('td');
                                            dQuotes.innerHTML = "<b>" +'Quotes: '+"</b>" +item.CountQuotes
                                        
                                        dImpressionViwes.appendChild(dImpLab)
                                        dImpressionViwes.appendChild(dViewLab)
                                        dImpressionViwes.appendChild(dQuotes)
                                    detailTableBody.appendChild(dImpressionViwes)

                                detailTable.appendChild(detailTableBody);
                            detailsBody.appendChild(detailTable)
                        detailsLi.appendChild(detailsBody)
                    detailsUl.appendChild(detailsLi)
                createList.appendChild(detailsUl)
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