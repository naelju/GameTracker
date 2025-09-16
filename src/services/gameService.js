const API_BASE_URL = 'http://localhost:3001/api';

class GameService {
  async getGames() {
    try {
      const response = await fetch(`${API_BASE_URL}/games`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching games:', error);
      // Fallback to localStorage if server is not available
      const localGames = localStorage.getItem('gameTracker');
      return localGames ? JSON.parse(localGames) : [];
    }
  }

  async createGame(gameData) {
    try {
      const response = await fetch(`${API_BASE_URL}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating game:', error);
      // Fallback to localStorage
      const localGames = JSON.parse(localStorage.getItem('gameTracker') || '[]');
      const newGame = { id: Date.now(), ...gameData };
      localGames.push(newGame);
      localStorage.setItem('gameTracker', JSON.stringify(localGames));
      return newGame;
    }
  }

  async updateGame(id, gameData) {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating game:', error);
      // Fallback to localStorage
      const localGames = JSON.parse(localStorage.getItem('gameTracker') || '[]');
      const gameIndex = localGames.findIndex(game => game.id === id);
      if (gameIndex !== -1) {
        localGames[gameIndex] = { ...localGames[gameIndex], ...gameData };
        localStorage.setItem('gameTracker', JSON.stringify(localGames));
        return localGames[gameIndex];
      }
      throw new Error('Game not found');
    }
  }

  async deleteGame(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/games/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting game:', error);
      // Fallback to localStorage
      const localGames = JSON.parse(localStorage.getItem('gameTracker') || '[]');
      const filteredGames = localGames.filter(game => game.id !== id);
      localStorage.setItem('gameTracker', JSON.stringify(filteredGames));
      return { message: 'Game deleted successfully' };
    }
  }

  async checkServerHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default new GameService();
