import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('my-input-component')
export class MyInputComponent extends LitElement {
  value: string;
  inputType: string;
  disabled: boolean;
  inputValue: string;

  constructor() {
    super();
    this.value = '';
    this.inputType = '';
    this.disabled = false;
    this.inputValue= '';
  }

  static get styles(){
    return css`
    input[type='text'],
    input[type='password'] {
        width: 100%;
        padding: 15px;
        margin: 5px 0 22px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }

    * {
        box-sizing: border-box;
      }
    `;
  }

  render() {
    return html`
    <input type="${this.inputType}" .value="${this.inputValue}" @input="${this.handleInput}" ?disabled="${this.disabled}" autofocus>
  `;
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
      inputValue: {type: String}
    }
  }
}
