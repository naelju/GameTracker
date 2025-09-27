# 🎮 GameTracker

A simple and elegant project to track what games I've played, with additional features coming along the way.

## 🚀 Quick Start

To run the app locally:

```bash
pnpm run dev
```

## 🎯 Features

- 📊 **Track your gaming progress** - Keep track of games you've played
- 🎨 **Clean and intuitive interface** - User-friendly design
- 🔄 **Real-time updates** - Changes sync instantly
- 🔤 **Smart sorting** - Sort by name (default) or 100% completion status
- 🔍 **Game search** - Find existing games or add new ones with intelligent search
- 👥 **Multi-user support** - User isolation with User ID authentication
- 🔑 **Admin access** - Elevated permissions for data management
- 🚀 **Additional features in development** - More functionality coming soon

## 🛠️ Development

### Running the App
```bash
pnpm run dev
```

### Deployment
To deploy changes:
```bash
npm run deploy
```
> **Note**: The build step runs automatically via the `predeploy` hook defined in `package.json`

You can verify that a push happened on the `gh-pages` branch.

**Future improvement**: Use a workflow that would do deployment automatically on push.

## 🔧 Data Management

> ⚠️ **Important**: To edit the data, only do it with the app built locally and replace the env key by the all-powerful key stored in `.secret`.

**Security Note**: The `.secret` file contains sensitive configuration and is excluded from version control.

### 🔐 Security Model
- **User isolation** - Each user sees only their own games via User ID
- **Admin access** - Enter admin key for elevated database permissions
- **Data protection** - Users cannot access other users' data without knowing their User ID
- **Trust-based system** - Admin key provides full database access for data management

## 💡 Ideas for Future Improvements

- [ ] Better overall design/UI
- [ ] Add a game rating feature
- [ ] Add a favorite top-3 games feature
- [ ] Add a different view than the table view (maybe an image-based one like Steam library)
- [ ] Automated deployment workflow

## 📝 Recent Updates

### ✨ **Latest Features Added**
- 🔤 **Smart sorting** - Games ordered by name (default) and 100% completion status
- 📊 **Advanced sorting** - 100% asc/desc with name as secondary sort
- 👥 **Multi-user architecture** - Updated DB structure to support multiple users
- 🆔 **User ID authentication** - Simple prompt to show user-specific games
- 🔑 **Admin key system** - Elevated database access for data management
- 🔍 **Intelligent game creation** - Search existing games or add new ones by name

### 🎮 **Usage Instructions**
- **Regular users**: Enter your User ID to see your games
- **Administrators**: Enter User ID + Admin key to add/edit/delete game entries
- **Game creation**: Choose between searching existing games or creating new entries
