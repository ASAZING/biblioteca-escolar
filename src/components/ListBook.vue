<template>
  <section>
    <div class="books">
      <div class="books__item" v-for="book in books" :key="book.id">
        <CardBook :books="book" />
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import CardBook from '@/components/CardBook.vue'
export default {
  components:{
    CardBook
  },
  setup() {
    const store = useStore();
    const books = computed(() => {
      return store.state.booksFilter;
    });
    onMounted(() => {
      store.dispatch("getBooks");
    });
    return { books };
  },
};
</script>

<style lang="scss">
.books {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  margin-left: 10rem;
  margin-right: 10rem;
}
</style>