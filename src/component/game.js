import { useState } from 'react';
import '../style/game.css';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); //  数组嵌套
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // squares 数组元素  move 索引
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    // <li key={user.id}>
    // {user.name}: {user.taskCount} tasks left
    // </li>
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

// 如果子组件需要通信 或者父组件需要子组件的状态 可以 把状态提升到父组件
function Board({ xIsNext, squares, onPlay }) {
  // 这其实就是作为闭包传进去 JavaScript 支持闭包，
  // 这意味着内部函数（例如 handleClick）可以访问外部函数（例如 Board）中定义的变量和函数
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // 不变性  这里时创造了一个squares数组副本 squares还是不变
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  let res = calculateWinner(squares);
  let highlight = res ? res.line : []
  let status;
  if (res != null) {
    status = "Winner: " + res.winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  // handleClick(0)
  // 行不通的原因 是因为 渲染组件时 handleClick（0） 调用 改变状态 又要渲染Board 死循环了
  // Too many re-renders. React limits the number of renders to prevent an infinite loop.
  // () => handleClick(0) 是一个箭头函数，它是定义函数的一种较短的方式。单击方块时，=>“箭头”之后的代码将运行，调用 handleClick(0)。
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <MySquare value={squares[0]} onSquareClick={() => handleClick(0)} highlight={highlight.includes(0)} />
        <MySquare value={squares[1]} onSquareClick={() => handleClick(1)} highlight={highlight.includes(1)} />
        <MySquare value={squares[2]} onSquareClick={() => handleClick(2)} highlight={highlight.includes(2)} />
      </div>
      <div className="board-row">
        <MySquare value={squares[3]} onSquareClick={() => handleClick(3)} highlight={highlight.includes(3)} />
        <MySquare value={squares[4]} onSquareClick={() => handleClick(4)} highlight={highlight.includes(4)} />
        <MySquare value={squares[5]} onSquareClick={() => handleClick(5)} highlight={highlight.includes(5)} />
      </div>
      <div className="board-row">
        <MySquare value={squares[6]} onSquareClick={() => handleClick(6)} highlight={highlight.includes(6)} />
        <MySquare value={squares[7]} onSquareClick={() => handleClick(7)} highlight={highlight.includes(7)} />
        <MySquare value={squares[8]} onSquareClick={() => handleClick(8)} highlight={highlight.includes(8)} />
      </div>
    </>
  );
}

// 使用 props(property) 将每个方块应有的值从父组件（Board）传递到其子组件（Square）
function MySquare({ value, onSquareClick, highlight }) {
  // 由于 state 对于定义它的组件是私有的 你不能直接从 Square 更新 Board 的 state
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ backgroundColor: highlight ? 'yellow' : 'white' }}>
      {value}
    </button>
  );
}

// useState 的特殊函数，可以从组件中调用它来让它“记住”一些东西

/*
状态提升 
目前，每个 Square 组件都维护着游戏 state 的一部分。要检查井字棋游戏中的赢家，Board 需要以某种方式知道 9 个 Square 组件中每个组件的 state。

你会如何处理？起初，你可能会猜测 Board 需要向每个 Square“询问”Square 的 state。尽管这种方法在 React 中在技术上是可行的，但我们不鼓励这样做，因为代码变得难以理解、容易出现错误并且难以重构。相反，最好的方法是将游戏的 state 存储在 Board 父组件中，而不是每个 Square 中。Board 组件可以通过传递一个 props 来告诉每个 Square 显示什么，就像你将数字传递给每个 Square 时所做的那样。

要从多个子组件收集数据，或让两个子组件相互通信，请改为在其父组件中声明共享 state。父组件可以通过 props 将该 state 传回给子组件。这使子组件彼此同步并与其父组件保持同步。

重构 React 组件时，将状态提升到父组件中很常见。

让我们借此机会尝试一下。编辑 Board 组件，使其声明一个名为 squares 的 state 变量，该变量默认为对应于 9 个方块的 9 个空值数组：

*/