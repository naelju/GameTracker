#!/usr/bin/env node

/**
 * Google Sheets to GameTracker Import Script
 * 
 * Usage: node import-games.js [csv-file-path]
 * Example: node import-games.js games_export.csv
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://tvmclhztlckjumzjhhnd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWNsaHp0bGNranVtempoaG5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAwNDU1MywiZXhwIjoyMDczNTgwNTUzfQ.mym8HBwoz3NrOxHjcFHxEOAFTTtGKGnfKqRwNWgkM_8';

const supabase = createClient(supabaseUrl, supabaseKey);

// Valid status values
const VALID_STATUSES = ['yes', 'no', 'undefined'];

// Helper function to process field values according to user requirements
function processFieldValue(value) {
  if (!value || value.trim() === '') {
    return { status: 'no', comment: null };
  }
  
  const trimmedValue = value.trim().toLowerCase();
  
  if (trimmedValue === 'yes') {
    return { status: 'yes', comment: null };
  } else {
    // Any other string becomes undefined with the string as comment
    return { status: 'undefined', comment: value.trim() };
  }
}

// Helper function to validate and clean data
function validateAndCleanGameData(row, lineNumber) {
  const errors = [];
  
  // Required fields - using the actual column names from the CSV
  const gameName = row['Game'] || row['game'] || row['Game Name'] || row['name'];
  if (!gameName || gameName.trim() === '') {
    errors.push(`Line ${lineNumber}: Game name is required`);
  }
  
  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
  
  // Process each field according to the user's requirements
  const mainStory = processFieldValue(row['Main quest/main storyline/main objectives'] || row['mainStory']);
  const sideQuests = processFieldValue(row['All side quests/side objectives/tracked colectibles'] || row['sideQuests']);
  const freeAchievements = processFieldValue(row['All (free) achievements'] || row['freeAchievements']);
  const allAchievements = processFieldValue(row['All achivement iuncluding paywalled DLC ones'] || row['allAchievements']);
  
  // Clean and format data to match the actual database schema
  const cleanedData = {
    name: gameName.trim(),
    mainStory: mainStory.status,
    sideQuests: sideQuests.status,
    freeAchievements: freeAchievements.status,
    allAchievements: allAchievements.status,
    startDate: null, // No date columns in your CSV
    finishDate: null, // No date columns in your CSV
    mainStoryComment: mainStory.comment,
    sideQuestsComment: sideQuests.comment,
    freeAchievementsComment: freeAchievements.comment,
    allAchievementsComment: allAchievements.comment,
    hundredPercent: false // Will be calculated
  };
  
  // Calculate 100% completion based on the 100% column if present, otherwise calculate
  const hundredPercentColumn = row['100%'] || row['hundredPercent'];
  if (hundredPercentColumn && hundredPercentColumn.trim().toLowerCase() === 'yes') {
    cleanedData.hundredPercent = true;
  } else {
    // Auto-calculate: all fields must be 'yes' or 'undefined' for 100%
    const statusFields = ['mainStory', 'sideQuests', 'freeAchievements', 'allAchievements'];
    const is100Percent = statusFields.every(field => 
      cleanedData[field] === 'yes' || cleanedData[field] === 'undefined'
    );
    cleanedData.hundredPercent = is100Percent;
  }
  
  return cleanedData;
}

function isValidDate(dateString) {
  if (!dateString) return true; // Allow empty dates
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) && dateString.match(/^\d{4}-\d{2}-\d{2}$/);
}

function parseCSV(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    throw new Error('CSV file must have at least a header row and one data row');
  }
  
  // Parse headers and skip the first empty column
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  console.log('📋 Detected columns:', headers);
  
  const games = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue; // Skip empty lines
    
    // Parse CSV line, handling commas within quoted values
    const values = parseCSVLine(line);
    
    if (values.length !== headers.length) {
      console.warn(`Skipping line ${i + 1}: Column count mismatch (expected ${headers.length}, got ${values.length})`);
      continue;
    }
    
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    // Skip rows where the game name is empty
    const gameName = row['Game'] || row['game'] || row['Game Name'] || row['name'];
    if (!gameName || gameName.trim() === '') {
      console.warn(`Skipping line ${i + 1}: No game name`);
      continue;
    }
    
    try {
      const gameData = validateAndCleanGameData(row, i + 1);
      games.push(gameData);
    } catch (error) {
      console.error(`Error processing line ${i + 1}:`, error.message);
      process.exit(1);
    }
  }
  
  return games;
}

// Helper function to parse CSV line properly handling quoted values
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

async function importGames(games) {
  console.log(`\n📊 Starting import of ${games.length} games...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    try {
      console.log(`Importing ${i + 1}/${games.length}: ${game.name}`);
      
      const { data, error } = await supabase
        .from('game')
        .insert([game])
        .select()
        .single();
      
      if (error) {
        console.error(`❌ Error importing "${game.name}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Successfully imported "${game.name}"`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Unexpected error importing "${game.name}":`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📈 Import Summary:`);
  console.log(`✅ Successfully imported: ${successCount} games`);
  console.log(`❌ Failed to import: ${errorCount} games`);
  console.log(`📊 Total processed: ${games.length} games`);
}

async function main() {
  try {
    // Get CSV file path from command line arguments
    const csvFilePath = process.argv[2] || 'Games I\'ve played - Copie de Finished games 1 (1).csv';
    
    if (!fs.existsSync(csvFilePath)) {
      console.error(`❌ Error: File "${csvFilePath}" not found.`);
      console.log(`\nUsage: node import-games.js [csv-file-path]`);
      console.log(`Example: node import-games.js games_export.csv`);
      process.exit(1);
    }
    
    console.log(`📁 Reading CSV file: ${csvFilePath}`);
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    
    console.log(`🔄 Parsing CSV data...`);
    const games = parseCSV(csvContent);
    
    console.log(`✅ Parsed ${games.length} games from CSV`);
    
    // Show preview of first game
    if (games.length > 0) {
      console.log(`\n📋 Preview of first game:`);
      console.log(JSON.stringify(games[0], null, 2));
    }
    
    // Ask for confirmation
    console.log(`\n⚠️  This will import ${games.length} games into your Supabase database.`);
    console.log(`Press Ctrl+C to cancel, or any key to continue...`);
    
    // Wait for user input (simple approach)
    await new Promise(resolve => {
      process.stdin.once('data', () => resolve());
    });
    
    await importGames(games);
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
