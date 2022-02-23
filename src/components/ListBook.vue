<template>
  <section>
    <div class="search">
      <input
        type="text"
        placeholder="Search by title"
        v-model="title"
        @keyup="filter()"
      />
    </div>
  </section>
  <section>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="onChageCurrentPage"
    >
    </el-pagination>
    <div v-loading="books == 0" element-loading-text="Loading..." class="books">
      <div class="books__item" v-for="book in books" :key="book.id">
        <CardBook :books="book" />
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="onChageCurrentPage"
    >
    </el-pagination>
  </section>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import CardBook from "@/components/CardBook.vue";

export default {
  components: {
    CardBook,
  },
  setup() {
    // Composition api
    const title = ref("");
    let loading = true;
    const store = useStore();
    const filter = () => {
      store.dispatch("filterByTitle", title.value);
    };
    const total = computed(() => {
      return store.state.total;
    });
    const currentPage = computed(() => {
      return store.state.currentPage;
    });
    const books = computed(() => {
      return store.state.booksFilter;
    });

    function onChageCurrentPage(newPage) {
      store.state.currentPage = newPage;
      store.dispatch("filterByTitle", title.value);
    }
    onMounted(() => {
      store.dispatch("getBooks");
      loading = false;
    });
    return { books, currentPage, total, onChageCurrentPage, title, filter, loading };
  },
};
</script>

<style lang="scss">
.books {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  margin-left: 5rem;
  margin-right: 5rem;
}
.search {
  width: 400px;
  margin: 3rem auto 0;
  input {
    height: 53px;
    width: 400px;
    border: none;
    border-radius: 10px;
    padding: 0 0.5rem;
  }
}
el-pagination{
  background-color: red;
}
</style>