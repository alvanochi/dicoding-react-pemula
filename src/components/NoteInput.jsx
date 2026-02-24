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
    const htmlBody = event.target.innerHTML;
    this.setState({ body: htmlBody });
    if (htmlBody.length > 10) {
      this.setState({ isBodyError: false });
    }
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.body.length >= 0 && this.state.body.length < 10) {
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
    // The contentEditable div isn't cleared here natively but it won't matter as we navigate away.
  }

  render() {
    const remainingChars = 50 - this.state.title.length;

    return (
      <div className="note-input" data-testid="note-input">
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
          <div
            className="note-input__body"
            data-placeholder="Tuliskan catatanmu di sini ..."
            contentEditable
            onInput={this.onBodyChangeEventHandler}
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
