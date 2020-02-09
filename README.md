# Infinite Recharge Scouting App

This project will be use for students to scout robots at FRC complitions

## Dev server setup

1. Install libraries
```
npm install
```

2. Start Server
```
npm run dev-server
```

3. Then in your browser to go http://localhost:8080

## Run dev server with service workers

1. Start HTTPS server
```
npm run dev-server-secure
```

2. Start chrome to allow insecure origin
```
.\chrome.exe --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://127.0.0.1/
```

## Deploying to github pages

**This meathod requires your git repo to be setup with ssh git clone/remote**

1. Add `.ssh/config` to the project with the following

```
Host github.com
    User git
    IdentityFile ~/.ssh/github
```

2. Add your private key in the .ssh folder and name it `github`

3. Run the following command
```
bash deploy.sh
```

4. You should see your changes on https://frc2852.github.io/infinite-recharge-scouting-app/


## LICENSE

Copyright (c) 2020 Team 2852

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
