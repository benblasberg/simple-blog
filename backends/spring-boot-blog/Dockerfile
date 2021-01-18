FROM azul/zulu-openjdk:11
COPY target/spring-boot-blog-0.0.1-SNAPSHOT.jar spring-boot-blog.jar
EXPOSE 8080
CMD ["java","-Xms1024m","-Xmx2048m", "-jar","/spring-boot-blog.jar"]