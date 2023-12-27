import { v4 } from 'uuid';
import Color from '../common/types';

const data: { colors: Color[] } = {
  colors: [
    {
      id: v4(),
      title: '해질녘 바다',
      color: '#00c4e2',
      rating: 5,
    },
    {
      id: v4(),
      title: '잔디',
      color: '#26ac56',
      rating: 3,
    },
    {
      id: v4(),
      title: '밝은 빨강',
      color: '#ff0000',
      rating: 0,
    },
  ],
};

export default data;
