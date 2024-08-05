/*
    Search Store.js uses Zustand as a global state management library.
    Unlike redux, zustand uses hooks to provide a one-way data flow,
    (ironically, like redux).

    More about zustand can be found on https://github.com/pmndrs/zustand.

    Notice: This piece of code is deprecated.

*/
import { create } from 'zustand';

const useSearchStore = create((set) => ({
    valueForSearch : '',
    setValueForSearch: (valueForSearch) => set({ valueForSearch }), 
}));

export default useSearchStore;