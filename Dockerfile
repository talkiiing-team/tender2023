FROM nikolaik/python-nodejs:python3.11-nodejs18-bullseye

USER pn
WORKDIR /home/pn/app

COPY --chown=pn:pn package*.json ./
RUN npm install

COPY --chown=pn:pn requirements.txt ./
RUN pip install -r requirements.txt

COPY --chown=pn:pn . .

CMD ["npm", "run", "start:prod"]
