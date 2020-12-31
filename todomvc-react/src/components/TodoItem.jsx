import React from 'react';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null
    };
  }

  render() {
    return <li className={[this.props.done ? "completed" : null, this.state.editing == this.props.id ? "editing" : null].join(" ")}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.done}
          onChange={this.changeDone} />
        <label onDoubleClick={this.editing}>{this.props.title}</label>
        <button className="destroy" onClick={this.delTodo}></button>
      </div>
      <input className="edit" defaultValue={this.props.title} onKeyUp={this.saveEdit} />
    </li>
  }


  // 调用父组件传过来的方法,修改id对应的状态
  changeDone = (e) => {
    this.props.changeDone(this.props.id, e.target.checked)
  }
  // 调用父组件的方法,删除todo
  delTodo = () => {
    this.props.delTodo(this.props.id);
  }
  // 调用父组件方法, 显示输入框
  changeTitle = (e) => {
    this.props.changeTitle(this.props.id, e.target.value);
  }
  // 修改editing 为当前的todo的id
  editing = () => {
    this.setState({
      editing: this.props.id
    })
  }
  // 当输入时,按下enter 保存
  saveEdit = (e) => {
    if (e.keyCode == 13) {
      this.props.saveEdit(this.props.id, e.target.value);
      this.setState({
        editing: null
      })
    }
  }
}