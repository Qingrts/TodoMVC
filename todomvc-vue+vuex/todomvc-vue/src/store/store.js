export default {
  state: {
    todos: JSON.parse(window.localStorage.getItem("vue-todos") || "[]"),    // 从本地获取todos
    editing: {},      // 表示当前修改的是哪个todo
    visibility: "all"  // 表示当前的列表
  },
  mutations: {
    // 添加todo
    addTodo(state, title) {
      state.todos.push({id: Math.random() * 10, 'title': title, done: false});
    },
    // 删除todo
    deleteTodo(state, id) {
      state.todos.forEach((t, i) => {
        if(t.id == id){
          state.todos.splice(i, 1);
          return;
        }
      })
    },
    // 修改todo的状态
    changeTodo(state, {id, e}) {
      state.todos.forEach(t => {
        if(t.id == id){
          t.done = e.target.checked
          return;
        }
      })
    },
    // 修改内容
    editing(state, item){
      state.editing = item;
    },
    // 保存修改的内容
    saveEdit(state, {e, id}){
      let title = e.target.value;
      state.todos.forEach(t => {
        if(t.id == id){
          t.title = title;
          state.editing = {};
          return;
        }
      })
    },
    // 取消保存 
    cancelSave(state, e){
      // 有的地方会有一些bug
      e.target.value = state.editing.title;
      state.editing = {};
    },
    // 全选,取消全选
    changeTodoState(state, e) {
      state.todos.forEach(t => t.done = e.target.checked);
    },
    // 删除所有已经完成的项
    removeCompleted(state) {
      state.todos = state.todos.filter(t => !t.done);
    },
    // 修改state中visibility为参数的值
    visibilityChange(state, val) {
      state.visibility = val;
    }
  },
  getters: {
    // 控制状态栏是否显示
    getTodosLength(state) {
      return state.todos.length;
    },
    // 控制全选按钮的状态
    isAllCheck(state) {
      return state.todos.every(t => t.done);
    },
    // 获取未完成的项数
    getNoDoneLength(state) {
      return state.todos.filter(t => !t.done).length;
    },
    // 获取已经完成的项数
    getDoneLength(state) {
      return state.todos.filter(t => t.done).length;
    },
    // 点击按钮获取对应的列表
    getTodoList(state) {
      if(state.visibility == "all"){
        return state.todos;
      } else if (state.visibility == "active"){
        return state.todos.filter(t => !t.done);
      } else if (state.visibility == "completed"){
        return state.todos.filter(t => t.done);
      }
    }
  },
  actions: {

  },
}