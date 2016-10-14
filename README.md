#Snake
My First Project
*  https://bendyw.github.io/Snake

###Deliverables

* A snake that can move across the screen in all directions
* Snake can grow(size of grow can be changed)
* Food is randomly created somewhere on screen
* Snake can collide with food
* Food will respawn on collision
* Snake cant hit borders or game over
* Snake cant hit itself or game over

---

### Technical Requirements

* Runs in browser
* Single Player
* Score based
* No JQuery


---

###Summary

Classic Snake.
Try to get your snake as big as possible by collecting food. Avoid hitting yourself and the walls.

---

###Approach

I treated my canvas as a grid. Each object takes up one space on the grid.
 The snake body is an array of objects. The snake moves by pushing a new object to the front of the snake in a direction and then popping the last position.
 Collision checks if two objects are at the same position.




