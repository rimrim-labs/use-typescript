import React from 'react';

const DEFAULT_COLOR = '#000000';

interface States {
  color: string;
  title: string;
}

interface Props {
  onSubmit: (title: string, color: string) => any;
}

export default class AddColorForm extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      color: DEFAULT_COLOR,
      title: '',
    };

    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submit(event: React.FormEvent<HTMLFormElement>) {
    const { onSubmit } = this.props;
    const { color, title } = this.state;

    event.preventDefault();
    onSubmit(title, color);
    this.state = {
      color: DEFAULT_COLOR,
      title: '',
    };
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    this.setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  render() {
    const { submit, onChange } = this;
    return (
      <form onSubmit={submit}>
        <input type="text" name="title" placeholder="색 이름..." onChange={(event) => onChange(event)} required />
        <input type="color" name="color" onChange={(event) => onChange(event)} required />
        <button>추가</button>
      </form>
    );
  }
}
