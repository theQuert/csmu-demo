# Setting nginx service for subdomain
- Running example docker container
```bash
docker run -d -p 6350:6333 qdrant/qdrant
```
```
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

- Setup Nginx service 
```bash
sudo vim /etc/nginx/sites-available/csmudemo.stima.tech
```

```
server {
    server_name testing.stima.tech;

    location / {
        proxy_pass http://localhost:6000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 443 ssl; # managed by Certbot
    # ssl_certificate /etc/letsencrypt/live/testing.stima.tech/fullchain.pem; # managed by Certbot
    # ssl_certificate_key /etc/letsencrypt/live/testing.stima.tech/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = testing.stima.tech) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name testing.stima.tech;
    return 404; # managed by Certbot
    }
```

- Reload Nginx and certificate
```bash
sudo certbot --nginx -d csmudemo.stima.tech
# uncomment the ssl settings in nginx config
sudo ln -s /etc/nginx/sites-available/testing.stima.tech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
