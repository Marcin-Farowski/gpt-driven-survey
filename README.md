# GPT driven survey system

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
