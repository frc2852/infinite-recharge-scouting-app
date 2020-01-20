FROM node:12.13.0-alpine

RUN apk add openssh git

RUN git config --global user.email "bot@2852.ca"
RUN git config --global user.name "2852 bot"

COPY ./.ssh /root/.ssh/
RUN chmod 600 /root/.ssh/*

ADD package.json /tmp
ADD package-lock.json /tmp

WORKDIR /tmp
RUN npm install

WORKDIR /app
ADD . /app
RUN mv /tmp/node_modules/ /app/node_modules/

RUN npm run build

CMD npm run deploy