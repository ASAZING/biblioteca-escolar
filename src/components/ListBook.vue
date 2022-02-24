<template>
  <section>
    <div class="search">
      <input
        type="text"
        placeholder="Search by title"
        v-model="title"
        @keyup="filter()"
      />
      <br />
    </div>
  </section>
  <section>
    <el-input-number
      v-model="num"
      :min="1"
      :max="10"
      size="small"
      controls-position="right"
      @change="handleChange"
    />
  </section>
  <section>
    <el-scrollbar height="480px">
      <div
        v-loading="books == 0"
        element-loading-text="Loading..."
        class="books"
      >
        <div class="book" v-for="book in books" :key="book.id">
          <CardBook :books="book" />
        </div>
      </div>
    </el-scrollbar>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      @current-change="onChageCurrentPage"
      class="paginator"
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
    let num = ref(10);
    function handleChange(value) {
      num = value;
      console.log(num);
    };
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
      num = num+1;
      return store.state.booksFilter;
    });

    function onChageCurrentPage(newPage) {
      store.state.currentPage = newPage;
      store.dispatch("filterByTitle", title.value);
    };
    onMounted(() => {
      store.dispatch("getBooks");
      loading = false;
    });
    return {
      books,
      currentPage,
      total,
      onChageCurrentPage,
      title,
      filter,
      loading,
      handleChange,
      num,
    };
  },
};
</script>

<style lang="scss">
.books {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  margin-left: 3rem;
  margin-right: 3rem;
}
.search {
  width: 400px;
  margin: 3rem auto 3rem;
  input {
    height: 53px;
    width: 400px;
    border: none;
    border-radius: 10px;
    padding: 0 0.5rem;
  }
}
.paginator {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25%;
  margin-right: 25%;
  align-items: center;
}
@media only screen and (max-width: 720px) {
  .books {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3rem;
    margin-left: 5rem;
    margin-right: 5rem;
  }
  .search {
    width: 400px;
    margin: 3rem auto 3rem;
    input {
      height: 53px;
      width: 400px;
      border: none;
      border-radius: 10px;
      padding: 0 0.5rem;
    }
  }
}

@media only screen and (max-width: 719px) {
  .books {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem;
    margin-left: 5rem;
    margin-right: 5rem;
  }
  .search {
    width: 400px;
    margin: 3rem auto 3rem;
    input {
      height: 53px;
      width: 400px;
      border: none;
      border-radius: 10px;
      padding: 0 0.5rem;
    }
  }
}

@media only screen and (max-width: 500px) {
  .books {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 3rem;
    margin-left: 5rem;
    margin-right: 5rem;
  }
  .search {
    width: 200px;
    margin: 3rem auto 3rem;
    input {
      height: 53px;
      width: 200px;
      border: none;
      border-radius: 10px;
      padding: 0 0.5rem;
    }
  }
}
</style>