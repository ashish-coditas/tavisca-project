import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('my-form-input-component')
export class MyFormInputComponent extends LitElement {
  value: string;
  inputType: string;
  disabled: boolean;
  inputValue: string;
  textId: string;

  constructor() {
    super();
    this.value = '';
    this.inputType = '';
    this.disabled = false;
    this.inputValue = '';
    this.textId = '';
  }

  static get styles(){
    return css`
    input {
      width: 100%;
      padding: 12px 50px 12px 15px;
      margin: 8px 0;
      box-sizing: border-box;
    }

    * {
        box-sizing: border-box;
      }
    `;
  }

  render() {
    return html
      `<input type="${this.inputType}" .value="${this.inputValue}" @input="${this.handleInput}" ?disabled="${this.disabled}" autofocus>`
    
      ;
  }

  private handleInput(event) {
    this.dispatchEvent(new CustomEvent('val-change', {
      detail: {
        value: event.composedPath()[0].value
      }
    })
    );
  }

  static get properties() {
    return {
      value: { type: String },
      inputType: { type: String },
      disabled: { type: Boolean },
      inputValue: { type: String },
      textId: { type: String}
    }
  }
}
