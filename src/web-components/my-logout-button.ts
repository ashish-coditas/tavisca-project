import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('my-logout-button-component')
  
export class MyLogoutButtonComponent extends LitElement {

  constructor() {
    super();
  }

  static get styles(){
    return css`
    .logout{
      border: none;
        border-radius: 10px;
        font-size: 20px;
        cursor: pointer;
    }
    `;
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <button title="click to logout" class="logout" @click="${this.onLogout}" > <i class="fa fa-sign-out" ></i>
    </button>
  `;
  }

  static get properties() {
    return {
      
    }
  }

  onLogout() {
    console.log('here');
  }

  
}
