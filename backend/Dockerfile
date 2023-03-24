FROM linuxserver/blender
WORKDIR /usr/src/app
RUN sudo apt install nodejs
RUN sudo apt install npm
RUN sudo apt install python3
RUN apt update 
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 7000 3000
CMD ["node", "index.js"]