# GACA Front-End

### Prerequisites

* [Node / npm] - You need node installed locally to run this project!

### Installation

Open your favorite Terminal and run these commands.

```sh
$ git clone https://github.com/Nazzanuk/gaca-2.git #clone the repo
$ cd gaca-2 #set directory
$ sudo npm install #install all node dependencies (might not need sudo)
$ bower install #install all front-end dependencies
$ gulp watch #compile and build the release directory
```

### Release

- The HTML is all stored in the `release` directory
- Do NOT change the `release` directory files directly as they will be **temporary** changes.
- The source files are stored in the `src` directory
- Once you have `gulp watch` running you can make a change to any of the files in the  `src` and it will regenerate the `release` directory
- Once you have `gulp watch` running you can view the changes at `http://localhost:11000/`
