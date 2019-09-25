let hrefVal = $(location).attr('href')
let url = hrefVal.slice(28)



$(document).ready(() => {
  // $('#rsvp').on('click', (event) => {
  //   $.ajax({
  //     url: '/api/testrender',
  //     method: 'POST',
  //     data: {url},
  //     success: function() {
  //       console.log('WOOOOOOOT')
  //     }
  //   })
  // })


  $('#rsvp').on('click', (event) => {
    event.preventDefault();
    console.log(url)
    $.ajax({  // adds the event name and desc and location to database
      url: '/api/testrender',
      method: 'GET',
      data: {url: url},
      success: function(response) {
        console.log('WEEEEEOEOEOEOEOEOEOOOO')
      }
    })

  })





})
