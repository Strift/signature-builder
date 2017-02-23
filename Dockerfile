FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/signature
WORKDIR /usr/src/signature

# Install app dependencies
COPY package.json /usr/src/signature/
RUN npm install

# Install pm2 so we can run our application
RUN npm install -g pm2

# Bundle app source
COPY . /usr/src/signature

# Environment variables
ENV PORT 3000

# Expose ports
EXPOSE 3000

# Run command
CMD [ "pm2-docker", "start", "npm", "--", "start" ]