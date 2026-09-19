# odin-rock-paper-scissors

A browser-based Rock, Paper, Scissors game built with HTML and JavaScript.

## Deploying with Docker

Since this application consists of static files (`index.html` and `game.js`), it can be served using an Nginx container.

### 1\. Create a `Dockerfile`

In the root directory of the project, create a file named `Dockerfile` with the following content:

```dockerfile
FROM nginx:alpine

# Copy static assets to Nginx default public directory
COPY index.html /usr/share/nginx/html/
COPY game.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 2\. Build the Docker Image

Run the following command in the project directory:

```bash
docker build -t odin-rock-paper-scissors .
```

### 3\. Run the Container

Start a container mapping host port `8080` to container port `80`:

```bash
docker run -d --name rps-game -p 8080:80 odin-rock-paper-scissors
```

Access the application in your browser at `http://localhost:8080`.

### 4\. Stop and Remove the Container

```bash
docker stop rps-game
docker rm rps-game
```
