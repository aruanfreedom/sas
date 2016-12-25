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

            document.getElementById("play-icon").onclick = function() {
                var tic = 0;
                modalWindow.style.opacity = 0;
                modalWindow.style.display = "block";
                var time = setInterval(function () {
                    modalWindow.style.opacity = "0." + tic ;
                    tic++;
                    console.log(tic)
                    if (tic === 10) {
                        modalWindow.style.opacity = 1;
                    
                        clearInterval(time);
                    }
                }, 50);
            }

            document.getElementById("close-modal").onclick = function() {
                var tic = 9;
                modalWindow.style.opacity = 1;
                var fadeOut = setInterval(function () {
                    modalWindow.style.opacity = "0." + tic ;
                    tic--;
                    console.log(tic)
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
                        $("#clieants-block .item").hide();
                        for(var item = 0; item < count.length; item++){
                            if (number === $(count[item]).attr("data-index-visible")) {
                                $(count[item]).show();                                  
                            }
                        }
                        e.preventDefault();
                    });
            };

            clientFunc();
           
         
     }        

})();



