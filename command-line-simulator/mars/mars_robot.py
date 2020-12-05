import re

class MarsSimulation:

    def execute_command(self, command):
        place_command_parts = re.findall('^\s*PLACE\s+(\d)\s*,\s*(\d)\s*,\s*(\w+)\s*$', command)
        if len(place_command_parts) > 0:
            self._place(int(place_command_parts[0][0]), int(place_command_parts[0][1]), place_command_parts[0][2])
            return ""
        elif self.robot:
            return self.robot.execute_command(command)
        else:
            print("No robot placed yet, will ignore this command")

    def _place(self, x, y, direction):
        self.robot = Robot(x, y, direction)
        if not self.robot.valid:
            self.robot = None


class Robot:
    north = "NORTH"
    east = "EAST"
    south = "SOUTH"
    west = "WEST"
    directions = [north, east, south, west]

    tabletop_size = 5

    def execute_command(self, command):
        result = ""
        if command.strip() == "MOVE":
            self._move()
        elif command.strip() == "LEFT":
            self._left()
        elif command.strip() == "RIGHT":
            self._right()
        elif command.strip() == "REPORT":
            result = self._report()
        else:
            print("Warning, invalid command will be ignored : "+command)
        return result

    def _report(self):
        return str(self.x) + ", " + str(self.y) + ", " + self.direction

    def _left(self):
        current_direction_index = self.directions.index(self.direction)
        if current_direction_index == 0:
            self.direction = self.directions[len(self.directions) - 1]
        else:
            self.direction = self.directions[self.directions.index(self.direction) - 1]

    def _right(self):
        self.direction = self.directions[(self.directions.index(self.direction) + 1) % len(self.directions)]

    def _move(self):
        if self.direction == self.north:
            self._set_position(self.x, self.y + 1, self.direction)
        elif self.direction == self.east:
            self._set_position(self.x + 1, self.y, self.direction)
        elif self.direction == self.south:
            self._set_position(self.x, self.y - 1, self.direction)
        elif self.direction == self.west:
            self._set_position(self.x - 1, self.y, self.direction)

    def __init__(self, x, y, direction):
        self.valid = True
        self._set_position(x, y, direction)

    def _set_position(self, x, y, direction):
        if 0 <= x < self.tabletop_size and 0 <= y < self.tabletop_size and any(d == direction for d in self.directions):
            self.x = x
            self.y = y
            self.direction = direction
        else:
            self.valid = False
