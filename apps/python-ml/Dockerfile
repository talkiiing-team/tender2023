FROM python:3.11.0-bullseye

USER pn
WORKDIR /home/pn/app

COPY --chown=pn:pn requirements.txt ./
RUN pip install -r requirements.txt

COPY --chown=pn:pn . .

CMD ["python", "apps/python-ml/main.py"]
