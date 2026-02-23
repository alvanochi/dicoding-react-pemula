import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      isBodyError: false
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const title = event.target.value;
    if (title.length <= 50) {
      this.setState({ title });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value });
    if (this.state.body.length > 10) {
      this.setState({ isBodyError: false });
    }
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.body.length > 0 && this.state.body.length < 10) {
      this.setState({ isBodyError: true });
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    this.setState({
      title: '',
      body: ''
    });
  }

  render() {
    const remainingChars = 50 - this.state.title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {this.state.isBodyError && (
          <p className="note-input__feedback--error">
            Isi catatan minimal harus 10 karakter
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <p
            className="note-input__title__char-limit"
            data-testid="note-input-title-remaining"
          >
            {remainingChars} karakter tersisa
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
