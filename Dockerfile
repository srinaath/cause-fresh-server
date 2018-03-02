FROM node:8.9

LABEL maintainer = Srinaath Ravichandran

EXPOSE 4000

ENV NODE_ENV = production

COPY ./ /var/www

WORKDIR /var/www

RUN npm install

ENTRYPOINT [ "npm", "start" ]
