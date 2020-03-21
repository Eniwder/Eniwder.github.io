<template>
  <div class="card" @click="newPost()">
    <div class="card-content">新規投稿</div>
  </div>
</template>

<script>
import { toast } from 'bulma-toast';

const Hour = 1000 * 60 * 60;
export default {
  mounted() {},
  computed: {},
  methods: {
    newPost() {
      alert('未定');
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
