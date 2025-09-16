// Simple JSON file storage service
// This will work with localStorage as fallback and can be easily extended to use a real API

class JsonStorageService {
  constructor() {
    this.storageKey = 'gameTracker';
  }

  async getGames() {
    try {
      const games = localStorage.getItem(this.storageKey);
      return games ? JSON.parse(games) : [];
    } catch (error) {
      console.error('Error loading games from storage:', error);
      return [];
    }
  }

  async saveGames(games) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(games));
      return games;
    } catch (error) {
      console.error('Error saving games to storage:', error);
      throw error;
    }
  }

  async createGame(gameData) {
    try {
      const games = await this.getGames();
      const newGame = {
        id: Date.now(),
        ...gameData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      games.push(newGame);
      await this.saveGames(games);
      return newGame;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  }

  async updateGame(id, gameData) {
    try {
      const games = await this.getGames();
      const gameIndex = games.findIndex(game => game.id === id);
      
      if (gameIndex === -1) {
        throw new Error('Game not found');
      }

      const updatedGame = {
        ...games[gameIndex],
        ...gameData,
        updatedAt: new Date().toISOString()
      };
      
      games[gameIndex] = updatedGame;
      await this.saveGames(games);
      return updatedGame;
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
  }

  async deleteGame(id) {
    try {
      const games = await this.getGames();
      const filteredGames = games.filter(game => game.id !== id);
      
      if (games.length === filteredGames.length) {
        throw new Error('Game not found');
      }
      
      await this.saveGames(filteredGames);
      return { message: 'Game deleted successfully' };
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  }

  // Export data to JSON file
  async exportData() {
    try {
      const games = await this.getGames();
      const dataStr = JSON.stringify(games, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `game-tracker-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  // Import data from JSON file
  async importData(file) {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const games = JSON.parse(e.target.result);
            if (Array.isArray(games)) {
              await this.saveGames(games);
              resolve(games);
            } else {
              reject(new Error('Invalid file format'));
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Error reading file'));
        reader.readAsText(file);
      });
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }
}

export default new JsonStorageService();
