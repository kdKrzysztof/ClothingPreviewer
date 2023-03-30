# Buildaverse Clothing Previewer

The Buildaverse Clothing Previewer is a web-based application that utilizes Node.js, Blender Python, and React to generate custom avatar model pictures for users. The application is designed to allow users to preview different clothing options on their avatars, without the need for them to upload custom textures to Buildaverse platform.

The process starts with the user selecting their custom texture for specific clothing type: 
 - Shirt
 - Pants

The server then uses Blender Python to render the new image and sends it back to the client-side application in PNG format. The client-side application then displays the new image of the avatar with the selected clothing options, allowing the user to preview how the clothing would look on their avatar before uploading the project to real site. On original buildaverse site, each uploaded piece of clothing is going through moderation and it can take some time before it gets accepted on site. 

Overall, the Buildaverse Clothing Previewer is a helpful and intuitive tool that allows users to visualize how different clothing options would look on their avatar, without having to upload the clothing to main site and wait for it to pass moderation. 

## How to run the project?

There are two ways of running this project on your computer:

 - Docker compose (fastest and easier way)
 - Run backend and frontend separately 

 1. **Docker:**
	- To run your project via this method, you must have Docker installed on your computer.
	 - After that you have to open terminal and open this project's main folder.
	 - Then run this command:
	 ```
	 docker compose up
	 ```
	 Opening an project via docker is fast and simple. It runs frontend and backend on virtual machine. No need to do the steps below.
	  
 2. **Run front end and back end separately** 
	Frontend:
		- In my-app directory, you can run: ```
		npm install
		``` and then ```npm start
		``` command. This starts the app front end in the development mode.
	Backend:
		- In this directory, you can run: ```npm install``` and then ```node index.js``` to start backend server.

#### By default, frontend runs on ports 80:80, you can open it by typing http://localhost/ in your browser. Backend runs on port 7000. 
	
		
