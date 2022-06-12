import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../../Atoms/allHamsters";
import { Hamster } from "../../models/Hamster";
import "../Startsida/Startsida.css"
import { fixUrl } from "../../utils";

const Start = () => {
  const [data, setData] = useRecoilState<[] | Hamster[]>(allHamsters);
  const [cutest, setCutest] = useState<null | Hamster>(null);

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/"));
      const apiData: any = await response.json();
      console.log("apiData", apiData);
      setData(apiData as Hamster[]);
    }
    getData();
    console.log(data);
  }, []);

  useEffect(() => {
    sendRequest(setCutest);
  }, []);

  return (
    <section className="">
      <header className="">
        <h1> Welcome </h1>
        <p>Are you ready to choose who is the cutest?</p>
      </header>
      <main className="">
        <article>
          <h3> Instructions </h3>
          <p>
            Open the rösta page of the website in order to vote
            which hamster is the cutest.
          </p>
          <p>
          Do you want add an hamster? Go to the bottom of the
          galleri page and add it.
          </p>
          <h3>Enjoy the game! </h3>
        </article>
        <article className='card-grid'>
        {cutest
          ? cutest.map((hamster) => (
              <section className='card' key={Math.random() + hamster.id}>
                <img
                  src={fixUrl(`/img/${hamster.imgName}`)}
                  alt={hamster.name}
                  className='image'
                />
                <div>
                  <h2>{hamster.name}</h2>
                  <p className="paragraph" >
                    Is our mvh (most valuable hamster)... but you can
                    make things change with your vote!
                    Wins: {hamster.wins}!
                    </p>
                </div>
              </section>
            ))
          : "Loading"}
          </article>
      </main>
    </section>
  );
};

async function sendRequest(setCutest: any) {
  try {
    const response = await fetch(fixUrl("/hamsters/cutest"));
    const data = await response.json();
    setCutest(data);
  } catch (error) {
    console.log(error);
  }
}

export default Start;

function data(data: any) {
  throw new Error("Function not implemented.");
}
