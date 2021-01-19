from flask import Flask, json, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
PWD='123'
USR='root'
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@localhost:3306/blog-db'.format(USR, PWD)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
auth = HTTPBasicAuth()

CORS(app)

@auth.verify_password
def verify_password(username, password):
    print("******************************" + username + " " + password)
    user = User.query.filter(db.func.lower(User.name) == db.func.lower(username)).first()
    if user and \
             bcrypt.checkpw(password.encode('utf8'), user.password.encode('utf8')):
        return user

@app.route('/posts', methods=['GET', 'POST'])
@auth.login_required
def get_posts():
    if request.method == 'GET':
        return app.response_class(
            response=json.dumps(list(map(lambda post: post.as_dict(), Post.query.all()))),
            status=200,
            mimetype="application/json"
        )
    
    #post otherwise
    post = Post(title=request.json['title'], content=request.json['content'], author_id=request.json["author"]["id"])
    db.session().add(post)
    db.session().commit()

    return app.response_class(
        response=json.dumps(post.as_dict()),
        status=200,
        mimetype="application/json"
    )

@app.route('/posts/<id>', methods=['GET'])
@auth.login_required
def get_posts_by_id(id):
    post = Post.query.get(id)

    if post:
        return app.response_class(
            response=json.dumps(post.as_dict()),
            status=200,
            mimetype="application/json"
        )
    
    return app.response_class(status=404)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(60), unique=False, nullable=False)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return '<User %r>' % self.name

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), unique=False, nullable=False)
    content = db.Column(db.Text, unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=False, nullable=False)
    author = relationship('User')

    def as_dict(self):
       d = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       d['author']=self.author.as_dict()
       del d['author_id']
       return d
    
    def __repr__(self):
        return '<Post %r>' % self.title

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=8080)
