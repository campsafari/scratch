import React from 'react';
import './App.css';
import UserSearch from 'modules/user-search';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <UserSearch />
      </header>
      <main className="app-main">
        <h3>Styling</h3>
        <p>
          For this particular demo i chose aphrodite as a css/styling solution,
          except for the app part that came with create-react-app, because it
          felt simple and straightforward for this small prototype. Of course
          this could have been done in a couple more ways like css modules,
          styled components, a global css stylesheet, css utility classes á la
          tailwind, a ui library like material-ui and whatnot. But this decision
          would be based on the overall application architecture.
        </p>
        <h3>What do you like about your solution?</h3>
        <p>Hmm, well, it´s simple :)</p>
        <h3>What do you dislike about your solution?</h3>
        <p>
          I am not sure about the query prop, maybe there is a better way
          without passing it down to the list elements? But i didn´t want to use
          the context api or a state library. Calculating the highlighted
          username parts further up in the tree would also be possible but i
          think it´s the list-item´s concern on how to display the data. So
          maybe there isn´t a better way?. I also don´t like that it´s not
          responsive and not really usable on touch devices.
        </p>
        <h3>
          If you had a full day more to work on this, what would you improve?
        </h3>
        <p>
          Design. Also using css only to display the search and clear icons
          instead of rendering images, making it responsive and more suitable
          for touch devices.
        </p>
        <h3>
          If you would start from scratch now, what would you do differently?
        </h3>
        <p>
          Tricky question, since i just started from scratch. But maybe trying
          out a different styling solution, using a css library that comes with
          a grid?
        </p>
      </main>
    </div>
  );
}

export default App;
