import { genreMovie } from '../components/fetch.js'

export let GENRES_MAP = undefined;

export async function initGenres() {
    try {
        if (!GENRES_MAP) {
            const genres = (await genreMovie()).genres;
            GENRES_MAP = new Map(genres.map(g => [g.id, g.name]));
        }
    } catch {
        console.log("no ganres");
    }
}