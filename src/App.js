import logo from './logo.svg';
import './style/App.css';
import MyButton from './component/button';
import MyButtons from './component/buttons';
import Profile from './component/style_data';
import ShoppingList from './component/list';
import Game from './component/game';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VideoFeed from './component/VideoFeed';

function Home() {
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

      <Game />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/video-feed">Video Feed</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video-feed" element={<VideoFeed />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;

// export 关键字用于从一个模块中导出函数、对象或原始值，使得它们可以在其他模块中使用
// 默认导出允许导入时可以使用任何名称来引用这个导出，而不需要知道原始名称。 一个模块只有一个默认导出