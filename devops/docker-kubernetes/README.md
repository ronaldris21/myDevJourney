# MERN Docker Compose Demo

Mongo on MongoAtlas

to get started use one of the following commands

## with docker
```console
docker-compose up -d --build
```

## with MAKE
```console
Run `make build` from root to build containers
Run `make run` from root to run containers with docker-compose
```



## upload Image to Docker hub
```console
docker build -t ronaldris21/mern-docker-kubernetes:1 .
docker push ronaldris21/mern-docker-kubernetes:1 


```

## download from Docker hub
```console
docker pull ronaldris21/mern-docker-kubernetes:latest
docker run -e MONGO_URL=aiusdbnakdasldnaskldn ronaldris21/mern-docker-kubernetes:latest
```


**NOTE:** This is a development configuration where the react app is being served by a separate container. We would also want to create a production version where we build a static version of the react site and serve it with something like nginx.
