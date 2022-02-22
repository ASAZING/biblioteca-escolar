<template>
  <div class="book">
    <img :src="books.image" :alt="books.title" />
    <div class="book__info">
      <span
        ><h3>{{ books.title }}</h3></span
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
        <span>
          Url: {{ books.url }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["books"],
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
    padding: 1.5rem;
    .isbn13 {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .origen {
      margin-bottom: 0.5rem;
    }
  }
}
</style>