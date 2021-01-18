from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
PWD='123'
USR='root';
SQLALCHEMY_DATABASE_URI = 'mysql://{}:{}@localhost:3306/blog_db'.format(USR, PWD)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
