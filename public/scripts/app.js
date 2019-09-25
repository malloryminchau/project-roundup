function generateRandomString() { // this function generates a random 10 character string of alphanumeric characters
  let stringId = '';
  let alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
  for (let i = 0; i < 10; i++) {
    stringId += alphaNumeric.charAt(Math.floor(Math.random() * alphaNumeric.length));
  }
  return stringId;
}



$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(({users}) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});


