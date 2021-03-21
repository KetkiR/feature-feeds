# Feeds Feature

It is a feature which gives you listing of feeds and can filter feeds.

## Requirements

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

## Install

    $ git clone https://github.com/KetkiR/feature-feeds.git
    $ cd feature-feeds
    $ npm install

## Configure app



create a MySql database on your local machine called `feedsdatabase` and a table in this database called as `feeds`.

Open the file `mockdata.sql` in the root directory of the project which has the mock data to run the project.

Open `src/connections/mysql.ts` and edit MySql connection settings to connect to your local.

## Running the project

    $ npm run watch-ts  -- will compile typescript and a build folder will get created in root directory of the project

    $ npm run watch-node  -- will run the project on port 3000

## run test cases

    $ npm run tests


