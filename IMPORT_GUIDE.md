# 🎮 Google Sheets to GameTracker Import Guide

This guide will help you export your game data from Google Sheets and import it into your GameTracker database.

## 📋 Prerequisites

- Your Google Sheets data ready for export
- Node.js installed on your system
- Access to your Supabase database

## 🚀 Quick Start

### Step 1: Export from Google Sheets

1. **Open your Google Sheet** with your game data
2. **Go to File → Download → Comma-separated values (.csv)**
3. **Save the file** as `games_export.csv` in your project root

### Step 2: Prepare Your CSV Format

Your CSV should have these columns (in any order):

```csv
name,mainStory,sideQuests,freeAchievements,allAchievements,startDate,finishDate,mainStoryComment,sideQuestsComment,freeAchievementsComment,allAchievementsComment
```

**Column Details:**
- `name`: Game name (required)
- `mainStory`: "yes", "no", or "undefined"
- `sideQuests`: "yes", "no", or "undefined" 
- `freeAchievements`: "yes", "no", or "undefined"
- `allAchievements`: "yes", "no", or "undefined"
- `startDate`: Date in YYYY-MM-DD format (optional)
- `finishDate`: Date in YYYY-MM-DD format (optional)
- `*Comment`: Any comments for undefined statuses (optional)

### Step 3: Run the Import Script

```bash
# Using npm script (recommended)
npm run import-games

# Or directly with node
node import-games.js games_export.csv
```

## 📊 CSV Format Examples

### Basic Example
```csv
name,mainStory,sideQuests,freeAchievements,allAchievements,startDate,finishDate
"The Legend of Zelda: Breath of the Wild",yes,yes,no,no,2023-01-15,2023-03-20
"Super Mario Odyssey",yes,no,no,no,2023-02-01,2023-02-15
```

### With Comments
```csv
name,mainStory,sideQuests,freeAchievements,allAchievements,startDate,finishDate,mainStoryComment,sideQuestsComment,freeAchievementsComment,allAchievementsComment
"Cyberpunk 2077",yes,undefined,undefined,undefined,2023-04-01,,,No side quests available,Some achievements require DLC,Some achievements require DLC
```

## 🔧 Script Features

- **Data Validation**: Checks for required fields and valid values
- **Date Validation**: Ensures dates are in YYYY-MM-DD format
- **Auto-calculation**: Automatically calculates 100% completion status
- **Error Handling**: Shows detailed error messages for invalid data
- **Progress Tracking**: Shows import progress and summary
- **Safe Import**: Asks for confirmation before importing

## 📝 Status Values

| Status | Description |
|--------|-------------|
| `yes` | Completed |
| `no` | Not completed |
| `undefined` | Not applicable or unknown |

## 🎯 100% Completion Logic

A game is marked as 100% complete when ALL of these are true:
- Main Story: `yes` OR `undefined`
- Side Quests: `yes` OR `undefined`
- Free Achievements: `yes` OR `undefined`
- All Achievements: `yes` OR `undefined`

## 🚨 Troubleshooting

### Common Issues

1. **"File not found"**
   - Make sure your CSV file is in the project root
   - Check the filename spelling

2. **"Invalid status value"**
   - Use only: `yes`, `no`, or `undefined`
   - Check for typos in your CSV

3. **"Invalid date format"**
   - Use YYYY-MM-DD format (e.g., 2023-12-25)
   - Leave empty for no date

4. **"Column count mismatch"**
   - Check that all rows have the same number of columns
   - Look for missing commas in your CSV

### Getting Help

If you encounter issues:
1. Check the error message for specific details
2. Verify your CSV format matches the template
3. Test with a small sample first
4. Check the console output for detailed error information

## 📁 Files Created

- `import-games.js` - Main import script
- `games_template.csv` - Sample CSV template
- `IMPORT_GUIDE.md` - This guide

## 🔄 Database Schema

The script imports data into these Supabase table columns:

| CSV Column | Database Column | Type |
|------------|----------------|------|
| name | name | TEXT |
| mainStory | main_story | TEXT |
| sideQuests | side_quests_finished | TEXT |
| freeAchievements | all_free_achievements | TEXT |
| allAchievements | all_achievements | TEXT |
| startDate | date_started | DATE |
| finishDate | date_finished | DATE |
| *Comment | *_comment | TEXT |
| (calculated) | game_100_percent | TEXT |

## ✅ Success!

Once imported, your games will appear in your GameTracker app with all the data properly formatted and ready to use!
