$(document).ready(function() {

    var topics = [];

    function displayGifs() {
        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=oN3X6jHiRb3vdFf66lYv6z1VmUGL2Hb6&limit=10";
        var test = $(this);
         $("#topic-gifs").empty();


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var topicDiv = $("<div class='etc'>"); //Create container div

                var animateURL = response.data[i].images.fixed_height.url; //Store image
                var stillURL = response.data[i].images.fixed_height_still.url;
                var imgTag = $("<img>"); //Create image tag
                imgTag.attr("src", animateURL); //Create src attritbute to display image
                imgTag.data("state", "animate");
                imgTag.data("animate", animateURL);
                imgTag.data("still", stillURL);
                imgTag.addClass("animation");

                var rating = "Rating: " + response.data[i].rating;  //Store rating
                var pTag = $("<p>"); // Create p tag
                pTag.html(rating); // Insert rating

                topicDiv.append(imgTag); //Append, adds to the end of elements
                topicDiv.prepend(pTag); //Prepend, adds to the beginning of elements

                $("#topic-gifs").append(topicDiv);

                // ** TEST **
                console.log(topicDiv, [i]);
            };


        // ** TEST **
            console.log(response, "GIPHY API");
            // console.log (response.data.length, "LENGTH");
            // console.log(response.data[0].images.fixed_height.url);
        });
    }

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


    function createButtons() {
        $("#topic-buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>"); //Create Button
            a.addClass("topic"); //Adds class to button
            a.attr("data-name", topics[i]); //Adds a data value to button
            a.text(topics[i]); //Adds text to button
            $("#topic-buttons").append(a);

            // **TEST**
            // console.log(a);
        }

    }



    $("#add-topic").on("click", function(event) {
        event.preventDefault(); //Prevents default functionality of button
        var topic = $("#topic-input").val().trim(); //Extact value from text
        topics.push(topic);
        createButtons();

        // **TEST**
        // console.log(topics, "topics");


    });



    $(document).on("click", ".topic", displayGifs);

    $(document).on("click", ".animation", animateGifs);

});


