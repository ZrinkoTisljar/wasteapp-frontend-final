/**
 * Ulazna točka React aplikacije.
 *
 * Ovdje se inicijalizira ReactDOM i montira glavna App komponenta
 * unutar HTML elementa s id="root". Aplikacija je omotana u
 * BrowserRouter kako bi se omogućilo korištenje React Routera
 * (navigacija, rute, preusmjeravanja).
 *
 * StrictMode se koristi u razvojnom okruženju za dodatne provjere
 * i upozorenja, što pomaže u otkrivanju potencijalnih problema.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
