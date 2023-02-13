import { faker } from '@faker-js/faker';
import { sample } from 'lodash';


const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  status: sample(['active', 'deactivated', 'suspended']),
  role: sample([
    'Administrator',
    'Manager',
    'Accountant',
    'Administrator',
    'Manager',
    'Accountant',
  
  ]),
}));

export default users;