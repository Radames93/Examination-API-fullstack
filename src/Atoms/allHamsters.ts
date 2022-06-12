import { atom } from "recoil";
import { Hamster } from "../models/Hamster";

//Gallery State
const allHamsters = atom<Hamster[]>({
	key: 'allHamsters',
	default: []
})



export default allHamsters
