<template>
  <div id="app">
    <!-- 1. 导入模板 -->
    <section class="todoapp">
			<header class="header">
				<h1>Vue-todos</h1>
				<input class="new-todo" @keyup.enter="addTodo($event)" placeholder="What needs to be done?" autofocus>
			</header>
			<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox" :checked="$store.getters.isAllCheck" @change="changeTodoState($event)">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
					<li :class="{'completed': item.done, 'editing': $store.state.editing == item}" v-for="item in $store.getters.getTodoList" :key="item.id">
						<div class="view">
							<input class="toggle" type="checkbox" :checked="item.done" @change="changeTodo(item.id, $event)">
							<label @dblclick="editing(item)">{{ item.title }}</label>
							<button class="destroy" @click="deleteTodo(item.id)"></button>
						</div>
						<input class="edit" :value="item.title" @keyup.enter="saveEdit($event, item.id)" @blur="saveEdit($event, item.id)" @keyup.27="cancelSave($event)">
					</li>
				</ul>
			</section>
			<!-- This footer should be hidden by default and shown when there are todos -->
			<footer class="footer"  v-show="$store.getters.getTodosLength">
				<!-- This should be `0 items left` by default -->
				<span class="todo-count"><strong>{{ $store.getters.getNoDoneLength }}</strong> item left</span>
				<!-- Remove this if you don't implement routing -->
				<ul class="filters">
					<li>
						<a :class="{'selected': $store.state.visibility == 'all'}" href="#/">All</a>
					</li>
					<li>
						<a :class="{'selected': $store.state.visibility == 'active'}" href="#/active">Active</a>
					</li>
					<li>
						<a :class="{'selected': $store.state.visibility == 'completed'}" href="#/completed">Completed</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button class="clear-completed" @click="removeCompleted" v-show="$store.getters.getDoneLength">Clear completed</button>
			</footer>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<!-- Remove the below line ↓ -->
			<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
			<!-- Change this out with your name and url ↓ -->
			<p>Created by <a href="http://todomvc.com">you</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
</template>

<script>
// 安装导入相应的样式文件
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

export default {
  name: 'App',
  components: {

	},
	created() {
		// 页面刷新进来的时候,获取hash,并修改
		this.hashChange();
		// 页面之后刷新的话,动态监听hash值的变化
		window.onhashchange = this.hashChange;
	},
	updated() {
		// 存储数据
		window.localStorage.setItem("vue-todos", JSON.stringify(this.$store.state.todos));
	},
  methods: {
		// 添加todo
    addTodo(e) {
			let title = e.target.value;
			if(title.trim().length == 0){
				return;
			}
      this.$store.commit("addTodo", title);
      // 清空文本框
      e.target.value = "";
		},
		// 删除todo
		deleteTodo(id){
			this.$store.commit("deleteTodo", id);
		},
		// 修改tudo的状态
		changeTodo(id, e){
			this.$store.commit("changeTodo", {id, e});
		},
		// 编辑文本
		editing(item) {
			this.$store.commit("editing", item);
		},
		// 保存编辑
		saveEdit(e, id){
			this.$store.commit("saveEdit", {e, id});
		},
		// 取消保存
		cancelSave(e){
			this.$store.commit("cancelSave", e);
		},
		// 全选和取消全选
		changeTodoState(e){
			this.$store.commit("changeTodoState", e);
		},
		// 删除所有已经完成的项
		removeCompleted(){
			this.$store.commit("removeCompleted");
		},
		// 根据地址栏,修改store.js中state的visibity的属性
    hashChange() {
      const hash = window.location.hash.substr(1);
      if(hash == "/"){
        this.$store.commit("visibilityChange", "all");
      } else if (hash == "/active"){
				this.$store.commit("visibilityChange", "active");
			} else if (hash == "/completed"){
				this.$store.commit("visibilityChange", "completed");
			}
    }
  }
}
</script>

<style>

</style>
