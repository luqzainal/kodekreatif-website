FROM nginx:alpine

# Remove default nginx page and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy nginx config with port 4193
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/


EXPOSE 4193

CMD ["nginx", "-g", "daemon off;"]
