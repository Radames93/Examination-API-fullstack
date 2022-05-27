import React,{useState, useEffect} from 'react'
import {fixUrl} from '../../utils'
import './Galleri.css'
import { Hamster } from '../../models/Hamster'
import axios from 'axios';

const Galleri = () => {

    const [maybeData, setMaybeData] = useState<any[]>([]);
    const [selectElement, setSelectElement] = useState<{}>({})
    const [name, setName] = useState<string>('')
	  const [age, setAge] = useState<string>('')
    const [favFood, setFavFood] = useState<string>('')
	  const [loves, setLoves] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [wins, setWins] = useState<string>('')
  	const [defeats, setDefeats] = useState<string>('')
    const [games, setGames] = useState<string>('')


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

    const refreshPage = () => {
      window.location.reload();
    }


	// Saknas: validering! Kontrollera om värdena är korrekta
	const hamster: Hamster = {
		name: name,
		age: Number(age),
    favFood: favFood,
    loves: loves,
    imgName: imgName,
    wins: Number(wins),
    defeats: Number(defeats),
    games:Number(games)
	}

  const nameIsValid = hamster.name !== ''
	const ageIsValid = hamster.age >= 0
  const favFoodIsValid = hamster.favFood !==''
  const lovesIsValid = hamster.loves !==''
  const imgNameisValid = hamster.imgName !==''
  const winsIsValid = hamster.wins >= 0
  const defeatsIsValid = hamster.defeats >= 0
  const gamesIsValid = hamster.games >= 0

	const formIsValid = nameIsValid && ageIsValid && favFoodIsValid
  && lovesIsValid && imgNameisValid && winsIsValid && defeatsIsValid
  && gamesIsValid

  const handleAddHamster = () => {
    const hamster: Hamster = {
      name: name,
      age: Number(age),
      favFood: favFood,
      loves: loves,
      imgName: imgName,
      wins: Number(wins),
      defeats: Number(defeats),
      games:Number(games)
    }

    axios.post(fixUrl('/hamsters'), hamster)
    .then((hamster) => {
      console.log(hamster)
    })
    .catch((error) => {
      console.log(error)
    })

    refreshPage();
}

const handleRemoveHamster = () => {
{maybeData.map((hamster) => (
  axios.delete(fixUrl(`/hamsters/${hamster.id}`))
  .then((hamster) => {
    console.log(hamster)
  })
  .catch((error) => {
    console.log(error)
  })
))
}
}

const handleClick = (hamster: any) => {
  setSelectElement(
    hamster)
}

const CloseClick = (hamster: any) => {
  setSelectElement('')
}


  return (
    <>
    <main className='card-grid'>
    {maybeData.map((hamster) => (
    <section className='card' key={hamster.name}>
        <p>{hamster.name}</p>
       <img className='image' src={fixUrl(`/img/${hamster.imgName}`)} />
       <button className='button' onClick={()=> handleClick(hamster)}>Show more info</button>
         {selectElement=== hamster ? (
           <>
           <div>
          <p>age: {hamster.age}</p>
          <p>favorite Food: {hamster.favFood}</p>
          <p>loves: {hamster.loves}</p>
           </div>
           <button onClick={CloseClick}>Close info</button>
           </>
         ) : ''}
        <button className='button' onClick={()=> handleClick(hamster)}>Remove hamster</button>
         {selectElement=== hamster ? (
           <button onClick={handleRemoveHamster}>Are you sure to remove it?</button>
         ) : ''}
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
        <input type="text" onChange={event => setName(event.target.value)}
				value={name} />
        <label>Age: </label>
        <input type="text" onChange={event => setAge(event.target.value)}
				value={age} />
        <label> Favorite food: </label>
        <input type="text" onChange={event => setFavFood(event.target.value)}
				value={favFood} />
        <label>What it loves:</label>
        <input type="text" onChange={event => setLoves(event.target.value)}
				value={loves} />
        <label>Image link: </label>
        <input type="text" onChange={event => setImgName(event.target.value)}
				value={imgName} />
        <label>Wins: </label>
        <input type="text" onChange={event => setWins(event.target.value)}
				value={wins} placeholder='0' />
        <label>Defeats: </label>
        <input type="text" onChange={event => setDefeats(event.target.value)}
				value={defeats} placeholder='0' />
        <label>Games: </label>
        <input type="text" onChange={event => setGames(event.target.value)}
				value={games} placeholder='0' />
        <button type="button" disabled={!formIsValid} onClick={handleAddHamster}> Ok add the hamster! </button>
      </form>
      </div>
     </footer>
       </>
  )
}

export default Galleri
