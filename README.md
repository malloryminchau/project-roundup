## Description

An event proposal application where users can generate an event proposal with multiple possible event start times for invitees to RSVP. A unique URL is generated every time a new event is created and invitees can follow the URL to cast their RSVP or edit their existing RVSP. Users will be able to visually see results for every other invitee that has already RSVP-ed.

## Final Product

Users will need to fill in their name, email and event information to start creating an event proposal.
![](https://github.com/malloryminchau/project-roundup/blob/master/Pictures/Create%20event%20and%20user.gif)

One the event information is enetered, the creator can enter in as many possible event times that they would like. Once the event is created, the user will be directed to a new page that is generated with a unique url. In this page view, we can see that the original creator will be able to attend all potential start times.
![](https://github.com/malloryminchau/project-roundup/blob/master/Pictures/event%20possible%20times.gif)

Invitees can follow the unique url generated to RSVP.
![](https://github.com/malloryminchau/project-roundup/blob/master/Pictures/RSVP.gif)

Invitees can edit their own RSVPs by entering in their email address that they used to RSVP initially.
![](https://github.com/malloryminchau/project-roundup/blob/master/Pictures/Edit%20RSVP.gif)




## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

