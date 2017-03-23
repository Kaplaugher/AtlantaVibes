---
'AtlantaVibes is a Full-Stack application that aggregates data from the top ten music festivals into one easy to use website. AtlantaVibes lets users view, rate, comment and purchase tickets for their favorite festivals in Atlanta.'
---

# AtlantaVibes - The Best Atlanta Music Festival Resource

## About:

- HTML5
- CSS3
- Bootstrap
- SASS
- JavaScript
- jQuery
- React.js
- Redux
- Node.js/Express
- NPM modules
- MySql
- AWS

## Challenges:

--------------------------------------------------------------------------------

1. Using the Google Maps API with the NPM Package "React-Google-Maps" to successfully get a map rendered onto the screen.
2. Manipulating the Google Maps API to accomplish things like:

  1. Changing visibility of markers based on zoom level.
  2. Targeting markers with JavaScript that only appear based on current render().

    1. Resetting the map zoom after an event.
    2. Using info windows to perform actions on the map.

3. Using React-Router to make our NavBar a have single page links.
4. Styling the map while using React and React-Google-Maps.

## Authors

--------------------------------------------------------------------------------

- [Drew "drewcoparker" Parker](https://github.com/drewcoparker)
- [Rishi "JASONS DELI" Karri](https://github.com/rishikarri)
- [Kyle "Graves Mid" Plaugher](https://github.com/Kaplaugher)
- [Sean "Phaaaaaser" Bhupathi](https://github.com/seanbhup)

## Future Installments:

--------------------------------------------------------------------------------

- Directions to locations with Google Maps
- Account Settings
- Expand to more cities

## Code Examples

--------------------------------------------------------------------------------

Snippet of our comment container which renders the comments.

```javascript
render() {
    let commentsArray = []
    this.state.comments.map((comment, index) => {

        // grab time for each comment and make it look nice
        var date = new Date(comment.timestamp)
        var niceLookingDate = dateformat(date, 'fullDate');
        var niceLookingTime = dateformat(date, 'shortTime');
        // var dateString = String(date);


        // grab a default image from the back end in case the user has not uploaded a photo
        var defaultUserImagePath = 'http://kapcode.me:3030/images/avatars/default-user-image.jpg';

        // grab the image that the user uploaded from the back ends
        var avatarImageName = comment.avatar_the_last_airbender;
        var avatarImagePath = 'http://kapcode.me:3030/images/avatars/'+avatarImageName

        // if the user did not upload a picture, use a default image
        if (avatarImageName === null){
            avatarImagePath = defaultUserImagePath;
        }


        return commentsArray.push(                
            <tr key={index}>
                <td className='avatar-image-td'>
                    <img className='avatar-image' alt="Avatar" src={avatarImagePath} />
                </td>
                <td className="comment">
                  <p className='comment-username'>{comment.username}</p>
                  <p className="comment-text">{comment.comment}</p>
                </td>
                <td>
                    <p className="comment-date">{niceLookingDate}</p>
                    <p className="comment-date">{niceLookingTime}</p>
                </td>

            </tr>
        )
    })
    return (            
            <table className="table table-striped comment-table">
                <tbody>
                    {commentsArray}
                </tbody>
            </table>
    )

  }
```

Posting Comments to MySql.

```javascript
// Route that fires when a user posts a comment
router.post('/postComment', (req, res, next) => {
  // grab necessary fields for user comment
    var timestamp = req.body.timestamp;
    var festival_id = req.body.festivalId;
    var comment = req.body.userPost;
    var username = req.body.username;
    var user_id;
// Set up MySql query which grabs relevant user id and avatar
    var getUserQuery = `SELECT id, avatar_the_last_airbender FROM user_info WHERE username = ?`;
    connection.query(getUserQuery, [username], (error, results, fields) => {
        if (error) throw error;
        // grab the user id and avatar from the database so that we can pass it to the front end
        user_id = results[0].id;
        var avatar_the_last_airbender = results[0].avatar_the_last_airbender;
// insert comment in database
        var insertCommentQuery = `INSERT INTO comments (user_id, comment, festival_id, timestamp) VALUES (?, ?, ?, ?)`;
        connection.query(insertCommentQuery, [user_id, comment, festival_id, timestamp], (error2, results2, fields2) => {
            if (error2) throw error2;

            // need to convert the timestamp to a number before sending it back to the front-end so that we can convert it to a date object
            timestamp = Number(timestamp);
            // package necessary props into JSON format for front-end to use
            res.json({
                comment: comment,
                username: username,
                timestamp: timestamp,
                avatar_the_last_airbender: avatar_the_last_airbender
            });
        });
    });
});
```


## Screenshots

--------------------------------------------------------------------------------

Homescreen when you first start out ![alt text](https://github.com/optipwr/Geography-Game/blob/master/screenshots/Homescreen.png "Homescreen.png")

Info window when marker is found ![alt text](https://github.com/optipwr/Geography-Game/blob/master/screenshots/InfoWindow.png "InfoWindow.png")
