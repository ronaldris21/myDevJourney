import axios, { AxiosResponse, AxiosError, Axios } from "axios";
import { Hero, Order, AccountRepresentative } from "./interfaces";
import { apiUrl, handleAxiosErrors, parseList } from "./utils";
import { parse } from "path";


type ReturnType = string | number;
let namae: (params: string) => ReturnType = /*implementation*/ (params: string): ReturnType => {
    //logic
    return parseInt(params);
}

console.log(namae("ads"));

/**
 * Return a fulfilled promise after a given delay.
 */
let delay: (ms: number) => Promise<void> = (ms: number) => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}
const sample1 = async (ms: number) => {
    console.log("Waiting");

    await delay(ms);
    console.log(ms + " ms has passed!");
}

sample1(400);

let getNoHeroes: (ms: number) => Promise<Hero[]> = (ms: number) => {
    return Promise.resolve([]);
}


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

const getOrdersAsync = async (heroId: number) => {
    try {
        const response = await axios.get(`${apiUrl}/orders/${heroId}`);
        const data = parseList<Order>(response);
        return data;
    } catch (error) {
        handleAxiosErrors(error as AxiosError, "Hero");
        return undefined;
    }

}

const getAccountRepAsync = async (heroId: number) => {
    try {
        const response = await axios.get(`${apiUrl}/orders/${heroId}`);
        const data = parseList<AccountRepresentative>(response);
        const account = data[0];
        return account;
    } catch (error) {
        handleAxiosErrors(error as AxiosError, "AccountRep");
    }
}



//TAKE A GOOD LOOK ABOUT THIS DESTRUCTURING SAMPLE!

const getHeroTreePromiseAync = async function (searchEmail: string) {

    try {

        const hero = await getHeroAsync(searchEmail);
        if (!hero) return;  //// THIS FUCKING LINE jajajjajajja

        const mergeData = (result: [Order[], AccountRepresentative | undefined]): Hero => {
            const [orders, accountRep] = result;
            if (orders && orders.length) hero.orders = orders;
            if (accountRep) hero.accountRep = accountRep;
            return hero;
        }

        // const results: [Order[], AccountRepresentative] = await Promise.all([getOrdersAsync(hero.id), getAccountRepAsync(hero.id)]);
        const results = await Promise.allSettled([getOrdersAsync(hero.id), getAccountRepAsync(hero.id)]);
        const orders = results[0].status === "fulfilled" ? results[0].value as Order[] : [];
        const accountRep = results[1].status === "fulfilled" ? results[1].value as AccountRepresentative : undefined;
        return mergeData([orders, accountRep])


    } catch (error) {
        console.log("ERROR:")
        console.error(error);

    }
};


getHeroTreePromiseAync("ris@email.com")