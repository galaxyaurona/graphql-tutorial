FROM node:12-alpine

ENV PORT 4000
EXPOSE 4000

WORKDIR /opt/code

COPY . .

CMD ["npm", "start"]
