<template>
  <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <transition name="fade">
          <div class="write add" v-if="writeState === 'add'" key="add">
            <!-- 등록 -->
            <input
              ref="writeArea"
              type="text"
              v-model="addItemText"
              @keyup.enter="addItem"
            />
            <button class="btn add" @click="addItem" key="edit">Add</button>
          </div>
          <div class="write edit" v-else>
            <!-- 수정 -->
            <input
              ref="writeArea"
              type="text"
              v-model="editItemText"
              @keyup.enter="editSave"
            />
            <button class="btn add" @click="editSave">Save</button>
          </div>
        </transition>
        <ul class="list" ref="list">
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
                <a href="" @click.prevent="editShow(i)">Edit</a>
                <a href="" @click.prevent="del(i)">Del</a>
              </b>
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
// import { doesNotMatch } from "assert";
import { db } from "../firebase/db";

export default {
  data() {
    return {
      writeState: "add",
      addItemText: "",
      editItemText: "",
      crrEditItem: "",
      todos: [],
    };
  },
  methods: {
    addItem() {
      if (!this.addITemText === "") return;
      db.collection("todos")
        .add({
          text: this.addItemText,
          state: "yet",
        })
        .then((sn) => {
          db.collection("todos").doc(sn.id).update({
            id: sn.id,
          });
        });
      // this.todos.push({ text: this.addItemText, state: "yet" });
      this.addItemText = "";
    },
    checkItem(index) {
      if (this.todos[index].state === "yet") {
        this.todos[index].state = "done";
      } else {
        this.todos[index].state = "yet";
      }
    },
    editShow(index) {
      this.crrEditItem = index;
      this.writeState = "edit";
      this.editItemText = this.todos[index].text;
      this.$refs.list.childen[index].className = "editing";
      console.log(this.$refs.list.children[index]);
    },
    editSave() {
      this.writeState = "add";
      // this.todos[this.crrEditItem].text = this.editItemText;
      db.collection("todos").doc(this.todos[this.crrEditItem].id).update({
        text: this.editItemText,
      });
      this.writeState = "add";
      this.$refs.list.childen[this.crrEditItem].className = "";
    },
    del(index) {
      // this.todos.splice(index, 1);
      db.collection("todos").doc(this.todos[index].id).delete();
    },
  },
  mounted() {
    this.$refs.writeArea.focus();
    db.collection("todos")
      .get()
      .then((result) => {
        result.forEach((doc) => {
          console.log(doc.data());
          this.todos.push(doc.data());
        });
      });
  },
  firestore: {
    todos: db.collection("todos"),
  },
};
</script>

<style></style>
