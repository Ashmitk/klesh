# Custom Guess Who 🕵️‍♂️

A beautiful, dynamic "Guess Who" web application that lets you upload your own images to play with friends or family!

## Features
- **Custom Image Setup**: Use any faces you like (friends, celebrities, pets, etc.) by dragging them into the `images` folder.
- **Dynamic Board**: Adapts to the number of images automatically using CSS Grid. 
- **Mystery Person Selection**: Locks in your character so you don't forget it.
- **Interactive Gameplay**: Flip cards over with smooth 3D animations to eliminate suspects.
- **Responsive Design**: Works perfectly on mobile phones, tablets, and desktop displays.

## How to Play
1. **Add Images**: Drop all your images into the `images/` directory. 
2. **Launch the Game**: Instead of opening `index.html` manually, just **double-click the `PlayGame.bat` file**! It will automatically rename all your images sequentially and open the game in your browser so it detects everything perfectly.
3. **Pick your Persona**: Secretly select one person from the roster to be your Mystery Person.
4. **Take Turns**: Ask yes/no questions (e.g., "Does your person have glasses?").
5. **Eliminate**: Click a character card to flip it over when they don't match the answer.
6. **Guess**: Toggle "Guess Mode" in the top right to take a shot at winning!

## How to Deploy to Netlify
This app uses completely static frontend files (HTML, CSS, Vanilla JS), meaning it requires **zero build steps**!
1. Log in to [Netlify](https://app.netlify.com/).
2. Drag and drop this entire project folder into the Netlify "Deploy manually" zone (found under Sites).
3. The site will instantly deploy and give you a live URL to share!
