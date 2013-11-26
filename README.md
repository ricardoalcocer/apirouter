# Node.js API Router
---
This project is a cleaner, more flexible version of [Lil'ACS](http://lilacs.alcoapps.com), written in Node.js and not Node.ACS.  

The basic concept is to have a completely generic API exposing CRUD methods, and at the same time creating an abstraction on top of your data sources.  Modules could be created, for example, to implement Parse, ACS, user-defined/private data, Facebook, Twitter, LinkedIn, Oracle, SAP...you get the idea.  The exposed API will always be the same, so you only learn it once.  Data source modules are implemented as stand-alone modules.

# Install
Assuming you have Node.js properly installed, create a new folder and clone this repo:

      https://github.com/ricardoalcocer/apirouter.git

# Usage
      
Run the app

      $ node app.js
      
      
Open up your browser and navigate to **http://localhost:8080/api/sampleds/get/all** .  You'll get the response of the GET method of the sampleds.js module.

# Creating modules

The first line of each module defines a variable called qsActions:

      var qsActions=['get','order','page','per_page','limit','skip','columns','table'];
      
These are the actions your module understands.  The client will send these values as value-pairs in the URL like so:

http://yoururl.com/api/sampleds/**get**/something/**order**/name/**page**/1/**table**/employees/**columns**/name,id

If your module requires any other value, simply add it to this line in your module.  If for example your module is a Geolocation module, you add 'near' to qsActions, and now the API knows you could send that data.

      var qsActions=['get','order','page','per_page','limit','skip','columns','table','near'];


# What's next
Create some modules and keep it awesome!

# Created by
Ricardo Alcocer - [@ricardoalcocer](http://twitter.com/ricardoalcocer)

# License
Licensed under the terms of the [MIT License](http://alco.mit-license.org)

