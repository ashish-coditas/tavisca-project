import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('my-button-component')
export class MyButtonComponent extends LitElement {
  buttonName: string;

  constructor() {
    super();
    this.buttonName = '';
  }

  static get styles(){
    return css`
    .Login , .Register {
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      margin: 1rem 1rem 0 7rem;
      border: none;
      cursor: pointer;
      width: 15%;
    }

    .Register{
      background-color: #2196F3;
    }

    .Cancel,  .Sign-up{
      color: white;
      padding: 16px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
      opacity: 0.9;
      background-color: #f44336;
    }

    .Sign-up{
      background-color: #4CAF50;
    }
    `;
  }

  render() {
    return html`
      <button class="${this.buttonName}" @click="${this._handleClick}">${this.buttonName}</button>
      <slot></slot>
    `;
  }

  static get properties() {
    return {
      buttonName: { type: String }
    };
  }

  _handleClick(e) {
    console.log('eeee', e);
  }
}
