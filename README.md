# Chatpot-Asset-Server
asset management server for chatpot services.

## How to run
```bash
$ npm install
$ npm run dev
```

## Configuration file format
By default, the configuration file path must be `$HOME/chatpot-asset-conf.json` 
```json
{
	"HTTP_PORT": 5100,
	"CREDENTIAL_AUTH_ENABLED": false,
	"CREDENTIAL_AUTH_SECRET": "CHATPOT_AUTH_SECRET",
	"UPLOAD_PATH": "FILE UPLOAD PATH"
}
```