let hrefVal = $(location).attr('href')
let url = hrefVal.slice(28)

let optionID = 0
let timeArray = []



$(document).ready(() => {

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
  $.ajax({  // adds the event name and desc and location to database
    url: '/api/testrender',
    method: 'GET',
    data: {rsvpData: rsvpData},
    success: function(response) {
      console.log("THIS IS THE RESPONSE I AM LOOKING FOR: " + response)
    //console.log($('#1').val())
    // console.log($('#1').checkbox('is checked'))
    // console.log($('#2').checkbox('is checked'))
    // console.log($('#3').checkbox('is checked'))
    // console.log($('#4').checkbox('is checked'))

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
  }
  // $.ajax({
  //   url: '/api/rsvpconfirm',
  //   method: 'PUSH'
  // })
})


  $('#home-redirect').on('click', (event) => {
    window.location.replace('/');
  })

}) // end of document ready
