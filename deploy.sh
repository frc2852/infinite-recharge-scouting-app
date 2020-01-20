#! /bin/sh

docker build . -f deploy.dockerfile -t github-pages-deploy
docker run -it github-pages-deploy