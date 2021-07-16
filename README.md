### Thoughts
For this particular demo i chose aphrodite as a css/styling solution,
except for the app part that came with create-react-app, because it
felt simple and straightforward for this small prototype. Of course
this could have been done in a couple more ways like css modules,
styled components, a global css stylesheet, css utility classes á la
tailwind, a ui library like material-ui and whatnot. But this decision
would be based on the overall application architecture.

### What do you like about your solution?
Hmm, well, it´s simple :)

### What do you dislike about your solution?
That it´s not really usable on touch devices. Also the highlighting/focus handling could be improved.
The highlighting states maybe should be different for mouse and keyboard interactions.
So only when the user starts using the keyboard we should focus items with keys,
but once the user starts using a pointer device the keyboard highlighting should be cleared and it should.
Also i am not sure about the query prop being passed down to the list-item, the highlighted
text could be calculated further up in the tree and could even be a part of the list item data itself.
But i would get a second opinion on that from my colleagues.

### If you had a full day more to work on this, what would you improve?
- implement the loading of further api results when the user scrolls to the of the list 
- making it more suitable for touch devices.
- displaying a message when the API didn´t return any results
- checking for render performance and maybe memoizing the highlighted text output
- adding tests


### If you would start from scratch now, what would you do differently?
Tricky question, since i just started from scratch.
But if the time limit is not applying anymore maybe trying
out a different styling solution, using a css library that comes with
a grid? And if this component would be part of a library i would also
start building the UI in storybook and also build that list component
in a more general way instead of strictly coupling it to users. For
example a list component that provides an api for more general use
cases. Like this nice FlatList component from ReactNative.
I mean there are a lot of options on how to build it differently but in my opinion
all of them are somehow dependent on the application/library design that this component
would be integrated into. Also the use of atomic design principles would be a benefit
for other components that for example need to render scrollable lists, input fields etc...
