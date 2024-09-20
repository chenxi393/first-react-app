//  条件渲染
let content;
if (isLoggedIn) {
    content = <AdminPanel />;
} else {
    content = <LoginForm />;
}

<div>
    {isLoggedIn ? (
        <AdminPanel />
    ) : (
        <LoginForm />
    )}
</div>

return (
    <div>
        {content}
    </div>
);

