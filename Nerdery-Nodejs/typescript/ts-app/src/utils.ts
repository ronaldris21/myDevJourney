//// CONFIG.TS 
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Hero } from './interfaces';

export const API = '/api';

let apiUrl = API;

const parseList = <T>(response: AxiosResponse) => {
    if (response.status !== 200) throw Error(response.statusText);
    if (!response.data) return [];
    let list: T[] = response.data;
    if (typeof list !== 'object') {
        list = [];
    }
    return list;
};

export { apiUrl, parseList };

export function handleAxiosErrors(error: AxiosError, model: string) {
    /**
     * This is a technical error, targeting the developers.
     * You should always log it here (lowest level). This serves the developer.
     * If I want to propogate this back to the callers,
     * I should determine how to propogate it out and if I want to transform it.
     */
    console.error(`Developer Error: Async Data Error: ${error.message}`);

    /**
     *  How do I feel about errors in this path?
     * Log the error here,
     * and let the caller know an error occurred,
     * but dont change the return type
     */
    throw new Error(`Oh no! We're unable to fetch the ${model}`);

    /**
     * Throw errors or return them?
     *
     * We could pass this back every time.
     * the argument here is you can avoid try/catch everywhere but you instead have to package the error.
     * interface Message {
     *   response: any;
     *   error: string;
     * }
     *
     * return the error object to the caller, to be examined
     * return {response, error};
     */
}




/// CHECK FILE: asyncAwait.ts 
/**
 * Get the hero's orders
 */
const getHeroAsync = async (email: string) => {
    try {
        const response = await axios.get(`${apiUrl}/heroes?email=${email}`);
        const data = parseList<Hero>(response);
        const hero = data[0];
        return hero;
    } catch (error) {
        handleAxiosErrors(error as AxiosError, "Hero");
        return undefined;
    }
}


