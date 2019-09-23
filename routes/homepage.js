const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  $(document).ready(() => {
// Help FAQ page that toggles down from nav bar or under title to give instructions for how to fill in the form.
    $('#help-desc-button').on('click', (event) => { // button that targets the body to allow for a toggle to be activated
      event.preventDefault();
      $('#help-desc-body').slideToggle(); //target location for the toggle description --> toggles the field down
    })

// CREATE NEW BUTTON CLICKED everything else is toggled away (if help is toggled move it up) name field toggled
    $('#new-event-button').on('click', (event) => { //new-event-button is a stand in for now before route id is selected
      event.preventDefault();
      $('#help-desc-body').toggleUp(); //change command to make sure this is toggled UP when this is clicked (default on all stages)
      $('#name-entry-field').slideToggle(); //name fill in form slides down
    })

// NEXT BUTTON FROM NAME ENTRY FIELD when clicked the name field should toggle away and the new form will toggle down
    $('#next-button-from-name').on('click', (event) => {
      event.preventDefault();
      //POST REQUEST to database for USERS table
      $.ajax({
        url: '/',
        method: 'POST',
        data: 'nameInput', //willhave multiple values for the database. figure out how this integrates into a query
        success: function() {
          addNewName('fill-in-parameters');  //Andrews file/ callable function to input the data into the file
        }
      })
      //post request for the name field
      $('#help-desc-body').toggleUp();
      $('#name-entry-field')
      $('#event-description-field-body').slideToggle();
    })

// NEXT BUTTON FROM EVENT FIELD after the event name and desc its toggled up and the time options are toggled down
    $('#next-button-from-event').on('click', (event) => {
      event.preventDefault();
      $.ajax({  // adds the event name and desc and location to database
        url: '/',
        method: 'POST',
        data: 'eventInput',
        success: function() {
          addNewEvent('fill-in-with-parameters'); //Andrew file/callable function parameters and name here
        }
      })
      $('#event-description-field-body').toggleUp();
      $('#new-proposal-form-body').slideToggle();
    })

    $('#next-button-from-proposal-form').on('click', (event) => {
      event.preventDefault();
      router.post("/:newURL", (req, res) => {
        $.ajax({
          url: `${'url-name-based-on-database'}`,
          method: 'POST',
          data: 'proposals',
          success: function() {
            addNewProposal('fill-in-parameters');
          }
        })
        //newURL needs to come from SQL query after event is created
        res.redirect("/:newURL")
      })

    })
  })

};
