let hrefVal = $(location).attr('href')
let url = hrefVal.slice(28)

let optionID = 0
let timeArray = []



$(document).ready(() => {

  $.ajax({
    url: '/api/loadtable',
    method: 'GET',
    data: {url: url},
    success: function(response) {
      let allTimes = []
      let allNames = []
      let uniqueTimes = []
      let uniqueNames = []

      console.log("THIS IS THE RESPONSE: ", response)


      response.forEach(function(element) {
        allTimes.push(element.time);
      })

      response.forEach(function(element) {
        allNames.push(element.name);
      })

      uniqueNames = [... new Set(allNames)];
      console.log("UNIQUE NAMESSSS: " + uniqueNames)

      uniqueTimes = [... new Set(allTimes)];
      console.log("UNIQUE TIMES: " + uniqueTimes)



      uniqueTimes.forEach(function(time) {
        $('#table-times').append(`
        <th rowspan = "1" class="center aligned">${time}</th>
        `)

        $('#smalltime').append(`
        <h3>${time}</h3>
        `)
      })

      uniqueNames.forEach(function(name){
        $('#smallname').append(`
        <h3>${name}</h3>`)
      })

      uniqueNames.forEach(function(name){
        let tempArray = []

      uniqueTimes.forEach(function(time){
        response.forEach(function(element) {
          if (element.name === name && element.time === time){
            console.log("Match Found", name, time, element.availability)
            tempArray.push(element.availability);
          }
        })
      })


      console.log("TEMPARRAY", tempArray)

        let new_row = $('#rows').append(`<tr>`);

        new_row.append(`<td class="center aligned">${name}</td>`)

        tempArray.forEach(function(aTime){
          if (aTime === true) {
            new_row.append(`<td class="center aligned"><i class="large green checkmark icon"></i></td>`)
          } else {
            new_row.append(`<td class="center aligned"><i class="large red ban icon"></i></td>`)
          }


          // new_row.append(`<td class="center aligned">${aTime}</td>`)

      })



    })










    }//end of success
  })


  $('#rsvp').on('click', (event) => {
    event.preventDefault();
    // console.log(url)
    // console.log(response);
    $('#user-authentication').toggle('')
    $('#rsvp').toggle('')
  })

  $('#confirm-user').on('click', (event) => {
    event.preventDefault();
    $('#user-authentication').toggle('')
    $('#availability-modify').toggle('')
    let rsvpData = [$('#name-input').val(), $('#email-input').val(), url]
    window.localStorage.setItem('voteemail', $('#email-input').val())
    console.log(rsvpData)
    $( 'div' ).remove('.checkbox');
    $.ajax({  // adds the event name and desc and location to database
      url: '/api/testrender',
      method: 'GET',
      data: {rsvpData: rsvpData},
      success: function(response) {
        console.log("THIS IS THE RESPONSE I AM LOOKING FOR: " + response)

      optionID = 0
      $('#options').empty();
      response.forEach(element => {
        optionID = optionID + 1;
        timeArray.push(element.time)
        $('#options').append(`<div class="ui checkbox" id='${optionID}'>
        <input type="checkbox" tabindex="0" class="hidden" >
        <label>${element.time}</label>
        <script>
        $('.ui.checkbox').checkbox('enable')
        </script>
        `)
      })
    }
    })
  })

  // submit form for new vote user
  $('#confirm-rsvp').on('click', (event) => {
    event.preventDefault();
    $('#availability-modify').toggle('')
    $('#rsvp').toggle('')
    let booleanArray = []
    for (let i = 1; i <= optionID; i++) {
      booleanArray.push($(`#${i}`).checkbox('is checked'))
      // timeArray.push($(`#${i}`))
      console.log($(`#${i}`).checkbox('is checked'))
    }
    console.log(booleanArray)
    console.log(timeArray)
    let email = window.localStorage.getItem('voteemail')
    for (let i = 1; i <= optionID; i++) {
      let proposalData = []
      proposalData.push(url, email, timeArray[i-1], booleanArray[i-1])
      console.log(proposalData)
      $.ajax({
        url: '/api/insertvote',
        method: 'POST',
        data: {proposalData: proposalData},
        success: function(response) {
          console.log("data has been sent successfully")
          window.location.reload();

          // let new_row = $('#rows').append(`<tr>`);

          // new_row.append(`<td class="center aligned">${name}</td>`)

          // tempArray.forEach(function(aTime){
          //   new_row.append(`<td class="center aligned">${aTime}</td>`)
          // })

        }
      })
    }
  })

  // toggles down the editor container
  $('#edit-rsvp').on('click', (event) => {
    event.preventDefault()
    $('#edit-rsvp-authentication').toggle('')
    let editData = url
    console.log("THE URL IS: " +url)
    $.ajax({  // adds the event name and desc and location to database
      url: '/api/editvoteinput',
      method: 'GET',
      data: {editData: editData},
      success: function(response) {
        console.log("THIS IS THE RESPONSE I AM LOOKING FOR: " + response)
      optionID = 0
      $('#edit-options').empty();
      response.forEach(element => {
        optionID = optionID + 1;
        timeArray.push(element.time)
        $('#edit-options').append(`<div class="ui checkbox" id='${optionID}'>
        <input type="checkbox" tabindex="0" class="hidden" >
        <label>${element.time}</label>
        <script>
        $('.ui.checkbox').checkbox('enable')
        </script>
        `)
      })
    }
    })
  })

  $('#edit-confirm').on('click', (event) => {
    event.preventDefault();
    $('#edit-rsvp-authentication').toggle('')

    let booleanArray = []
    for (let i = 1; i <= optionID; i++) {
      booleanArray.push($(`#${i}`).checkbox('is checked'))
      // timeArray.push($(`#${i}`))
      console.log($(`#${i}`).checkbox('is checked'))
    }
    console.log(booleanArray)
    console.log(timeArray)
    let email = $('#edit-email').val()
    for (let i = 1; i <= optionID; i++) {
      let proposalData = []
      proposalData.push(url, email, timeArray[i-1], booleanArray[i-1])
      console.log(proposalData)
      $.ajax({
        url: '/api/editvote',
        method: 'POST',
        data: {proposalData: proposalData},
        success: function(response) {
          console.log("data has been sent successfully")
          window.location.reload();
        }
      })
    }
  })

  $('#location')
  .popup({
    content : 'Click me to open Google Maps!'
  })
;


  $('#home-redirect').on('click', (event) => {
    window.location.replace('/');
  })

  $('.hover').hover(function(){
    $(this).css("background-color", "#29568C")
  }, function() {
    $(this).css("background-color", "")
  })

  // $('#rsvp').mouseLeave(function(){
  // })

}) // end of document ready
