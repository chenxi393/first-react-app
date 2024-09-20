// 组件间共享数据
import { useState } from 'react';
import MyButton from './button';
function MyButtons() {
    const [count, setCount] = useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    return (
        <div>
            <h1>Counters that update together</h1>
            {/* 使用这种方式传递的信息被称作 prop。 prop 的接受变量名必须一致 */}
            <MyButton count={count} onClick={handleClick} />
            <MyButton count={count} onClick={handleClick} />
        </div>
    );
}

export default MyButtons;