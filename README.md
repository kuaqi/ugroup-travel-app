# UGroup Travel App

A React Native mobile app to modify events to the native calendar app.


## Installation

1. Identify the current IP address on the development machine
2. Set the IP address on the `localhost` in the /src/api/destinationsAPI.ts
3. Connect an Android physical device via the USB
4. Enable the device's Developer Options and toggle on USB debugging
5. Run `npm install`
6. Run `npm start` on another terminal
7. Run `npm run android`


## Troubleshooting

1. Run `adb shell input keyevent 82` to open the Dev Menu for Android
2. Set the bundle location to the machine's IP address `192.168.X.X:8081`
3. Run `adb reverse tcp:8081 tcp:8081`


## Compatibility

- Tested on a MacOS development environment.
- Android is supported.
