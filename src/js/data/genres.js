import { genreMovie } from '../components/fetch.js'

export let GENRES_MAP = undefined;

export async function initGenres() {
    try {
        //console.log('init');
        if (!GENRES_MAP) {
            const genres = (await genreMovie()).genres;
            GENRES_MAP = new Map(genres.map(g => [g.id, g.name]));
            //console.log(GENRES_MAP)
        }
    } catch {
        console.log("no ganres");
    }
}