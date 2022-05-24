import {useState, useEffect} from 'react'
import {fixUrl} from '../../utils'
import './Galleri.css'
import { Hamster } from '../../models/Hamster'
import axios from 'axios';


const Galleri = () => {

    const [show, setShow] =  useState({});
    const [maybeData, setMaybeData] = useState<any[]>([]);

    useEffect(() => {
      fetchHamsters();
    }, []);

    const fetchHamsters = () => {
      axios
        .get(fixUrl('/hamsters'))
        .then((res) => {
          console.log(res);
          setMaybeData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };


  return (
    <>
    <main className='card-grid'>
    {maybeData.map((hamster) => (
    <section className='card' key={hamster.name}>
        <p>{hamster.name}</p>
       <img className='image' src={fixUrl(`/img/${hamster.imgName}`)} />
       <button className="button" onClick={() => setShow(!show)}>Show more info</button>
      {show &&
      <div>
        <p>hamster age: {hamster.age}</p>
        <p>hamster favorite food: {hamster.favFood}</p>
        <p>hamster lovs to: {hamster.loves}</p>
        <p>hamster wins: {hamster.wins}</p>
        <p>hamster defeats: {hamster.defeats}</p>
        <p> hamster games: {hamster.games}</p>
      </div>}
      <button>Ta bort</button>
		 </section>
     ))}
     </main>
     <footer>
       <div className="footer">
       <div className="section-footer">
       <h2>
         Our story:
         </h2>
         <p>
         Lorem ipsum dolor sit amet,
         consectetur adipiscing elit,
         sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua.
         Ut enim ad minim veniam, quis
         nostrud exercitation
         </p>
       </div>
       <div className="section-footer">
       <h2>
         Who speak about us:
         </h2>
         <p>
         ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu
           fugiat nulla pariatur.
         </p>
       </div>
     <form className="container">
       <h2>Add a new hamster</h2>
      <label>Name: </label>
        <input type="text" />
        <label>Age: </label>
        <input type="number" />
        <label> Favorite food: </label>
        <input type="text" />
        <label>What it loves:</label>
        <input type="text" />
        <label>Image link: </label>
        <input type="text" />
        <input type="submit" value="Skicka information" />
      </form>
      </div>
     </footer>
       </>
  )
}

export default Galleri
