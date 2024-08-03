import logo from './logo.svg';
import './style/App.css';
import MyButton from './button';
import MyButtons from './buttons';
import Profile from './style_data';
import ShoppingList from './list';

function App() {
  return (
    <div className="App">
      {/* 使用class name 来指定一个 CSS 的 class*/}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MyButton />
        <MyButton />
        <MyButtons />
        {/* 每个组件的状态是不一致的 分别计数 */}
      </header>

      <Profile />
      <ShoppingList />
    </div>
  );
}

export default App;

// export 关键字用于从一个模块中导出函数、对象或原始值，使得它们可以在其他模块中使用
// 默认导出允许导入时可以使用任何名称来引用这个导出，而不需要知道原始名称。 一个模块只有一个默认导出