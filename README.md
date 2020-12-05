# Mars robot simulation test

Project structure : 
* the `robot-control-frontend` directory contains a standalone Angular application that will display a robot control interface.   
* the `command-line-simulator` is a python command-line scripts that implements the same simulation logic but without any graphical user interface

The control interface allows you to control a simulated robot navigating on a simulated Mars planet that is a flat 5x5 grid.

## Demo
The latest build of the app can be accessed here : 
https://coreders.github.io/mars-robot-simulation-test/robot-control-frontend/dist/

## How to build 
* You will need to have nodejs, npm and angular cli to run from the sources: 
    1. Compile and run a server :
        ```
        cd robot-control-frontend && ng serve 
        ``` 
    2. Open `http://localhost:4200/` in your browser
    
    
## Disclaimer
Mars and robot images come from https://pixabay.com 