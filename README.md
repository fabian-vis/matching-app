# Matching-app
Hello, my name is Fabian Vis and i am a Communication and Multimedia student at the Hogeschool van Amsterdam.
The purpose of this app is to help gamers find people to game with that match their preferences. They are also able to add interesting people to a list to get a better overview.

Check out the app i created: https://matching-feature.herokuapp.com/

# My job story

**When** i like a person because i find that person interesting **i want** to find this person in a overview **so that** i have a clear overview of people I want to play games with. 

# What do you need?

You need to have NodeJS and NPM installed.

# How do you get this repository on your local device?

1. Inside your CLI copy this code: ```git clone https://github.com/fabian-vis/matching-app```

2. Cd to the project folder

3. You can install the needed NPM packages by running this code inside your CLI: ```npm install```

# Setting up the database

1. Create a MongoDB database, you can follow [this link](https://docs.mongodb.com/guides/server/drivers/)

Here is a visual representation of the cluster in MongoDB:
![alt text](https://github.com/fabian-vis/matching-app/blob/main/fotostech/Databasestructuur.jpg "Database structuur")

2. Put the right variables inside the .env.example file
``` 
MONGO_URI= the link
MONGO_DB= your database name
MONGO_USER= your username
MONGO_PASS= your password 
```

3. rename the .env.example file to .env

# Scripts

With the following script you can start the server locally:

```npm run start```

Or you can start the server with nodemon:

```npm run watch```

# Contributers
Fabian Vis || fabianvis988@gmail.com

# License
MIT
