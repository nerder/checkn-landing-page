import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

export default class FormEmail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log("called")
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    console.log("here")
    addToMailchimp(this.state.value)
      .then(data => {
        this.setState({ value: "" })
        // I recommend setting data to React state
        // but you can do whatever you want (including ignoring this `then()` altogether)
        console.log(data)
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
        // see below for how to handle errors
      })
    event.preventDefault()
  }

  render() {
    return (
      <React.Fragment>
        <style
          dangerouslySetInnerHTML={{
            __html: `
        .c-checkbox {
    display: none;
  }
  
  .c-checkbox:checked + .c-formContainer .c-form {
    width: 37.5em;
  }
  .c-checkbox:checked + .c-formContainer .c-form__toggle {
    visibility: hidden;
    opacity: 0;
    transform: scale(0.7);
  }
  .c-checkbox:checked + .c-formContainer .c-form__input,
  .c-checkbox:checked + .c-formContainer .c-form__buttonLabel {
    transition: 0.2s 0.1s;
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
  
  .c-checkbox:not(:checked) + .c-formContainer .c-form__input:required:valid ~ .c-form__toggle::before, .c-checkbox:checked + .c-formContainer .c-form__input:required:valid ~ .c-form__toggle::before {
    content: 'Thank You!';
  }
  .c-checkbox:not(:checked) + .c-formContainer .c-form__input:required:valid ~ .c-form__toggle {
    pointer-events: none;
    cursor: default;
  }
  
  .c-formContainer,
  .c-form,
  .c-form__toggle {
    width: 20em;
    height: 6.25em;
  }
  
  .c-formContainer {
    position: relative;
    font-weight: 700;
    transform: scale(0.6);
  }
  
  .c-form,
  .c-form__toggle {
    position: absolute;
    border-radius: 6.25em;
    background-color: #ffffff;
    transition: 0.2s;
  }
  
  .c-form {
    left: 50%;
    transform: translateX(-50%);
    padding: 0.625em;
    box-sizing: border-box;
    box-shadow: 0 0.125em 0.3125em rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
  }
  
  .c-form__toggle {
    color: #3070ab;
    top: 0;
    cursor: pointer;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .c-form__toggle::before {
    font-size: 1.75em;
    content: attr(data-title);
  }
  
  .c-form__input,
  .c-form__button {
    font: inherit;
    border: 0;
    outline: 0;
    border-radius: 5em;
    box-sizing: border-box;
  }
  
  .c-form__input,
  .c-form__buttonLabel {
    font-size: 1.75em;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.7);
    transition: 0s;
  }
  
  .c-form__input {
    color: #b8dffd;
    height: 100%;
    width: 100%;
    padding: 0 0.714em;
  }
  .c-form__input::placeholder {
    color: currentColor;
  }
  .c-form__input:required:valid {
    color: #3070ab;
  }
  .c-form__input:required:valid + .c-form__buttonLabel {
    color: #ffffff;
  }
  .c-form__input:required:valid + .c-form__buttonLabel::before {
    pointer-events: initial;
  }
  
  .c-form__buttonLabel {
    color: #81c4f8;
    height: 100%;
    width: auto;
  }
  .c-form__buttonLabel::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    cursor: pointer;
  }
  
  .c-form__button {
    color: inherit;
    padding: 0;
    height: 100%;
    width: 5em;
    background-color: #3070ab;
  }
        `,
          }}
        />
        <input className="c-checkbox" type="checkbox" id="checkbox" />
        <div className="c-formContainer">
          <form className="c-form" onSubmit={this.handleSubmit}>
            <input
              className="c-form__input"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Email Address"
              type="email"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
              required
            />
            <label className="c-form__buttonLabel" htmlFor="checkbox">
              <button
                className="c-form__button"
                type="button"
                onClick={this.handleSubmit}
              >
                Send
              </button>
            </label>
            <label
              className="c-form__toggle"
              htmlFor="checkbox"
              data-title="Notify me"
            />
          </form>
        </div>
      </React.Fragment>
    )

    // return (
    //   <form >
    //     <input class="email-input" name="email" value={this.state.value} onChange={this.handleChange} type="email" placeholder="Email Address" />
    //     <input class="notify-button" type="submit" value="Notify me" />
    //   </form>
    // )
  }
}
