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
        console.log(response);
        $('#user-authentication').toggle('slide')
        let optionID = 0

          response.forEach(element => {
            optionID = optionID + 1;

            $('#options').append(`<div class="ui checkbox">
            <input type="checkbox" tabindex="0" class="hidden" id='${optionID}'>
            <label>${element.time}</label>

            <script>
            $('.ui.checkbox').checkbox('toggle')
            </script>
            `)
          });


        console.log('WEEEEEOEOEOEOEOEOEOOOO')
        console.log(response)
      }
    })

  })

})
