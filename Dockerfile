FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy website files
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Copy images if used by the website
COPY image.png /usr/share/nginx/html/
COPY "image copy.png" /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
