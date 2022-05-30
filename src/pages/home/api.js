
import axios from 'axios';
export function getPosts() {
    axios.get('http://localhost:8800/api/users')
    .then(res => {
      const persons = res.data;
    //   this.setState({ persons });
        console.log(persons);
    })

  }