FROM python
COPY . /backend
WORKDIR /backend
RUN pip install -r requirements.txt
RUN python app.y
EXPOSE 9000
