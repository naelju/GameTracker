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

## 💡 Ideas for Future Improvements

- [ ] Better overall design/UI
- [ ] Add a game rating feature
- [ ] Add a favorite top-3 games feature
- [ ] Add a different view than the table view (maybe an image-based one like Steam library)
- [ ] Automated deployment workflow

## 📝 Notes

This project is actively maintained and improved. Feel free to contribute or suggest new features!

Test