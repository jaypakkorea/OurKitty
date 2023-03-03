FROM openjdk:11-jre
COPY build/libs/*.jar app.jar
EXPOSE 8088
ENTRYPOINT ["java","-jar","app.jar"]