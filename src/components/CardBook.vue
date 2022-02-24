<template>
  <div class="book">
    <img :src="books.image" :alt="books.title" />
    <div class="book__info">
      <span
        ><h3
          id="show-modal"
          @click="
            showModal = true;
            img = books.image;
          "
        >
          {{ books.title }}
        </h3></span
      >
      <h4>{{ books.subtitle }}</h4>
      <div class="isbn13">
        <span>
          isbn13:
          {{ books.isbn13 }}
        </span>
      </div>
      <div class="price">
        <span>
          Price:
          {{ books.price }}
        </span>
      </div>
      <div class="ulr">
        <span> Url: {{ books.url }} </span>
      </div>
      <el-button type="warning" plain @click="download">Descargar</el-button>
    </div>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" :url="img" @close="showModal = false">
      <template #header>
        <h3>Image</h3>
      </template>
    </modal>
  </Teleport>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Modal.vue";
import exportFromJSON from 'export-from-json';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      img: "",
    };
  },
  props: ["books"],
  setup(props) {
    async function download() {
      const res = await axios.get(
        "https://api.itbook.store/1.0/books/" + props.books.isbn13
      );
      const data = Object.entries(res.data);;
      const fileName = "book-"+props.books.isbn13;
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    }
    const open = true;

    return { download, open };
  },
};
</script>


<style lang="scss">
.book {
  background-color: var(--background-card);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px var(--background-body);
  overflow: hidden;
  cursor: pointer;
  transition: transform 200ms ease-in-out;
  height: 100%;
  width: 100%;
  &:hover {
    transform: scale(1.05);
    h3 {
      color: var(--text-orange);
    }
  }
  span {
    color: var(--text-gray);
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  .book__info {
    padding: 0.5rem;
    .isbn13 {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }
  }
}
</style>