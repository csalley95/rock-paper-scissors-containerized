FROM nginx:alpine

# Serve the complete static application, including CSS.
COPY index.html style.css game.js /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
