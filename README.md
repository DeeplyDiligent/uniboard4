# Welcome To The UniBoard Extension Development Page

Download the extension at: https://uniboard.app

We would love some more contributions to the extension from the community! Please see the instructions below for ways to start the extension.

# Prerequisites
- The extension itself is built with HTML, CSS and JS (jQuery)
- The app (which runs inside the extension) is built in ReactJS
- Firebase is used for hosting and database (if user chooses to sync their data to the phone)

# On Mac

1. git clone this repository
2. run ```npm install```
3. run ```npm start``` to start the web app
4. to run the extension we must build it: go to ```build.sh```
5. change the first line to ```BUILD_TYPE='extension'```
6. run ```npm run build```
7. drag the build folder in the root directory to chrome extensions page (after enabling developer mode)

# On Windows

1. git clone this repository
2. Make sure you are running either a linux virtual machine or have Git Bash installed (so we can run bash scripts on windows)
2. Launch git bash and navigate to the correct folder
2. run ```npm install```
3. run ```npm start``` to start the web app
4. to run the extension we must build it: go to ```build.sh```
5. change the first line to ```BUILD_TYPE='extension'```
6. run ```npm run build```
7. drag the build folder in the root directory to chrome extensions page (after enabling developer mode)

# How Can I Learn

If you struggle to understand how you too can learn these technologies and make cool apps like this one (trust me, my degree taught me nothing) please have a look at my blogpost here: https://medium.com/deeplydiligent-blog/ive-got-a-friend-who-studies-accounting-and-didn-t-have-much-of-a-programming-background-similar-354f0584c871

I would like to extend a huge thank you to everyone who made this amazing extension possible!