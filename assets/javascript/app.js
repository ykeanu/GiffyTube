$(document).ready(function() {

    // Automatically pre-set topics
    var topics = ["Skydiving", "Programming", "Mountain Climbing", "Memes", "DJ Khalid"];

    // Accesses Giffy API and places the image on the page
    function displayGifs() {
        var topicSearch = $(this).attr("data-name").replace(" ", "+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=oN3X6jHiRb3vdFf66lYv6z1VmUGL2Hb6&limit=9";
        var test = $(this);
         $("#topic-gifs").empty();

         // Giffy API call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var topicDiv = $("<div class='etc col-lg-4 col-md-4 col-sm-6 col-xs-12'>"); 
                var animateURL = response.data[i].images.fixed_height.url; 
                var stillURL = response.data[i].images.fixed_height_still.url;
                var imgTag = $("<img>"); 
                imgTag.attr("src", animateURL); 
                imgTag.data("state", "animate");
                imgTag.data("animate", animateURL);
                imgTag.data("still", stillURL);
                imgTag.addClass("animation");

                var rating = "Rating: " + response.data[i].rating;  
                var pTag = $("<p>"); 
                pTag.html(rating);

                topicDiv.append(imgTag);
                topicDiv.prepend(pTag);

                $("#topic-gifs").append(topicDiv);
            };

        });
    }

    // Pause or play gifs
    function animateGifs() {
        var state = $(this).data("state");
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).data("state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).data("state", "still");
        }
    }

    // Generates buttons based on user searches or topics
    function createButtons() {
        $("#topic-buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button class='btn btn-primary'>");
            a.addClass("topic"); 
            a.attr("data-name", topics[i]); 
            a.text(topics[i]); 
            $("#topic-buttons").append(a);
        }

    }

    // Click the search button to create a topic button based on user search
    $("#add-topic").on("click", function(event) {
        event.preventDefault(); //Prevents default functionality of button
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        createButtons();

    });

    // Generates pre-set topics automatically
    createButtons();

    // Click a button to populate page
    $(document).on("click", ".topic", displayGifs);

    // Click on gif to pause or play
    $(document).on("click", ".animation", animateGifs);


});


