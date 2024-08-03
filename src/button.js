// 嵌入组件 响应事件  更新事件（记录点击的次数）
// 搞成通用的组件
import { useState } from 'react';
function MyButton({ count, onClick }) {
    function handleClick() {
        // alert('You clicked me!');
        son_setCount(son_count + 1);
    }

    // 但按照惯例会像 [something, setSomething] 这样为它们命名。
    const [son_count, son_setCount] = useState(0);
    // 也就是说 一个组件只能有一个状态
    // 响应影响两个组件的状态 必须提取为一个组件
    // 以 use 开头的函数被称为 Hook
    // 如果你想在一个条件或循环中使用 useState，请提取一个新的组件并在组件内部使用它。

    return (
        <button onClick={onClick ? onClick : handleClick}>
            Clicked {count ? count : son_count} times
        </button>
    );
}

export default MyButton;