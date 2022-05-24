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
       <p>
       <button onClick={() => setShow(!show)}>Show more info</button>
      {show &&
      <div>
        <p>hamster age: {hamster.age}</p>
        <p>hamster favorite food: {hamster.favFood}</p>
        <p>hamster lovs to: {hamster.loves}</p>
        <p>hamster wins: {hamster.wins}</p>
        <p>hamster defeats: {hamster.defeats}</p>
        <p> hamster games: {hamster.games}</p>
      </div>}
      </p>
		 </section>
     ))}
    </main>
    </>
  )
}

export default Galleri
