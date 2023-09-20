## Как запустить локально

```sh
cp .env.sample .env # + заполняем env-переменные

python3 -m virtualenv .
nvm use

source ./bin/activate
pip install -r requirements.txt
npm ci

npm start
```
