import React from 'react';

import TodoItem from "./components/TodoItem.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: JSON.parse(window.localStorage.getItem("react-todos") || "[]"),
      visibility: "all"
    };
  }

  // 添加todo
  addTodo = (e) => {
    if (e.keyCode != 13) {
      return;
    }
    let title = e.target.value;
    e.target.value = "";
    let arr = this.state.todos;
    arr.push({ id: Math.random() * 10, title: title, done: false });
    this.setState({
      todos: arr
    });
  }
  // 删除todo
  delTodo(id) {
    let arr = this.state.todos;
    arr.forEach((item, i) => {
      if (item.id == id) {
        arr.splice(i, 1);
      }
    })
    this.setState({
      todos: arr
    });
  }
  // 修改某一项的状态
  changeDone(id, checked) {
    let arr = this.state.todos;
    arr.forEach(item => {
      if (item.id == id) {
        item.done = checked;
        return;
      }
    });
    this.setState({
      todos: arr
    });
  }
  // 修改某一项的内容
  changeTitle(id, title) {
    let arr = this.state.todos;
    arr.forEach(item => {
      if (item.id == id) {
        item.title = title;
      }
    });
    this.setState({
      todos: arr
    });
  }
  // 全选或取消全选
  changeAllDone(e) {
    let arr = this.state.todos;
    arr.forEach(item => {
      item.done = e.target.checked;
    });
    this.setState({
      todos: arr
    })
  }
  // 遍历 todos,让 全选按钮 根据 todos 改变
  get allIsChecked() {
    return this.state.todos.every(item => item.done);
  }
  // 获取未完成的项数
  get noChecked() {
    return this.state.todos.filter(item => !item.done).length;
  }
  // 删除已经完成的项
  delAllDone = () => {
    let arr = this.state.todos.filter(item => !item.done);
    this.setState({
      todos: arr
    })
  }
  // 保存修改的内容
  saveEdit = (id, title) => {
    let arr = this.state.todos;
    arr.forEach(item => {
      if (item.id == id) {
        item.title = title;
        return
      }
    });
    this.setState({
      todos: arr
    })
  }
  // 点击对应的按钮显示对应的 列表 
  // all 显示所有
  // active 显示未完成的
  // completed 显示完成的

  // 设置 get 获取对应的列表
  get getList() {
    if (this.state.visibility == "all") {
      return this.state.todos;
    } else if (this.state.visibility == "active") {
      return this.state.todos.filter(item => !item.done);
    } else if (this.state.visibility == "completed") {
      return this.state.todos.filter(item => item.done);
    }
  }
  get todosLength() {
    return this.state.todos.length;
  }
  // 点击修改visibility显示对应的列表
  changeVisibility(val) {
    this.setState({
      visibility: val
    })
  }
  // 监听浏览器地址的变化
  hashChange = () => {
    const hash = window.location.hash.substr(2);
    if (hash == "") {
      this.setState({
        visibility: "all"
      });
    } else if (hash == "active") {
      this.setState({
        visibility: "active"
      });
    } else if (hash == "completed") {
      this.setState({
        visibility: "completed"
      });
    }
  }
  componentDidMount() {
    this.hashChange();
    window.onhashchange = this.hashChange;
  }
  componentDidUpdate() {
    window.localStorage.setItem("react-todos", JSON.stringify(this.state.todos));
  }


  render() {
    return <div>
      <section className="todoapp">
        <header className="header">
          <h1>react-todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" onKeyUp={this.addTodo} />
        </header>

        <section className="main">
          <input id="toggle-all" className="toggle-all" checked={this.allIsChecked} type="checkbox" onChange={this.changeAllDone.bind(this)} />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.getList.map((item, i) => {
              return <TodoItem {...item}
                key={i}
                changeDone={this.changeDone.bind(this)}
                delTodo={this.delTodo.bind(this)}
                changeTitle={this.changeTitle.bind(this)}
                saveEdit={this.saveEdit}
              ></TodoItem>
            })}
          </ul>
        </section>

        {
          // 条件判断,如果todos为空的话,状态栏也隐藏
          this.todosLength > 0 ?
            <footer className="footer" >
              <span className="todo-count"><strong>{this.noChecked}</strong> item left</span>
              <ul className="filters">
                <li>
                  <a className={this.state.visibility == "all" ? "selected" : null} onClick={this.changeVisibility.bind(this, "all")} href="#/">All</a>
                </li>
                <li>
                  <a className={this.state.visibility == "active" ? "selected" : null} href="#/active" onClick={this.changeVisibility.bind(this, "active")}>Active</a>
                </li>
                <li>
                  <a className={this.state.visibility == "completed" ? "selected" : null} href="#/completed" onClick={this.changeVisibility.bind(this, "completed")}>Completed</a>
                </li>
              </ul>
              <button className="clear-completed" onClick={this.delAllDone}>Clear completed</button>
            </footer>
            :
            null
        }
      </section>
    </div>
  }
}