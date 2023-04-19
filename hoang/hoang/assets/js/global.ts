export const api_url = 'http://localhost:8080/music/';

interface infoSong {
    id: number; is_like: number; name: string; id_gg: string; image: string; date_create: string; id_singer: any; text_gr_singer: string
}
export interface infoSongs extends Array<infoSong> { }

interface infoPlaylist {
    id: number; is_like: number; name: string; img: any; create_by: string
}
export interface infoPlaylists extends Array<infoPlaylist> { }