import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddLibrary from "components/AddLibrary";
import Library from "components/Library";
import LibrariesList from "components/LibrariesList";

function App() {
  return (
    <Router>
    <main className="flex flex-col min-h-screen">
      <nav className="shadow-lg border-t-4 border-blue-500">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-12">
            <div className="flex space-x-7">
                <Link to="/" className="flex items-center gap-x-2.5">
                  <h1 className="font-bold font-dosis">
                    JERALD
                    <span className="h-2 w-2 bg-cyan-500 inline-block ml-0  rounded-full"></span>
                    IO
                  </h1>
                  <span className="font-semibold text-gray-500 text-lg">Libraries</span>
                </Link>
            </div>
            <div className="flex items-center ">
              <input type="search" className="h-10 flex-auto px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
              <button className="h-10 px-6 py-2.5 bg-purple-600 text-white rounded-r-xl shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section>
        <Switch>
          <Route exact path={["/", "/libraries"]} component={LibrariesList} />
          <Route exact path="/add" component={AddLibrary} />
          <Route path="/libraries/:id" component={Library} />
        </Switch>
      </section>
    </main>
    </Router>
  );
}

export default App;
