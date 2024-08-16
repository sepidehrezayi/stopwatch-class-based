# Stopwatch Application (Class-Based)
This repository contains a refactored and reorganized version of a Stopwatch application built with React and TypeScript. The application allows users to start, stop, reset the stopwatch, and record lap times. The UI is styled using basic CSS.

## Project Overview
The initial version of this project was written in a less organized and less type-safe manner. My goal was to refactor the code to improve its structure, readability, and maintainability while adhering to best practices in TypeScript and React.

## Key Features
- Start/Stop the Stopwatch: Users can start and stop the timer using a toggle button.
- Reset the Stopwatch: Users can reset the timer and clear the laps.
- Lap Recording: Users can record laps, which are displayed below the stopwatch.
- Lap Deletion: Users can delete individual laps.
  
## Improvements Made
- TypeScript Typing: Introduced proper TypeScript interfaces for props, state, and component properties, replacing the usage of any to ensure type safety.
- Component Methods: Refactored component methods to be arrow functions to avoid issues with this binding, improving readability and preventing potential bugs.
- Separation of Concerns: Extracted the Lap component and handled laps more effectively using React's state management.
- Lifecycle Methods: Implemented lifecycle methods such as componentDidUpdate to manage the stopwatch behavior based on the component's state changes.

## Code Structure
- Stopwatch.tsx: Main component that handles the stopwatch's logic and renders the UI.
- Lap.tsx: A reusable component that displays each lap and includes a delete button.

## How to Run
1. Clone the repository:
`git clone https://github.com/sepidehrezayi/stopwatch-class-based.git`
2. Install dependencies:

`npm install`

3. Run the application:
   `npm start`

## Future Improvements
- Code Optimization: Further optimize the button components by potentially reducing them into a single component, while balancing the number of props passed.
- Styling Enhancements: Improve the UI by applying more advanced CSS or integrating a CSS framework like Bootstrap or Tailwind.
  
## Conclusion
This project showcases the refactoring of a class-based React component with a focus on improving code quality and maintainability. The restructured code is more organized, type-safe, and easier to extend or modify in the future.
