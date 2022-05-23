# BDK-RN Demo App

Demo App for BDK-RN which is a react native version of BDK

BDK-RN: https://github.com/LtbLightning/bdk-rn
BDK: https://github.com/bitcoindevkit/bdk

## Installation

```bash
git clone https://github.com/LtbLightning/bdk-rn-app.git
```

This app uses bdk-rn which is not available in package manager yet so please either clone bdk-rn locally and install or from github:

Clone in bdk-rn folder locally and specify folder in package.json:

"bdk-rn": "file:./bdk-rn"
or directly via github:

"bdk-rn": "git+https://github.com/LtbLightning/bdk-rn.git"

Once bdk-rn is specified in package.json proceed to run npm i or yarn install


```bash
yarn install
npx pod-install
yarn run android OR yarn run ios
```
