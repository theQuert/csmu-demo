# Setting nginx service for subdomain
- Running example docker container
```bash
docker run -d -p 6350:6333 qdrant/qdrant
```
```
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

- Set Nginx servie
```bash
sudo vim /etc/nginx/sites-available/csmudemo.stima.tech
```

```json
server {
    listen 80;
    server_name csmudemo.stima.tech;

    location / {
        proxy_pass http://localhost:6350;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
- Reload Nginx and certificate
```bash
sudo ln -s /etc/nginx/sites-available/csmudemo.stima.tech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d csmudemo.stima.tech
```