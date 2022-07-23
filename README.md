# Project-Atelier

Atelier is a mock e-commerce browser application that showcases multiple widgets common to e-commerce websites.

# Screenshots

![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.18.31_AM_reozzr.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.18.42_AM_j60rnt.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.19.01_AM_kakzri.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.20.20_AM_ivqyv8.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.19.52_AM_i95mxt.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.20.32_AM_outk9z.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.19.09_AM_bd7cto.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.20.47_AM_ygvlmu.jpg) ![alt text](https://res.cloudinary.com/dktim9rur/image/upload/v1658593677/Screen_Shot_2022-07-23_at_10.19.32_AM_as9hgq.jpg)

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
