# BUILD /SETUP aws lightsail plugin

sudo curl "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/linux-amd64/lightsailctl" -o "/usr/local/bin/lightsailctl"
sudo chmod +x /usr/local/bin/lightsailctl



aws lightsail create-container-service --service-name hello-mongodb-app --power micro --scale 1


aws lightsail push-container-image --service-name hello-mongodb-app --image jmimick/hello-mongodb-app:latest --label hello-mongodb-app
aws lightsail push-container-image --service-name hello-mongodb-app --image jmimick/hello-mongodb-service --label hello-mongodb-service



aws lightsail create-container-service-deployment --service-name hello-mongodb-app --containers file://containers.json --public-endpoint file://public-endpoint.json

