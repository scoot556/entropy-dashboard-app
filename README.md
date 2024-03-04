
  

## Entropy Dashboard Assessment

This is my submission, I'm using Next.js v14.1.1 with Node v18.18.2 and npm v10.5.0. This project encapsulates the requirements given in the specification document.

These include the following

 - Weather Page
	 - Search via city and results listed
	 - Use native geolocation
	 - Detailed information about the current weather

- News Page
	- Displays current trending news articles
	- Allows the user to select from a range of categories
	- Able to follow links to the article on the respective media outlet

- Task/Todo List
	- Uses localStorage to store the users tasks
	- Three separate tables indicating the status of the task/todo item
	- Updating via dropdown boxes on the status of the task

### Project Installation/Setup
To setup the project locally to develop on you will need to ensure you have
	-	Node v18.18.2
	-	npm v10.5.0
	-  Git

Once those have been acquired simply clone the repo to your desired destination and either open the folder up in a terminal or through a code editor.
After that you will then need to do run `npm install`, this will install all the necessary dependencies required for this project.
Make sure to add your own `.env.local` or `.env` file to the source directory to ensure you can receive the needed API calls. There is an example of this under the file `.env.example`.
Once that is completed you will then need to run `npm run develop` to go into development mode or run `npm run build` which will build the application in which then you may run it using the `npm run start` command.

### Technical Choices
The technical choices I chose to utilise in this project are mainly vanilla Next.Js functions as it has a wide variety of server side rendering capabilities as well as client side. I used a component based UI library called shadcn/ui as it allows me to edit the components such as buttons, forms, labels, inputs, etc. to however I want. This allows for far greater customisation. On top of using shadcn/ui's form component it also uses zod and react-hook-form to ensure that forms are type safe and have the correct error handling without needing to stress too much. 
