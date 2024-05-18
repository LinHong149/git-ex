`docker buildx build --platform=linux/amd64 --output type=docker -t jamesliangg/nodegit .`

`docker run --name gitserver -p 3000:3000 jamesliangg/nodegit          `