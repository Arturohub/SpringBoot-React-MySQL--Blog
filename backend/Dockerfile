FROM amazoncorretto:22-alpine-jdk

COPY target/blog-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["sh", "-c", "java -Djwt.secret=$JWT_SECRET -jar /app.jar"]
