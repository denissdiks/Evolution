let bookRed = document.getElementById("bookRed"); // store each book's img
            let bookBlue = document.getElementById("bookBlue"); // from the document
            let bookGreen = document.getElementById("bookGreen");// in variables

            const floorLevel = 410; // (top:410px)

            let evo_stages = document.getElementsByClassName("evo_stage"); // contains 5 images "evo..png"
            let stage = evo_stages.length - 1; // first image  is in the last position in the array
            let opacity = 1; // changes the opacity of the images

            let speed = 1; // acceleration in flyAway()
            let goUp = false; // is used in flyAway(), "true" allows to go up

            function letsRead() { // MAIN function, is called when the button is clicked
                document.getElementById("button").disabled = true;

                setBookPos(bookRed);
                setBookPos(bookBlue);
                setBookPos(bookGreen);

                bookRed.style.visibility = "visible";
                bookBlue.style.visibility = "visible";
                bookGreen.style.visibility = "visible";

                let id = setInterval(frame, 10); // replay frame() every 10 miliseconds
            }

            function frame (){
                if (stage != 0){ //if not the last image (stage)
                    throwBook(bookRed);
                    throwBook(bookBlue);
                    throwBook(bookGreen);
                } else {
                    bookFall(bookRed);
                    bookFall(bookBlue);
                    bookFall(bookGreen);

                    if (isItemOnTheFloor(bookRed.offsetTop, floorLevel) &&
                    isItemOnTheFloor(bookBlue.offsetTop, floorLevel) &&
                    isItemOnTheFloor(bookGreen.offsetTop, floorLevel)){
                        flyAway();
                    }
                }
            }

            function throwBook(book){
                let pos = book.offsetLeft;

                if (pos >= 555) { //after each book hit the stage
                    setBookPos(book); //move book to the begining
                    changeOpacity();

                } else { //otherwise move the book to the right
                    pos = pos + 3;
                    book.style.left = pos + "px";
                    book.style.transform = "rotate(" + pos*1.5 + "deg)";
                } 
            }

            function bookFall(book){
                
                if (!isItemOnTheFloor(book.offsetTop, floorLevel)){ // make book fall until it hits the floor (top:410px)
		            book.style.top = (book.offsetTop + 1.5) + "px";
                }
            }

            function isItemOnTheFloor(itemPos, floorLevel){
                if (itemPos < floorLevel){
                    return false;
                }
                
                return true;
            }

            function flyAway(){
                if(speed <= 1 && speed > -4 && goUp == false){
                    speed = speed - 0.3; //acceleration to go down
                    evo_stages[0].style.top = evo_stages[0].offsetTop - speed + "px";

                    if (speed <= -4){
                        goUp = true; // allows to go up
                    }
                } else{
                    speed = speed + 0.1; //acceleration to go up
                    evo_stages[0].style.top = evo_stages[0].offsetTop - speed + "px";
                }
            }

            function setBookPos(book) {
                let top = Math.floor((Math.random() * 170) + 150); //random start position
                let left = Math.floor((Math.random() * 190) + 1);  //of the book

                book.style.top = top + "px";
                book.style.left = left + "px";
            }

            function changeOpacity(){
                if (stage >= 0){ 
                    if(opacity <= 0){ 
                        stage--; // new stage (image)
                        evo_stages[stage].style.visibility = "visible"; // make it visible
                        opacity = 1; 
                    } else {
                        opacity = opacity - 0.25; //after 4 hits image will disappear

                        if(opacity <= 0){ // if previous image is unseen
                                        // make visible the next one
                        evo_stages[stage-1].style.visibility = "visible";
			            }
                        
                        evo_stages[stage].style.opacity = opacity;
                    }
                }
            }