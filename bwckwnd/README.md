`docker buildx build --platform=linux/amd64 --output type=docker -t jamesliangg/nodegit .`

`docker run --name gitserver -p 3000:3000 --mount type=bind,source="/Users/jamesliang/Downloads/test",target=/mnt jamesliangg/nodegit`
