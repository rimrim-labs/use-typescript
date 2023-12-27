import React from 'react';

export default class AddColorForm extends React.Component<any, any> {
  titleInput: React.RefObject<HTMLInputElement>;

  colorInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    // create a ref to store the textInput DOM element
    this.titleInput = React.createRef();
    this.colorInput = React.createRef();
  }

  submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (this.colorInput.current) {
      this.colorInput.current.value = '#000000';
    }

    if (this.titleInput.current) {
      this.titleInput.current.value = '';
      this.titleInput.current.focus();
    }
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" placeholder="색 이름..." ref={this.titleInput} required />
        <input type="color" ref={this.colorInput} required />
        <button>추가</button>
      </form>
    );
  }
}
