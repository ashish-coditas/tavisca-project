import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('form-modal-button-component')
export class FormModalButtonComponent extends LitElement {
  buttonlabel: string;

  constructor() {
    super();
    this.buttonlabel = '';
  }

  static get styles(){
    return css`
    .Save , .Cancel , .Delete{
        background-color: #fff;
        color: black;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;
        margin: 0 5px;
        border: 1px solid darkgray;
      }
      .Save, .Delete{
        background-color: #4CAF50;
        color: #fff;
      }
    `;
  }

  render() {
    return html`
      <button class="${this.buttonlabel}" @click="${this._handleClick}">${this.buttonlabel}</button>
      <slot></slot>
    `;
  }

  static get properties() {
    return {
      buttonlabel: { type: String }
    };
  }

  _handleClick(e) {
    console.log('eeee');
  }
}
