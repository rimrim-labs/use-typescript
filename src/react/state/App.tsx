import React from 'react';
import AddColorForm from './AddColorForm';
import ColorList from './ColorList';
import data from './data/colors';
import ColorType from './common/types';

/**
 * 프로퍼티는 렌더링되면 변경 불가능하다.
 */
interface States {
  colors: ColorType[];
}

interface Props {
  totalStars: number;
}

class App extends React.Component<Props, States> {
  /**
   * 상태를 변경하면 페이지가 새로 렌더링된다.
   */
  state: Readonly<States>;

  constructor(props: Props) {
    super(props);
    this.state = {
      colors: data.colors,
    };

    this.rateColor = this.rateColor.bind(this);
  }

  rateColor(id: string, rating: number) {
    const colors = this.state.colors.map((color) =>
      color.id !== id
        ? color
        : {
            ...color,
            rating,
          },
    );
    this.setState({ colors });
  }

  render() {
    const { totalStars } = this.props;
    const { colors } = this.state;
    const { rateColor } = this;
    return (
      <div className="app">
        <AddColorForm />
        <ColorList totalStars={totalStars} colors={colors} onRate={rateColor} />
      </div>
    );
  }
}

export default App;
