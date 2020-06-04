# 4. Add project specific functionality to SPA
> In scope of this lab students continue practice with single page application. SPA shall be
> extended with variant specific functionality using static layouts from lab #1. As a result 
> all features shall be implemented. Code shall meet requirements from lab #3.

## Required pages and functionality:

- ### SPA shall communicate with back end via REST interface:

   * [[CODE - routes]](https://github.com/Vilka284/web-lab-1-4/blob/master/server/routes.py)
   * [[CODE - chat server]](https://github.com/Vilka284/web-lab-1-4/blob/master/server/room_api/chat.py)
   * [[CODE - chat client]](https://github.com/Vilka284/web-lab-1-4/blob/master/client/templates/chat.html)

- ### Data exchange shall be done in JSON format:
   * [CODE](https://github.com/Vilka284/web-lab-1-4/tree/master/client/static/scripts)
    ```javascript
    contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                'name': name,
                'description': description,
                'id_user': sessionStorage.getItem('id_user')
            }),
            dataType: "json",
            headers: {"auth_token": sessionStorage.getItem('auth_token')},
            success: function (data) {
                $('#msg').html('<span style="color: green;">Room created successfully</span>');
            }
    ```
  

- ### Shall be accessible on localhost:5000 address:
    * [requirement completed]

- ### Errors nor logs in console:
    * _Screenshot of console:_
![alt-текст](https://github.com/Vilka284/web-lab-1-4/blob/master/WebDevelopment/Lab4/img/console.png "Console")
![alt-текст](https://github.com/Vilka284/web-lab-1-4/blob/master/WebDevelopment/Lab4/img/console2.png "Console")
![alt-текст](https://github.com/Vilka284/web-lab-1-4/blob/master/WebDevelopment/Lab4/img/pyconsole.png "Console")

- ### Loading speed less than 4 seconds 
    * _Screenshot of network:_
![alt-текст](https://github.com/Vilka284/web-lab-1-4/raw/master/WebDevelopment/Lab2/img/network.png "Network")
    
- ### At least 2 browsers supported 
    * [requirement completed]
    
- ### No commented code
    * [requirement completed]
    
- ### Environment shall be easily set up by checkouting git repository and executing simple commands. Step-by-step instruction shall be documented in README.md file.
    * [requirement completed]
    
- ### After navigation to any page it should be displayed after a refresh. For example, you navigate to /users, press F5, /users page shall be displayed.
    * [requirement completed]
    
- ### Put presentation logic in the component class: for example, don’t make arithmetical operations in the template:
    * [CODE - template](https://github.com/Vilka284/web-lab-1-4/blob/master/client/templates/polls/results.html)
    * [CODE - script](https://github.com/Vilka284/web-lab-1-4/blob/master/client/static/scripts/polls/main.js)
    * _Screenshot:_
    
![alt-текст](https://github.com/Vilka284/web-lab-1-4/blob/master/WebDevelopment/Lab4/img/room.png "Room")

* _Screenshot:_

![alt-текст](https://github.com/Vilka284/web-lab-1-4/blob/master/WebDevelopment/Lab4/img/room2.png "Room")

