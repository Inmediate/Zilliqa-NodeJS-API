FROM            node:8.5.0-alpine

WORKDIR         /usr/share/api

COPY            . .

CMD             node index.js
