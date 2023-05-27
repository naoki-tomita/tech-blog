import { Component, h, render } from "zheleznaya";
import { Link, Router } from "./Store";
import { ListPage } from "./pages/List";
import { ArticlePage } from "./pages/Article";

const App: Component = () => {
  return (
    <div>
      <header class="container">
        <h1><Link href="/">Tech blog</Link></h1>
      </header>
      <main class="container">
        <Router routes={{
          "/": () => <ListPage/>,
          "/:id": ({id}) => <ArticlePage id={id} />,
        }}/>
      </main>
      <footer class="container">
        <h6>by kojiro.ueda</h6>
      </footer>
    </div>
  );
}

render(<App/>, document.getElementById("app")!);
