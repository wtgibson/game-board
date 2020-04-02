// Declare all variables, including calls to ids
var gameBox = $("#gameInfoBox");
var searchButton = $("#searchGames");
var clearButton = $("#clearSearch");
var nameInput = $("#nameInput");
var minPlayersDisplay = $("#minPlayersDisplay");
var minPlayersInput = $("#minPlayersInput");
var maxPlayersInput = $("#maxPlayersInput");
var maxPlayersDisplay = $("#maxPlayersDisplay");
var maxPriceInput = $("#maxPriceInput");
var maxPriceDisplay = $("#maxPriceDisplay");
var mechanicInput = $("#mechanicInput");
var mechanicDisplay = $("#mechanicDisplay");
var categoryInput = $("#categoryInput");
var categoryDisplay = $("#categoryDisplay");
var minPlayers = 0;
var maxPlayers = 100;
var maxPrice = "&lt_msrp=" + 1000;
var categoryID = "";
var mechanicID = "";
var videoType = "Game Review"


// Function to run when search executes
function searchGames(){
    event.preventDefault();

    var name = "name=" + nameInput.val().trim();
    var exactName = false;

    if(exactName === true){
        name = name + "&exact=true";
        console.log(name);
    }
    // Add in other parameters to their variables
    addMinPlayers();
    addMaxPlayers();
    addMaxPrice();
    addMechanic();
    addCategory();
    // Combine all variables into a search URL
    var queryURL = "https://www.boardgameatlas.com/api/search?" + name + minPlayers + maxPlayers + maxPrice + categoryID + mechanicID + "&order_by=popularity&ascending=false&client_id=NHfcsxreTb";
    console.log(queryURL);
    // AJAX call to BGA API to get objects
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        // Empty Display Box
        gameBox.empty();
        console.log(response);
            // For each game returned, check if category and mechanics preferences are matched
            for( var i = 0; i<response.games.length; i++){
                
                // Generate content if requirements are met
                console.log("worker Placement");
                var header = $("<h3>");
                header.text(response.games[i].name);
                var img = $("<img>");
                img.attr("src", response.games[i].images.small)
                gameBox.append(header, img);
                
            }    
        
        })
}
// Function to add minimum player parameter
function addMinPlayers(){
    var number = parseInt(minPlayersInput.val().trim());
    minPlayers = "&gt_min_players=" + (number - 1);
    minPlayersDisplay.text("Minimum Players: " + number);
    console.log(minPlayers);
}
// Function to add maximum player parameter
function addMaxPlayers(){
    var number = parseInt(maxPlayersInput.val().trim());
    maxPlayers = "&lt_max_players=" + (number + 1);
    maxPlayersDisplay.text("Maximum Players: " + number)
    console.log(maxPlayers);
}
// function to add maximum MSRP parameter
function addMaxPrice(){
    if($("#maxPriceInput").val()){
        var number = parseInt(maxPriceInput.val().trim());
        maxPrice = "&lt_msrp=" + (number + 0.01);
        maxPriceDisplay.text("Maximum Price (MSRP): $" + number);
    }
    console.log(maxPrice);
}
// Function to add mechanic to the screen ***NEEDS UPDATING TO LINK TO MECHANICS IDs***
function addMechanic(){
    var mechanic = mechanicInput.find('option:selected').attr('data-id');
    if(mechanic === "none"){
        mechanicID = "";
        console.log(mechanicID);
    }
    else{
        mechanicID = "&mechanics=" + mechanic;
        mechanicDisplay.text("Mechanic: " + mechanic);
        console.log(mechanicID);
    }
}
// Function to add category to the screen *** NEEDS UPDATING TO LINK TO CATEGORY IDs***
function addCategory(){
    var category = categoryInput.find('option:selected').attr('data-id');
    if(category === "none"){
        categoryID = "";
    }
    else{categoryID = "&categories=" + category;
        categoryDisplay.text("Category: " + category);
        console.log(categoryID);
    }   
}
// Function to check if mechanics match
function checkMechanics(game, mechID){
    var array = game.mechanics;
    for(var j = 0; j < array.length; j++){
        if(array[j].id === mechID){
            return true;
        }
    }
}
// Function to check if categories match
function checkCategory(game, catID){
    var array = game.categories;
    for(var i=0; i<array.length; i++){
        if (array[i].id === catID){
            return true;
        }
    }
}
// Function to clear search box and display box
function clearSearch(){
    event.preventDefault();

    gameBox.empty();
    $("#nameInput").val("");
    $("#minPlayersInput").val("");
    $("#maxPlayersInput").val("");
    $("#mechanicInput").set()
    $("#maxPriceInput").val("");
    console.log("clear");
}
// Function to search Youtube
// function youtubeResponse(){
//     var youtubeQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + videoType + selectedGame + "&type=video&key=AIzaSyAjs8I4xGPzoBBcuCk4afKvx-IRoVaQX0A"

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response){
//         console.log(response);

//         for ( var i = 0; i < maxResults; i++) {
//           var videoDiv = $("<div>");
//           var header = $("<h3>");
//           var description = $("<p>");
//           var videoThumbnail = $('<iframe width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>')

//           console.log("videoDiv " + (i+1));

//           videoDiv.append(header);
//           videoDiv.append(videoThumbnail);
//           videoDiv.append(description);
//           $(".video-results").append(videoDiv);

//           var videoTitle = response.items[i].snippet.title;
//           console.log(videoTitle);

//           var videoId = response.items[i].id.videoId;
//           console.log(videoId);

//           var videoDescription = response.items[i].snippet.description
//           console.log(videoDescription);

//           videoDiv.attr("id","video" + (i+1));
//           header.text(videoTitle);
//           description.text(videoDescription);
//           videoThumbnail.attr("src","https://www.youtube.com/embed/" + videoId)

//         };  
//     });
//   };


searchButton.on("click", searchGames);

clearButton.on("click", clearSearch);

// $(document).on("click", "#vidSubmit", youtubeResponse());