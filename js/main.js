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
         
     }        

})();



