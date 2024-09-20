const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
};

export default function Profile() {
    return (
        <>
            <h1>{user.name}</h1>
            <img
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                    width: user.imageSize,
                    height: user.imageSize
                }}
            />
        </>
        // 在上面示例中，style={{}} 并不是一个特殊的语法，
        // 而是 style={ } JSX 大括号内的一个普通 {} 对象。当你的样式依赖于 JavaScript 变量时，你可以使用 style 属性。
    );
}
