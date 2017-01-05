(function(){

     window.onload = function() {

         // Pagination number custom script

            $('#main').onepage_scroll({
                afterMove: function(index) {
                    var circleLis = document.querySelectorAll(".onepage-pagination  a");

                    for (var circleLi = circleLis.length - 1; circleLi >= 0; circleLi--) {
                        var link = circleLis[circleLi];
                        var pageNumber = link.getAttribute("data-index");
                        
                        link.textContent = "";
                        
                        if (index === +pageNumber) {
                           link.innerHTML = "<span>" + pageNumber + "</span>";                            
                        }                      

                    }                    
                }
            });     

            // Default value pagination
            var startNumber = document.querySelector(".onepage-pagination  a");
            startNumber.innerHTML = "<span>1</span>";

            // Close modal 
            var modalWindow = document.querySelector(".modal");

            $(".play-icon").on('click', function() {
                var tic = 0;
                modalWindow.style.opacity = 0;
                modalWindow.style.display = "block";
                var time = setInterval(function () {
                    modalWindow.style.opacity = "0." + tic;
                    tic++;
                    if (tic === 10) {
                        modalWindow.style.opacity = 1;
                    
                        clearInterval(time);
                    }
                }, 50);
            });

            document.getElementById("close-block").onclick = function() {
                var tic = 9;
                modalWindow.style.opacity = 1;
                var fadeOut = setInterval(function () {
                    modalWindow.style.opacity = "0." + tic ;
                    tic--;
                    if (tic <= 0) {
                        modalWindow.style.opacity = 0;
                        modalWindow.style.display = "none";
                        clearInterval(fadeOut);
                    }
                }, 50);
            }

            // Slider custom script
            var clientFunc = function () {
                var clients = $("#clieants-block .item"),
                    allClients = $("#clieants-block .item").length - 1,
                    limit = $("#clieants-block .item").length - 1,
                    sliderPage = 0;
                    for(var linkItem = 1; linkItem < clients.length / 3 + 1; linkItem++) {
                        $('#clieants-block .dynamic-add-link').append("<a href='#" + linkItem + "' data-link='" + linkItem + "'></a>");
                    }
                    $("#clieants-block .dynamic-add-link a:first").addClass("active");
                    for(var itemBlock = 0; itemBlock < clients.length; itemBlock++) {    
                        if (limit === allClients ) {
                            limit = limit - 3;     
                            sliderPage++;                      
                            $(clients[itemBlock]).attr("data-index-visible", sliderPage); 
                        } else {
                            $(clients[itemBlock]).attr("data-index-visible", sliderPage);
                        }
                        allClients--;
                        
                    }
                    $('#clieants-block .dynamic-add-link a').on("click", function(e) {
                        var number = $(this).attr("data-link"),
                            count = $("#clieants-block .item"),
                            linkNumber = $("#clieants-block .item").attr("data-index-visible");
                        $('#clieants-block .dynamic-add-link a').removeClass("active");
                        $(this).addClass("active");
                        $("#clieants-block .item").animate({opacity: 0}, 500, function(){
                            $(this).hide();
                        }); 
                        for(var item = 0; item < count.length; item++){
                            if (number === $(count[item]).attr("data-index-visible")) {
                                $(count[item]).animate({opacity: 1}, 500, function(){
                                    $(this).show();
                                });                                  
                            }
                        }
                        e.preventDefault();
                    });
            };

            clientFunc();

            // Scroll top
            $('.top-page').click(function() {
               $(".main").moveTo(1);
            });

            // scroll link
             $('nav a[href^="#"]').click(function() {
               var el = $(this).attr('href'),
                clear = el.replace("#", "");
                $(".main").moveTo(clear);
            });

            // Bell bottom scroll

            $('.service-block-item .btn').on('click', function() {
                $(".main").moveTo(7);
            });

            // Open cart
             function MapsOp() {
                 map = new OpenLayers.Map("OSMap");
                 map.addLayer(new OpenLayers.Layer.OSM());

                 var lonLat = new OpenLayers.LonLat( 71.41675, 51.19170 )
                     .transform(
                         new OpenLayers.Projection("EPSG:4326"), // переобразование в WGS 1984
                         new OpenLayers.Projection("EPSG:900913")
                     );

                 var zoom=18;

                 var markers = new OpenLayers.Layer.Markers( "Markers" );
                 map.addLayer(markers);
                 var size = new OpenLayers.Size(30, 45);//размер картинки для маркера
                 var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h); //смещение картинки для маркера
                 var icon = new OpenLayers.Icon('/img/logo.png', size, offset);
                 markers.addMarker(new OpenLayers.Marker({lat:6655270,lon:7950068}, icon));

                 markers.events.register('click', map, function (e) {
                     console.log("sad")
                     // Open modal
                     // $("#maps-img").css("display", "block").animate( {opacity: 1}, 500);
                     popup = new OpenLayers.Popup("chicken",
                         new OpenLayers.LonLat({lat:6655270,lon:7950068}),
                         new OpenLayers.Size(200,200),
                         "example popup",
                         true);

                     map.addPopup(popup);
                 }); //добавление событие клика по карте

                 map.setCenter (lonLat, zoom);

                 // CLose modal
                 $("#close-block-img").on("click", function() {
                     $("#maps-img").hide();
                 });

             }

             //MapsOp();
        function maps() {
            var map = new ol.Map({
                target: 'map',
                renderer: 'canvas',
                layers: [
                    new ol.layer.Tile({source: new ol.source.OSM()})
                ],
                view: new ol.View({
                    //projection: 'EPSG:900913',
                    center: ol.proj.transform([71.41800, 51.19180], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 18
                })

            });

            var iconStyle = [
                new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        src: '/img/logo-mini.png'
                    }))
                })
            ];

            function createMarker(location, style){
                var iconFeature = new ol.Feature({
                    geometry: new ol.geom.Point(location)
                });
                iconFeature.setStyle(style);

                return iconFeature
            }
            var mapVectorSource = new ol.source.Vector({
                features: []
            });
            var mapVectorLayer = new ol.layer.Vector({
                source: mapVectorSource
            });
            map.addLayer(mapVectorLayer);

            function makeMovable(feature) {
                var modify = new ol.interaction.Modify({
                    features: new ol.Collection([feature])
                });

                feature.on('change',function() {
                    console.log('Feature Moved To:' + this.getGeometry().getCoordinates());
                }, feature);
                return modify;
            }

            var marker = createMarker(ol.proj.transform([71.41655, 51.19170], 'EPSG:4326', 'EPSG:3857'), iconStyle);
            mapVectorSource.addFeature(marker);
            var modifyInteraction = makeMovable(marker);
            map.addInteraction(modifyInteraction);

            map.on('click', function() {
                $(".ol-popup-custom").show();
                $("#close-popup").show();
            });

            $(".ol-popup-custom-closer, #close-popup").on('click', function() {
                $(".ol-popup-custom").hide();
                $("#close-popup").hide();
            });


        }

         maps();


            // Mulanur Scripts for form

            var argObj = {

                sendButtonForm: "sendform",
                name: "name",
                email: "email",
                message: "message",
                addressForSend: "/feedbackform"


            };



function sendFormData(argObj) {


    var sendButtonForm = document.getElementById(argObj.sendButtonForm);

    sendButtonForm.addEventListener("click", function () {

        var ObjForForm = {};


        ObjForForm = {

            name: document.getElementById(argObj.name).value,
            email: document.getElementById(argObj.email).value,
            message: document.getElementById(argObj.message).value


        };


        var xhr = new XMLHttpRequest();
        var json_upload = "json_name=" + JSON.stringify(ObjForForm);

        xhr.open("POST", argObj.addressForSend, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(json_upload);


    });




}
         
     }        

})();



