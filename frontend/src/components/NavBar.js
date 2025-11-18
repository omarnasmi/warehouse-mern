const NavBar = () => {
    return (
        <header>
            <div className="logo">
                <nav>
                    <h2>Warehouse Management System</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/login">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;