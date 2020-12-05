from unittest import TestCase

from mars.mars_robot import MarsSimulation


class TestMarsSimulation(TestCase):
    def test_execute_command(self):
        simulation = MarsSimulation()
        simulation.execute_command("PLACE 1,2,NORTH")
        self.assertEqual("1, 2, NORTH", simulation.execute_command("REPORT"))

        simulation.execute_command("MOVE")
        self.assertEqual("1, 3, NORTH", simulation.execute_command("REPORT"))

        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        self.assertEqual("1, 4, NORTH", simulation.execute_command("REPORT"))

        simulation.execute_command("RIGHT")
        self.assertEqual("1, 4, EAST", simulation.execute_command("REPORT"))
        simulation.execute_command("MOVE")
        self.assertEqual("2, 4, EAST", simulation.execute_command("REPORT"))
        simulation.execute_command("RIGHT")
        self.assertEqual("2, 4, SOUTH", simulation.execute_command("REPORT"))
        simulation.execute_command("RIGHT")
        self.assertEqual("2, 4, WEST", simulation.execute_command("REPORT"))
        simulation.execute_command("RIGHT")
        self.assertEqual("2, 4, NORTH", simulation.execute_command("REPORT"))

        simulation.execute_command("LEFT")
        simulation.execute_command("LEFT")
        simulation.execute_command("LEFT")
        simulation.execute_command("LEFT")
        simulation.execute_command("LEFT")
        self.assertEqual("2, 4, WEST", simulation.execute_command("REPORT"))

        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        self.assertEqual("0, 4, WEST", simulation.execute_command("REPORT"))

        simulation.execute_command("LEFT")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        simulation.execute_command("MOVE")
        self.assertEqual("0, 0, SOUTH", simulation.execute_command("REPORT"))
