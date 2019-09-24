

  $(document).ready(() => {
// Help FAQ page that toggles down from nav bar or under title to give instructions for how to fill in the form.
    // $('#help-desc-button').on('click', (event) => { // button that targets the body to allow for a toggle to be activated
    //   event.preventDefault();
    //   $('#help-desc-body').slideToggle(); //target location for the toggle description --> toggles the field down
    // })

// CREATE NEW BUTTON CLICKED everything else is toggled away (if help is toggled move it up) name field toggled
    $('#create-event-start').on('click', (event) => { //new-event-button is a stand in for now before route id is selected
      event.preventDefault();
      console.log("Hello I am working!")
      // $('#help-desc-body').toggleUp(); //change command to make sure this is toggled UP when this is clicked (default on all stages)
      $('#name-email-body').slideDown(); //name fill in form slides down
    })

// NEXT BUTTON FROM NAME ENTRY FIELD when clicked the name field should toggle away and the new form will toggle down
    $('#name-email-next').on('click', (event) => {
      event.preventDefault();
      //POST REQUEST to database for USERS table
      const nameInput = [$('#name-field').val(), $('#email-field').val()];
      $.ajax({
        url: '/api/name',
        method: 'POST',
        data: {nameInput}, //willhave multiple values for the database. figure out how this integrates into a query
        success: function(response) {  //Andrews file/ callable function to input the data into the file
          console.log(response)
          window.localStorage.setItem('email', response)
          $('#name-email-body').slideUp();
          $('#event-description-body').slideDown();
        }
      })

    })


// NEXT BUTTON FROM EVENT FIELD after the event name and desc its toggled up and the time options are toggled down
    $('#description-location-next').on('click', (event) => {
      event.preventDefault();
      console.log(window.localStorage.getItem('email'))
      let email = window.localStorage.getItem('email')
      const eventInput = [$('#event-name').val(), $('#event-description').val(), $('#event-location').val(), email]
      $.ajax({  // adds the event name and desc and location to database
        url: '/api/eventdesc',
        method: 'POST',
        data: {eventInput},
        success: function(response) {
          window.localStorage.setItem('url', response)
          $('#event-description-body').slideUp();
          $('#proposal-times-body').slideDown();
        }
      })

    })

    $("#proposal-save-button").on("click", event => {
      event.preventDefault();
      console.log(window.localStorage.getItem('url'))
      let url = window.localStorage.getItem('url');
      console.log($("#proposal-calendar").val())
      const availabilities = [$("#proposal-calendar").val(), url];

      $.ajax({
        url: `/api/availabilities`,
        method: "POST",
        data: { availabilities },
        success: function() {
          $("#proposal-calendar").val("");
          // $("#proposal-times-body").slideUp();
        }
      });
    });

    })



