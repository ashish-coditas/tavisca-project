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
    .Save , .Cancel , .Delete ,.Annuler, .sauvegarder , .Effacer{
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
      .Save, .Delete ,.sauvegarder , .Effacer{
        background-color: #4CAF50;
        color: #fff;
      }

      .Save:hover , .sauvegarder:hover, .Save:focus , .sauvegarder:focus{
        background-color: #0495c9;
      }

      .Delete:hover , .Annuler:hover, .Delete:focus , .Annuler:focus {
        background-color: red;
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
