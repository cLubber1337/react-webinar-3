import {createRoot} from 'react-dom/client';
import Store from "./store";
import {StoreContext} from "./store/context";
import {Router} from "./routes/router";
import LanguageProvider from "./translation/language-provider";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <LanguageProvider>
      <Router/>
    </LanguageProvider>
  </StoreContext.Provider>
);
