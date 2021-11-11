import { genreMovie } from '../components/fetch.js'

export let GENRES_MAP = undefined;

export async function init() {
    try {
        console.log('Call init')
        if (!GENRES_MAP) {
            //console.log('make ganres')
            const genres = (await genreMovie()).genres;
            GENRES_MAP = new Map(genres.map(g => [g.id, g.name]));
            console.log('make ganres')
            console.log(GENRES_MAP)
        }
    } catch {
        console.log("no ganres");
    }
}