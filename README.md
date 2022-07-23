# Project-Atelier

Atelier is a mock e-commerce browser application that showcases multiple widgets common to e-commerce websites.

# Screenshots

![alt text](https://drive.google.com/file/d/1pV_rHFzfUFiGUGItboIDS88MLANfYzLh/view?usp=sharing) ![alt text](https://drive.google.com/file/d/1AMdn-wv3MvUfAX0Jf7pXWpfQqGypyyqe/view?usp=sharing)

## Building and running on localhost

Create a .config.js file in which you place:
``` sh
module.exports = {
  TOKEN: '[Github Token Here]'
};
```
this allows access to the heroku API

## First install dependencies:

```sh
npm install
```

## To create a production build:

```sh
npm run build-prod
```

## To create a development build:

```sh
npm run build-dev
```

## Running

```sh
npm run server-dev
```
Then connect to localhost:3000 in your browser

## Contributors

[Kai Sheng](https://github.com/maestrokyles), [Sharon Huang](https://github.com/sharonhw888), and [Zach Smith](https://github.com/Zach-Smith1 )

### Credits

Made with [createapp.dev](https://createapp.dev/)

Idea for implementing partially filled stars in found on Stackoverflow from Ismail Moghul: https://stackoverflow.com/questions/33858426/only-fill-60-percent-star-using-css-width

Implementation for star rating percentage bars from Renzo Calla: https://stackoverflow.com/questions/45507970/how-can-i-change-the-color-of-a-progress-bar-value-in-html
