import axios from "axios";


const instance =axios.create({
    baseURL:"https://api.themoviedb.org/3",
});
//here if we do instance.get(foobar.js) then it will append and give url as https://api.themoviedb.org/3/foobar.js

export default instance;