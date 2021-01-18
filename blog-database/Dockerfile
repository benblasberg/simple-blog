FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 123  
ENV MYSQL_DATABASE blog-db  
ENV MYSQL_USER blog-db-user
ENV MYSQL_PASSWORD 123

ADD setup.sql /docker-entrypoint-initdb.d
