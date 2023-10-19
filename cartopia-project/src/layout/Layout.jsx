import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = (props) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="content">{props.children}</main>
      <Footer />
    </div>
  );
};
