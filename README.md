# Attendance-Management-System
* This web application can be used by educational institutions to manage attendance of the students by the individual faculty.
* The database used here is **MongoDB (No-SQL)**.
* This web application is designed for two types of users (Teacher and Student).
* The technologies used in this are **Bootstrap5, Particle.js, MongoDB, Node.js.**
* The web application consists of the following pages:
  + login page
  + teacher-home page 
  + teacher-class page
  + teacher-attendance page
  + student-home page
  + error page.
## Login Page


![image](https://user-images.githubusercontent.com/73573498/174485453-8be4d598-9fc3-4d48-abe4-dcc516bf07e8.png)

## Teacher Page
* Teachers can select each class and will be directed to another page where they can mark attendance for each student.


![image](https://user-images.githubusercontent.com/73573498/174485462-baa9f4f9-19a0-41c4-9877-38e2f7e3d1be.png)

## Student Page 
* Students can view their overall and subject-wise attendance along with their timetable and calender.


![image](https://user-images.githubusercontent.com/73573498/174485492-8a99c66e-25ba-4836-bc1f-5c46386bea63.png)


## Instructions to run the project in your machine
* Install nodejs through your browser.
* Use the following commands to install the node modules.
* npm i <module_name>
* Modules to be installed are : 
  + mongoose
  + MongoClient
  + express
  + morgan
  + body-parser
  + path
  + os
  + express-session
* If you want to use MongoDBcompass for this project then create a database in the shell containing data present in DB folder. After creating the Database in MongoDBCompass in app.js change the url variable to access the local MongoDB.
* After all the above step are completed, you are ready to host the website on your localhost. TO do that run the following command 'node app.js'
