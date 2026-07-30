/**
 * Komponenta za prikaz poruka o grešci ili uspjehu.
 *
 * - Ako postoji error → prikazuje crvenu poruku.
 * - Ako postoji success → prikazuje zelenu poruku.
 * - Ako nema poruka → ne prikazuje ništa (null).
 *
 * Koristi se u formama za prijavu, registraciju i ostalim mjestima
 * gdje backend vraća statusne poruke.
 */
export default function Message({ error, success }) {

  // Prikaz poruke o grešci
  if (error) {
    return <div className="message error">{error}</div>
  }

  // Prikaz poruke o uspjehu
  if (success) {
    return <div className="message success">{success}</div>
  }

  // Ako nema poruka → ne prikazuje ništa
  return null
}
