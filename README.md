# _How to_ install project:

#### 1. Clone the code into a fresh folder.
    git clone https://github.com/nosoccus/Tronion.git
    
#### 2. Create a Virtual Environment and install Dependencies.
    
    $ virtualenv venv
    
Activated Linux: 
    
    $ source venv/bin/activate

Activated Windows:
    
    > .\venv\scripts\activate
    
#### 3. Install the project dependencies, which are listed in [requirements.txt](https://github.com/Vilka284/web-lab-1-4/blob/master/requirements.txt)
    
    (venv) $ pip install -r requirements.txt
    
#### 4. Make sure you have installed up to date version of [PostgreSQL](https://www.postgresql.org/download/).
Before launching project you also have to configure database access.

#### 5. Create DB and configure it.
Run creation script located in create_db.sql.
After this all you need is to do **make .env file** and place this text into it:

    DATABASE_HOST = "localhost"
    DATABASE_USERNAME = "username of db owner"
    DATABASE_PASSWORD = "password of db owner"
    DATABASE_NAME = "tronion"
    DATABASE_PORT = "5432"

    SECRET_KEY = "create your secret key"


----

# Report for Web Development Labs

## 1. [Static pages layout](https://github.com/Vilka284/web-lab-1-4/tree/master/WebDevelopment/Lab1)
> In scope of this lab student practice creating page layout. For this purpose HTML will be used
> for defining structure and CSS with SASS preprocessor for styling. No JavaScript should 
> be used on the current stage. Student should show a teacher how SCSS is compiled to CSS.

## 2. [Client-server interaction in scope of SPA](https://github.com/Vilka284/web-lab-1-4/tree/master/WebDevelopment/Lab2)
> In scope of this lab students should practice fetching data from the back-end using AJAX.
> Student shall create application which makes requests to API (back-end from the previous 
> course can be reused) and displays parsed response

## 3. [Basic single page application with user management](https://github.com/Vilka284/web-lab-1-4/tree/master/WebDevelopment/Lab3)
> In scope of this lab students should practice working with front end frameworks. A single page
> application should be created based on a part of static templates from the previous lab.

## 4. [Add project specific functionality to SPA](https://github.com/Vilka284/web-lab-1-4/tree/master/WebDevelopment/Lab4)
> In scope of this lab students continue practice with single page application. SPA shall be
> extended with variant specific functionality using static layouts from lab #1. As a result 
> all features shall be implemented. Code shall meet requirements from lab #3.
