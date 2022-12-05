// stores/counter.js
import { defineStore } from 'pinia';

export const usePiniaStore = defineStore('bookmarks', {
	state: () => {
		return { bookmarks: [] };
	},
	getters: {
		getBookmark: (state) => {
			return (bookmarkId) =>
				state.bookmarks.find((bookmark) => {
					return Number(bookmark.id) === Number(bookmarkId);
				});
		},
	},
	// could also be defined as
	// state: () => ({ count: 0 })
	actions: {
		setBookmarks(data) {
			this.bookmarks = data;
            console.log(this.bookmarks);
		},
	},
});
