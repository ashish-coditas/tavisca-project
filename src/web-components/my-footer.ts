import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('my-footer-component')
export class MyFooterComponent extends LitElement {
    name: string;
    link: string;
    author: string;

  constructor() {
      super();
      this.name = '';
      this.link = '';
      this.author = '';
  }

  static get styles(){
    return css`
    footer {
        text-align: center;
        color: #5f6368;
        background: var(--footer-background);
        line-height: 20px;
        border-top: 1px solid #e4e4e4;
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin-bottom: 0px;
      }
    `;
  }
    
  static get properties() {
    return {
        author: { type: String },
        name: { type: String },
        link: { type: String }
    };
  }

  render() {
    return html`
      <footer>
      <p>${this.author}: ${this.name}<br>
      <a href=${this.link}>${this.link}</a></p>
      </footer>
    `;
  }
}
