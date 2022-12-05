import { defineStore } from 'pinia';

export const usePiniaStore = defineStore('posts', {
	state: () => {
		return { 
            btnDark: 'cottage',
        };
	},
	getters: {
		
	},
	// could also be defined as
	// state: () => ({ count: 0 })
	actions: {
		
	},
});
