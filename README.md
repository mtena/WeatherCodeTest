# WeatherCodeTest
WeatherCodeTest is a node express app that returns a JSON file

i.e.http://localhost:3000 on a browser will return WeatherReport.JSON

Requrements: 
             Docker must be installed for container support 
             To run without docker Node with packages dotenv node-libcurl
           
             IF using Windows
                Both will ask for adminatrative permissions On Windows due to 
                Docker will not run on windows home recommend Windows Pro or higher
           
             If using linux 
                Both will need adminatrative permissions to install and run 
                Tested on REDHAT

To run
    1)
        ALL 
            creat a .env  file with contents of
                API_KEY_WEATHER="key"
                DAYS=8
                ZIP=10001 
                PORT=3000

    2)
        IF RUNNING LOCALLY
            in the cmd/termeral navagate to repo location and run commands
            
            "node index.js" will spin up the express app

        IF ON DOCKER
            in the cmd/terminal navagate to repo location and run commands
            
            "docker build -t NAME_OF_YOUR_IMAGE ."  will build docker image
            "docker run -v /app/node_modules -p 3000:3000  -d --name NAME_OF_YOUR_CONTAINER NAME_OF_YOUR_IMAGE" will spin up the express app with no consle log
    3)
        ALL
            in a browser go to http://localhost:3000 
            the response back will be a JSON file with weather info

Project's docker functionalty was based on lession from freeCodeCamp.org https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=3550s
