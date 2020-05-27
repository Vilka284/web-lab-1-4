# LAB 2. Client-server interaction in scope of SPA
> In scope of this lab students should practice fetching data from the back-end using AJAX.
> Student shall create application which makes requests to API (back-end from the previous 
> course can be reused) and displays parsed response

## Requirements:

- ### Pure JS, no jQuery or other libraries:

   * [CODE](https://github.com/Vilka284/web-lab-1-4/tree/master/client/static/scripts)
    ```javascript
    document.getElementById("join_button").onclick = function e() {
        e.preventDefault();
        var isLoggedIn = localStorage.getItem('loggedin');

        if (isLoggedIn == 1) {
            location.replace('/join');
        } else {
            location.replace('/login');
        }
    };
   ```
  
  
- ### window.fetch or XMLHttpRequest can be used for AJAX calls:

   * [CODE](https://github.com/Vilka284/web-lab-1-4/tree/master/client/static/scripts)

   ```javascript
  function update() {

    $.ajax({
        method: "POST",
        url: '/update_manage',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify({'id_user': localStorage.getItem('id_user')}),
        dataType: "json",
        headers: {"auth_token": localStorage.getItem('auth_token')},
        success: function (data) {
            $('#message').remove();
            $('#header1').remove();
            var rooms = data.rooms;
            var Header = document.createElement('h1');
            var text = document.createTextNode(data.message);
            // add text to header
            Header.appendChild(text);
            Header.id = 'header1';
            Header.className = 'header1';
            var iDiv = document.createElement('div');
            iDiv.id = 'message';
            iDiv.className = 'message';
            iDiv.style = 'display: grid;\n' +
                '  font-family: Coda;\n' +
                '  grid-column-gap: 30px;\n' +
                '  grid-template-columns: auto auto auto;\n' +
                '  background-color: #dfe3f3;\n' +
                '  padding: 10px;';
            //Add main div and header
            document.getElementsByTagName('body')[0].appendChild(Header);
            document.getElementsByTagName('body')[0].appendChild(iDiv);


            //Dynamic create room data elements
            for (let room = 0; room < rooms.length; room++) {
                for (let element = 0; element < 3; element++) {
                    var innerDiv = document.createElement('div');
                    var info = null;
                    var code = rooms[room][0];
                    switch (element) {
                        case 0:
                            info = `<a href="/room/${code}"> ${code} </a>`;
                            break;
                        case 1:
                            info = rooms[room][element] + ' : ' + rooms[room][element + 1];
                            break;
                        case 2:
                            info = `<a href="/manage/${code}">Manage this room </a>`;
                            break;
                        default:
                            break;
                    }
                    innerDiv.id = `room-data-${room}-${element}`;
                    innerDiv.className = 'room-data';
                    innerDiv.style = 'background-color: rgba(255, 255, 255, 0.8);\n' +
                        '  border: 1px solid rgba(0, 0, 0, 0.8);\n' +
                        '  font-family: Coda;\n' +
                        '  padding: 15px;\n' +
                        '  font-size: 20px;\n' +
                        '  text-align: center;';
                    iDiv.appendChild(innerDiv);
                    innerDiv.innerHTML = info;
                }
            }

        },
        statusCode: {
            400: function (data) {
                $('#msg').html('<span style="color: red;">Bad request parameters</span>');
                if (data.message == 'token expired' || 'Invalid token, please try again'){
                        localStorage.setItem('auth_token', 0);
                        location.replace('/login');
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });


}

$(document).on('submit', '#room-form', function(a){
    a.preventDefault();
    update();
});

document.onload = update();
  ```
  
  
- ### At least 3 API endpoints are used:

   * [CODE](https://github.com/Vilka284/web-lab-1-4/blob/master/server/routes.py)
    ```python
@user_api.route("/register", methods=["POST"])
def create():
    """
    Create user function
      """

    data = request.json

    # validation of the received data
    if not validate_json(create_schema, data):
        return jsonify({"error": "Data is invalid"}), 400

    # search users with the same email address
    temp = db.select_rows(
        f"select * from account where email='{data['email']}'"
    )

    if temp is not None:
        return jsonify(
            {"error": "User with this email addres already exists"}
        ), 400

    db.insert_data(
        f"""
        insert into account (first_name, last_name, email, password) values (
            '{data["first_name"]}', 
            '{data["last_name"]}', 
            '{data["email"]}',  
            '{hashlib.md5(data["password"].encode()).hexdigest()}'
        )"""
    )
    db.commit()

    response = {
        "result": "ok"
    }
    return jsonify(response), 200


@user_api.route("/login_user", methods=["POST"])
def login():
    """
    Login user function
    """

    data = request.json

    # validation of the received data
    if not validate_json(login_schema, data):
        return jsonify({"error": "Data is invalid"}), 400

    # search user by email
    user = db.select_rows(
        f"select * from account where email='{data['email']}'"
    )[0]
    if user is None:
        return jsonify(
            {"error": "User with this email addres not exists"}
        ), 400

    if user[-1] != hashlib.md5(data["password"].encode()).hexdigest():
        return jsonify(
            {"error": "Incorrect password"}
        ), 400

    token = Auth.auth_token(user[0])

    response = {
        "result": "ok",
        "id_user": user[0],
        "user": user_object(user),
        "token": token,
    }
    return jsonify(response), 200


@user_api.route("/logout_user", methods=["GET"])
def logout_user():
    response = {'message': 'ok'}

    return response, 200
  ```
  
  
- ### SPA shall communicate with back end via REST interface:

   * [CODE](https://github.com/Vilka284/web-lab-1-4/blob/master/server/user_api/endpoints.py)
  
  
- ### Data exchange shall be done in JSON format:

   * [CODE](https://github.com/Vilka284/web-lab-1-4/blob/master/client/static/scripts/room/submit_request.js)
    ```javascript
    contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                'name': name,
                'description': description,
                'id_user': localStorage.getItem('id_user')
            }),
            dataType: "json",
            headers: {"auth_token": localStorage.getItem('auth_token')},
            success: function (data) {
                $('#msg').html('<span style="color: green;">Room created successfully</span>');
            }
    ```
  

- ### No errors nor logs in console:
   
   * _Screenshot of console:_
![alt-текст](https://github.com/Vilka284/web-lab-1-4/raw/master/WebDevelopment/Lab2/img/console.png "Console")


- ### Loading speed less than 4 seconds:

  * _Screenshot of network:_
![alt-текст](https://github.com/Vilka284/web-lab-1-4/raw/master/WebDevelopment/Lab2/img/network.png "Network")


- ### At least 2 browsers supported:

   Chrome and Firefox
   
- ### No commented code:

