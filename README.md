# Skycord
A Discord bot to announce new posts from Bluesky!

<img src="https://github.com/Kyanoxia/skycord/blob/main/assets/SkycordGithub.png" alt="skycord banner" width="100%"/>

## Getting Started
To start, invite the bot to your server using [this URL](https://discord.com/oauth2/authorize?client_id=1297227452707373267).  Once it has successfully joined, use the `/connect` command to subscribe to a user!

### Commands
**`<>` indicates required, `[]` indicates optional**
|    **Command Name**   |               **Description**               |                         **Usage**                          |
| --------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `/connect`            | Connect your BlueSky account                | `/connect <handle> <embed provider> <replies> [message]`   |
| `/disconnect`         | Disconnect your BlueSky account             | `/disconnect <handle>`                                     |
| `/list`               | Display subscribed users in channel         | `/list`                                                    |
| `/getlastpost`        | (global) Get the latest post from a user    | `/getlastpost <handle>`                                    |
| `/botinfo`            | (global) Display information about Skycord  | `/botinfo`                                                 |

## Self-Hosting
### Prerequisites
NodeJS (v18.19.0+) & NPM must be installed.  Once installed, please globally install typescript for convenience:
```
npm i --global typescript
```
Now that that's out of the way, let's get to it.

### Setting Up

Clone this repository:
```
git clone https://github.com/Kyanoxia/bluecord.git
```

Travel into that directory:
```
cd bluecord
```

Install Dependencies:
```
npm i
```

Create your environment variables:
```
touch .env
```

Start the bot:
```
npm run dev
```
or for production (using pm2 for process persistence)
```
npm run startpm
```

### Environment Variables
|   **Variable Name**   |                **Description**              |
| --------------------- | -------------------------------------------:|
| `token`               | Your discord bot token                      |
| `discordClientID`     | Your discord bot Client ID                  |
| `mongoURL`            | Your Mongo Database URL                     |
| `devGuildID`          | Discord developer guild ID for dev commands |
| `devUID`              | JS/TS-style array of developer user IDs     |

If you are unfamiliar with creating environment variables, please refer to [this page](https://www.dotenv.org/docs/security/env).

### Commands for developers
**`<>` indicates required, `[]` indicates optional**
|    **Command Name**   |               **Description**               |            **Usage**         |
| --------------------- | ------------------------------------------- | ---------------------------- |
| `/emit`               | Artificially trigger join/leave event       | `/emit <event>`              |
| `/getdatabase`        | Print the whole database to console         | `/getdatabase`               |
