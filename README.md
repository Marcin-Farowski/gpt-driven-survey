# GPT driven survey system

Video presenting the application:

[![Video presenting the application](https://i9.ytimg.com/vi_webp/NtecsP5qa1I/mq2.webp?sqp=CJjfua4G-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLDd9vT8geo-Ivo7-I0fpKv5XagYWQ)](https://www.youtube.com/watch?v=NtecsP5qa1I&ab_channel=MarcinFarowski)

### Installation:

- create a .env.local file and complete it with the necessary environment variables (below you will find an example of such a file)
- run command `npm i`
- run Docker application
- run command `docker-compose up -d`

### Example of .env.local file:

```MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=gpt-driven-survey

MONGODB_URI=mongodb://admin:password123@localhost:6000/gpt-driven-survey?authSource=admin

OPENAI_API_KEY=YOUR_OPENAI_API_KEY`
```
