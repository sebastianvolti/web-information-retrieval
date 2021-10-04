FROM node:alpine as build-stage

WORKDIR /app

COPY . /app/

RUN npm i
RUN npm i react-scripts@latest -g
# RUN npm audit fix
RUN npm run build

# at this point we could use the serve command
# serve -s build
# to have it running on node under build/server.js
# but we want to run it on nginx, so we do a next stage

# 1. server environment
FROM nginx:alpine

# copy nginx config file to appropriate location
COPY nginx.conf /etc/nginx/conf.d/

# copy react built app to nginx public document root
COPY --from=build-stage /app/build /usr/share/nginx/html

# fire the app and pause everything else
# The EXPOSE instruction does not actually publish the port. It functions as a type of documentation between the person who builds the image and the person who runs the container, about which ports are intended to be published. To actually publish the port when running the container, use the -p flag on docker run to publish and map one or more ports, or the -P flag to publish all exposed ports and map them to high-order ports.
EXPOSE 8080

# Exec Form does not work on Jelastic
# CMD ["nginx", "-g", "daemon off;"]
# is absorbed by Jelastic as the CMD to start the container
# WARNING: but it does not escape it properly

# so instead use this Shell Form:
CMD nginx -g "daemon off;"
