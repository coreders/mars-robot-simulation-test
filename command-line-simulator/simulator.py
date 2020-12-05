from mars.mars_robot import MarsSimulation
import sys

# You can use this simulator either with one file name as argument to execute commands from the file or without argument to execute commands from stdin


simulation = MarsSimulation()
def _execute_command(command):
    result = simulation.execute_command(command)
    if len(result) > 0:
        print(result)


if len(sys.argv) > 1:
 print("Will execute from commands file "+sys.argv[1])
 with open(sys.argv[1]) as f:
     for command in f.readlines():
         _execute_command(command)
else:
    print("Will execute commands from stdin ")
    for command in sys.stdin:
        _execute_command(command)







