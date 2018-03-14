  $(document).ready(function() {
      // Initial array of dogs
      var dogsArr = ["pomeranian", "shiba", "corgi", "chihuahua"];

      // Function re-renders HTML to display content.
      function displayTopics() {


          var dog = $(this).attr("data-name");
          var random = Math.floor(Math.random() * 1000);
          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=dc6zaTOxFJmzC&tag=dog&limit=5&rating=g&offset=" + random;


          // AJAX call to GIPHY's API.
          $.ajax({
                  url: queryURL,
                  method: "GET"
              })
              .then(function(response) {
                  console.log("DOGGO ALERT!")

                  // Stores resulting data from GIPHY request in variable.
                  var dataGIPHY = response.data;

                  // Clears dog Gifs
                  $("#dogGifsHere").empty();

                  // Loops through each resulting item.
                  for (var j = 0; j < dataGIPHY.length; j++) {

                      // Creates and store div tag.
                      var dogDiv = $("<div class='dog'>");

                      // Creates paragraph tag with resulting item's rating.
                      var p = $("<p>").text("Rating: " + dataGIPHY[j].rating);

                      // Creates and stores image tag.
                      var dogImage = $("<img>");

                      // Sets src attribute of image to property pulled off resulting item.
                      dogImage.attr("src", dataGIPHY[j].images.fixed_width.url);

                      // Appends paragraph and image tag to dogDiv
                      dogDiv.append(p).append(dogImage);

                      // Adds data to div.
                      $("#dogGifsHere").append(dogDiv);
                  }

              });
      }

      // Function for displaying GIF.
      function renderButtons() {
          // Deletes dog GIFs prior to adding new ones.
          $("#topics").empty();

          $("#dogInput").empty().html("Search another kind of doggo!");

          // Loops through array of dogs.
          for (var i = 0; i < dogsArr.length; i++) {
              //var dog = $(this).attr("data-name");
              $("#topics").prepend($("<button>").addClass("dogButton").attr("data-name", dogsArr[i]).text(dogsArr[i]));
          }
      }

      // Event listener for "addDog" button.
      $("#addDog").on("click", function(event) {

          event.preventDefault();
          // Grabs input from textbox
          var dog = $("#dogInput").val().trim();

          // Adds dog from textbox to existing array of dogs.
          dogsArr.push(dog);
          renderButtons();
      });

      // Adds click event listener to all elements with class of "dogButton"
      $(document).on("click", ".dogButton", displayTopics)

      // Calls function to display initial buttons.
      renderButtons();
  });

  // COMMENTS:
  // #topics div won't empty when buttons clicked