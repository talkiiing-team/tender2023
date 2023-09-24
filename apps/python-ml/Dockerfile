FROM python:3.9.18-bullseye

WORKDIR /home/pn/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "apps/python-ml/main.py"]
