import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    books: [],
    booksFilter: [], // Consultas y Filtro
    previousPage: null,
    currentPage: 1,
    nextPage: null,
    pageMin: 1,
    pageMax: 1,
    currentTotal: 10,
    total: 0,
  },
  mutations: { // Modifico mediante los state 
    setBooks(state, payload) {
      state.books = payload;
    },
    setBookFilter(state, payload) {
      state.booksFilter = payload.books;
      state.currentPage = Number(payload.page);
      if (Number(payload.total) > 0) {
        const total = Number(payload.total);
        state.total = total;
        const pages = Math.ceil(total / 10);
        state.pageMin = 1;
        state.pageMax = pages;
        state.currentTotal = payload.books.length;
        if (state.currentPage + 1 > pages) {
          state.nextPage = null;
        } else {
          state.nextPage = state.currentPage + 1;
        }
        if (state.currentPage - 1 < state.pageMin) {
          state.previousPage = null;
        } else {
          state.previousPage = state.currentPage - 1;
        }

      } else {
        state.nextPage = null;
        state.pageMax = 1;
        state.pageMin = 1;
        state.currentTotal = 0;
        state.total = 0;
        state.previousPage = null;
      }

    }
  },
  actions: {
    async getBooks({ commit }, numberRecords) {
      try {
        const res = await axios.get('https://api.itbook.store/1.0/new');
        const { data } = res;
        commit('setBooks', data.books);
        commit('setBookFilter', data);

      } catch (error) {

        console.log('error' + error);

      }
    },

    async filterByTitle({ commit, state }, title) {
      try {
        const res = title ? await axios.get('https://api.itbook.store/1.0/search/' + title + '/' + state.currentPage) : await axios.get('https://api.itbook.store/1.0/new');
        const { data } = res;
        commit('setBooks', data.books);
        commit('setBookFilter', data);

      } catch (error) {

        console.log('error' + error);

      }
    },
  },
})
