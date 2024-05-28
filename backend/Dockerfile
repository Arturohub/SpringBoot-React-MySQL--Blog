FROM amazoncorretto:22-alpine-jdk

COPY target/blog-0.0.1-SNAPSHOT.jar app.jar

# Add an entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
