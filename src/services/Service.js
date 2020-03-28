import axios from 'axios';
// import { config } from '../constant';
// import { instance } from './interceptor.service';


class Service {
  
  getAll(query) {
      axios
            .get(query)
            .then((response) => {
                return response.data;
        });

  }
}

export default Service;
