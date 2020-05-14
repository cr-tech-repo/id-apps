FROM nginx:1.15.2-alpine
COPY ./build /var/www

COPY ./spacrcom.cert /etc/nginx/spacrcom.cert
COPY ./spacrcom.key /etc/nginx/spacrcom.key
COPY ./nginx.conf /etc/nginx/nginx.conf


EXPOSE 443

ENTRYPOINT ["nginx","-g","daemon off;"]
