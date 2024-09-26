import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Header() {
    return (_jsx("header", { children: _jsx("nav", { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "/", children: "Home" }) }), _jsx("li", { children: _jsx("a", { href: "/protected", children: "Contenido Protegido" }) }), _jsx("li", { children: _jsx("a", { href: "/logout", children: "Cerrar Sesi\u00F3n" }) }), " "] }) }) }));
}
export default Header;
