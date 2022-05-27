import { useEffect, useState } from "react";
import axios from 'axios'
import { fixUrl } from "../utils";


const Start = () => {

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
  <div className="startSida">
    <h1>Välkommen till HamsterSmash</h1>
    <p> Om du klickar i rösta länk för du rösta vilken
      hamster är sötaste.
    </p>
    <p>Vår mvh (Most valuable hamster)</p>

  </div>
  )
}

export default Start
