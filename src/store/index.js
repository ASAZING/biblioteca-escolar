import { createStore } from 'vuex'

export default createStore({
  state: {
    books : [],
    booksFilter: [] // Consultas y Filtro
  },
  getters: {

  },
  mutations: { // Modifico mediante los state 
    setBooks(state, payload){
      state.books = payload
    },
    setBookFilter(state, payload){
      state.booksFilter = payload
    }
  },
  actions: {
    async getBooks({commit}){
      try {
        const response = await fetch('https://api.itbook.store/1.0/search/mongodb/')
        const data = await response.json()
        commit('setBooks', data.books);
        commit('setBookFilter', data.books);
        
      } catch (error) {

        console.log('error' + error);
        
      }
    },

    async filterByTitle({commit, state}, title) {
      try {
        const response = await fetch('https://api.itbook.store/1.0/search/'+title)
        const data = await response.json()
        commit('setBooks', data.books);
        commit('setBookFilter', data.books);
        
      } catch (error) {

        console.log('error' + error);
        
      }
    },
  },
  modules: {
  }
})
