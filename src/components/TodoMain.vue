<template>
  <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <div class="write">
          <input
            ref="writeArea"
            type="text"
            v-model="addItemText"
            @keyup.enter="addItem"
          />
          <button class="btn add" @click="addItem">Add</button>
        </div>
        <ul class="list">
          <li v-for="(todo, i) in todos" :key="todo.text">
            <i
              @click="checkItem(i)"
              :class="[
                { far: todo.state === 'yet', fas: todo.state === 'done' },
                'fa-check-square',
              ]"
            ></i>
            <span>
              {{ todo.text }}
              <!-- 원고 챕터1 마감 -->
              <b>
                <a href="">Edit</a>
                <a href="">Del</a>
              </b>
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { doesNotMatch } from "assert";

export default {
  data() {
    return {
      addItemText: "",
      todos: [
        { text: "공부하기", state: "yet" },
        { text: "운동하기", state: "done" },
        { text: "글쓰기", state: "done" },
      ],
    };
  },
  methods: {
    addItem() {
      if (!this.addITemText === "") return;
      this.todos.push({ text: this.addItemText, state: "yet" });
      this.addItemText = "";
    },
    checkItem(index) {
      if (this.todos[index].state === "yet") {
        this.todos[index].state = "done";
      } else {
        this.todos[index].state = "yet";
      }
    },
  },
  mounted() {
    this.$refs.writeArea.focus();
  },
};
</script>

<style></style>
