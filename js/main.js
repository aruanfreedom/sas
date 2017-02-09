(function() {

    $(function() {
        $('.preloader_bg, .preloader_content').fadeIn(0);
        $(window).load(function() {
            $('.preloader_bg').delay(250).fadeOut(1500);
            $('.preloader_content').delay(250).fadeOut(750);
        });
    });

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
            var time = setInterval(function() {
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
            var fadeOut = setInterval(function() {
                modalWindow.style.opacity = "0." + tic;
                tic--;
                if (tic <= 0) {
                    modalWindow.style.opacity = 0;
                    modalWindow.style.display = "none";
                    clearInterval(fadeOut);
                }
            }, 50);
        }

        // Slider custom script
        var clientFunc = function() {
            var clients = $("#clieants-block .item"),
                allClients = $("#clieants-block .item").length - 1,
                limit = $("#clieants-block .item").length - 1,
                sliderPage = 0;
            for (var linkItem = 1; linkItem < clients.length / 3 + 1; linkItem++) {
                $('#clieants-block .dynamic-add-link').append("<a href='#" + linkItem + "' data-link='" + linkItem + "'></a>");
            }
            $("#clieants-block .dynamic-add-link a:first").addClass("active");
            for (var itemBlock = 0; itemBlock < clients.length; itemBlock++) {
                if (limit === allClients) {
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
                $("#clieants-block .item").animate({ opacity: 0 }, 500, function() {
                    $(this).hide();
                });
                for (var item = 0; item < count.length; item++) {
                    if (number === $(count[item]).attr("data-index-visible")) {
                        $(count[item]).animate({ opacity: 1 }, 500, function() {
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

        // Video start

        function video() {
            var manifestUri = '//localhost:3000/video/example.mpd';

            function initApp() {
                // Install built-in polyfills to patch browser incompatibilities.
                shaka.polyfill.installAll();

                // Check to see if the browser supports the basic APIs Shaka needs.
                if (shaka.Player.isBrowserSupported()) {
                    // Everything looks good!
                    initPlayer();
                } else {
                    // This browser does not have the minimum set of APIs we need.
                    console.error('Browser not supported!');
                }
            }

            function initPlayer() {
                // Create a Player instance.
                var video = document.getElementById('video-dash-1');
                var player = new shaka.Player(video);

                // Attach player to the window to make it easy to access in the JS console.
                window.player = player;

                // Listen for error events.
                player.addEventListener('error', onErrorEvent);

                // Try to load a manifest.
                // This is an asynchronous process.
                player.load(manifestUri).then(function() {
                    // This runs if the asynchronous load is successful.
                    console.log('The video has now been loaded!');
                }).catch(onError); // onError is executed if the asynchronous load fails.
            }

            function onErrorEvent(event) {
                // Extract the shaka.util.Error object from the event.
                onError(event.detail);
            }

            function onError(error) {
                // Log the error.
                console.error('Error code', error.code, 'object', error);
            }

            document.addEventListener('DOMContentLoaded', initApp);
        }

        // video();

        // Video end

        // Open cart

        //MapsOp();

        // function maps() {

        //     var $popap = $("#popup");

        //     var layer = new ol.layer.Tile({
        //         source: new ol.source.OSM()
        //     });

        //     var map = new ol.Map({
        //         layers: [layer],
        //         target: 'map',
        //         view: new ol.View({
        //             center: ol.proj.transform([71.41840, 51.19172], 'EPSG:4326', 'EPSG:3857'),
        //             zoom: 18
        //         }),
        //         logo: false
        //     });

        //     var pos = ol.proj.fromLonLat([71.41660, 51.19200]);

        //     // Vienna label
        //     var logoMaps = new ol.Overlay({
        //         position: pos,
        //         element: document.getElementById('logo-maps')
        //     });

        //     map.addOverlay(logoMaps);

        //     // Popup showing the position the user clicked
        //     var popup = new ol.Overlay({
        //         element: document.getElementById('popup')
        //     });

        //     map.addOverlay(popup);

        //     map.on('click', function() {
        //         if (!($popap.hasClass("unvisible"))) {
        //             $popap.addClass("unvisible");
        //         }
        //     });

        //     $("#popup-closer").on('click', function() {

        //         if (!($popap.hasClass("unvisible"))) {
        //             $popap.addClass("unvisible");
        //         }
        //     });

        //     $("#logo-maps").on('click', function() {
        //         ($popap.hasClass("unvisible")) ? $popap.removeClass("unvisible"): $popap.addClass("unvisible");
        //         popup.setPosition(ol.proj.transform([71.41607, 51.19230], 'EPSG:4326', 'EPSG:3857'));
        //     });
        // }

        // maps();

        // Increment and Dexrement

        function resizeText(multiplier) {
            var max = 1.1,
                min = 0.9;

            if (document.body.style.fontSize === "") {
                document.body.style.fontSize = "1em";
            }

            if (parseFloat(document.body.style.fontSize) === max || parseFloat(document.body.style.fontSize) === min) {
                document.body.style.fontSize = "1em";
            }

            if (parseFloat(document.body.style.fontSize) < max && parseFloat(document.body.style.fontSize) > min) {
                document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 0.1) + "em";
            }
        }

        $('#plus').on('click', function() {
            resizeText(0.5);
        });

        $('#minus').on('click', function() {
            resizeText(-0.5);
        });

        //  Kazks Language

        function kzLang() {
            if (window.location.search === "?lang=kz") {
                $("#kazDisabled").attr("href", "css/kaz-style.css");
                $("body").css("font-size", "0.9em");
            }
        }

        kzLang();


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

            sendButtonForm.addEventListener("click", function() {

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