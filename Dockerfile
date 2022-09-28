FROM node:16

USER root
RUN apt-get -y update

COPY backend /backend
COPY frontend /frontend
COPY .npmrc /
COPY package-lock.json /
COPY package.json /
COPY tsconfig.json /
RUN mkdir uploads

RUN yarn install

EXPOSE 8000
RUN yarn build

CMD yarn start