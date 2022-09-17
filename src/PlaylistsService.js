const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistById(id) {
        const query = {
            text: 'SELECT id, name FROM playlists WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        return result.rows[0];
    }

    async getSongsFromPlaylist(playlistId) {
        const query = {
            text: `SELECT songs.id, songs.title, songs.performer
            FROM songs INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        };

        const result = await this._pool.query(query);

        return result.rows;
    }
}

module.exports = PlaylistsService;
