import {useState, useEffect} from 'react'
import {fixUrl} from '../../utils'
import axios from 'axios'
import { Hamster } from '../../models/Hamster'
import './Rösta.css'


const Rösta = () => {
  const [firstHamster, setFirstHamster] = useState<any>({});
  const [secondHamster, setSecondHamster] = useState<any>({});
    const [name, setName] = useState<string>('')
	  const [age, setAge] = useState<string>('')
    const [favFood, setFavFood] = useState<string>('')
	  const [loves, setLoves] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
    const [wins, setWins] = useState<string>('')
  	const [defeats, setDefeats] = useState<string>('')
    const [games, setGames] = useState<string>('')

    useEffect(() => {
      fetchHamster();
      fetchanotherHamster()
    }, []);

    const fetchHamster = () => {
      axios
        .get(fixUrl('/hamsters/random'))
        .then((res) => {
          console.log(res);
          setFirstHamster(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchanotherHamster = () => {
      axios
        .get(fixUrl('/hamsters/random'))
        .then((res) => {
          console.log(res);
          setSecondHamster(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // Onclick Funktion för att välja hamster
    const chooseHamster1 = () => {
      firstHamster.wins = firstHamster.wins + 1;
      firstHamster.games = firstHamster.games + 1
      console.log(firstHamster.wins, firstHamster.games)
      secondHamster.defeats = secondHamster.defeats + 1;
      secondHamster.games = secondHamster.games + 1
      console.log(secondHamster.defeats, secondHamster.games)
      ModifyFirstHamster()
      ModifySecondHamster();
      fetchanotherHamster();
    }

    // Onclick Funktion för att välja hamster
    const chooseHamster2 = () => {
      secondHamster.wins = secondHamster.wins + 1;
      secondHamster.games = secondHamster.games + 1
      console.log(secondHamster.wins, secondHamster.games)
      firstHamster.defeats = firstHamster.defeats + 1;
      firstHamster.games = firstHamster.games + 1
      console.log(firstHamster.defeats, firstHamster.games)
      ModifyFirstHamster()
      ModifySecondHamster();
      fetchHamster();
    }

    // Interface hamster
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

    // Function för att modifiera wins, defeats och games + PUT request firstHamster
    const ModifyFirstHamster = () => {
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

      axios.put(fixUrl(`/hamsters/${firstHamster.id}`),
      {wins: firstHamster.wins,
      defeats: secondHamster.defeats,
      games:firstHamster.games,
    })
      .then((hamster) => {
        console.log(hamster)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Function för att modifiera wins, defeats och games + PUT request secondHamster
  const ModifySecondHamster = () => {
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

    axios.put(fixUrl(`/hamsters/${secondHamster.id}`),
    {wins: secondHamster.wins,
    defeats: firstHamster.defeats,
    games: secondHamster.games,
  })
    .then((hamster) => {
      console.log(hamster)
    })
    .catch((error) => {
      console.log(error)
    })
}


  return (
    <>
    <h1>Choose who is the cutest of them</h1>
    <main className="hamster-grid">
    <section className="card">
         <img onClick={chooseHamster1} className='image' src={fixUrl(`/img/${firstHamster.imgName}`)} />
        <p>Name: {firstHamster.name}</p>
  </section>
  <section className="card">
  <img onClick={chooseHamster2} className='image' src={fixUrl(`/img/${secondHamster.imgName}`)} />
 <p>Name: {secondHamster.name}</p>
</section>
</main>
</>

  )
}

export default Rösta
