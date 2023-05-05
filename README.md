# Tech used

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge) ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

# Live demo
[![Link](https://img.shields.io/badge/-Link-61DAFB?logoColor=white&style=for-the-badge)](https://chat-room-36c5f.web.app/)

# Clone and install dependency
```
git clone git@github.com:taimanna/chat-app.git
cd chat-app
npm i
```
# Run project
**You must run both after here:**
### Run React
- From root folder:
```
npm start
```
### Run Firebase Emulator
- In [src/firebase/config.js](https://github.com/taimanna/chat-app/blob/master/src/firebase/config.js) remove comment on line 27-30
- Then from root folder:
```
cd emulator/
firebase emulator:starts
```

# Feature
- Login
- Sign up with Gmail/Facebook/Password
- Add member to chatroom
- Chat with friends
