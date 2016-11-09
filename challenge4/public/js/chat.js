/*
 * This file should contain code for the following tasks:
 * 1. Display the list of chat messages.
 * 2. Send a new message.
 * 3. Allow a user to delete their own messages.
 * 4. Allow a user to log out.
 * 5. Redirect a user to index.html if they are not logged in.
 */

var messagesList = document.getElementById("messages");
var logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", function (e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    // If the user is logged in, user will be an object (truthy).
    // Otherwise, it will be null (falsey).
    if (user) {
        // Connect to firebase
        var database = firebase.database();
        var messages = database.ref('channels/general').limitToLast(5);

        // This event listener will be called for each item
        // that has been added to the list.
        // Use this to generate each chat message,
        // both on initial page load and whenver someone creates a new message.
        messages.on('child_added', function(data) {
            var id = data.key;
            var message = data.val();

            var text = message.text;
            var timestamp = moment(message.timestamp).format("MMM Do, YYYY, h:mm:ss a");
            var photo = message.photoURL;
            var displayName = message.displayName;

            var messageBox = document.createElement("div");
            messageBox.className = "message-box"
            messageBox.id = id;

            var profImg = document.createElement("img");
            profImg.src = photo;
            profImg.alt = "No Picture";
            messageBox.appendChild(profImg);

            var displayNameh2 = document.createElement("h2");
            displayNameh2.innerHTML = displayName;
            messageBox.appendChild(displayNameh2);

            var time = document.createElement("h3");
            time.innerHTML = timestamp;
            messageBox.appendChild(time);

            var messageP = document.createElement("p");
            messageP.innerText = text;
            messageBox.appendChild(messageP);

            if (firebase.auth().currentUser.uid = message.user) {
                var editButt = document.createElement("button");
                editButt.className = "userButt";
                editButt.innerHTML = "Edit";
                messageBox.appendChild(editButt);

                var delButt = document.createElement("button");
                delButt.className = "userButt";
                delButt.id = "del" + id;
                delButt.innerHTML = "Delete";
                delButt.onclick = function(e) {
                    var confirmation = confirm("Delete message?");
                    if (confirmation) {
                        var database = firebase.database();
                        var ref = database.ref('channels/general/' + id);
                        console.log(ref);
                        ref.remove();
                    }
                }
                messageBox.appendChild(delButt);
                
            }

            messagesList.appendChild(messageBox);
        });

        // This event listener will be called whenever an item in the list is deleted.
        // Use this to remove the HTML of the message that was deleted.
        messages.on('child_removed', function(data) {
            var id = data.key;
            var message = document.getElementById(id);
            message.parentNode.removeChild(message);
        });

    } else {
        // If the user is not logged in, redirect to index.html
        window.location.href = "index.html";
    }
});

var messageForm = document.getElementById("message-form");
var messageInput = document.getElementById("message-input");

// When the user submits the form to send a message,
// add the message to the list of messages.
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Connect to the firebase data
    var database = firebase.database();

    // Get the ref for your messages list
    var messages = database.ref('channels/general');

    // Get the message the user entered
    var message = messageInput.value;

    //Get the user
    var user = firebase.auth().currentUser;

    // Create a new message and add it to the list.
    messages.push({
        user: user.uid,
        text: message,
        timestamp: new Date().getTime(), // unix timestamp in milliseconds
        photoURL: user.photoURL,
        displayName: user.displayName
    })
    .then(function () {
        // message created succesfully
        messageInput.value = "";
        messageInput.focus();
        
    })
    .catch(function(error) {
        // message not created succesfully
        var messageError = document.getElementById("message-error");
        messageError.textContent = error.message;
        messageError.classList.add('active');
    });
});