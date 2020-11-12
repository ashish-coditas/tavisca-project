import { LitElement, html, css, property, customElement } from 'lit-element';
import '../assets/theme/dark.css';
import '../assets/theme/base.css';
import '../assets/theme/default.css';


@customElement('my-header-component')
export class MyHeaderComponent extends LitElement {
    headerText: string;

  constructor() {
      super();
      this.headerText = '';
  }

  static get styles(){
    return css`    
    :host{
      overflow: hidden;
      background-color: var(--header-background);
      padding: 20px 10px;
      color: #fff;
    }

    header {
      margin-right: auto;
    }
    `;
  }
    
  static get properties() {
    return {
        headerText: { type: String },
    };
  }

  render() {
    return html`
    <header>
    <a>${this.headerText}<a>
    </header>
    <slot></slot>
    `;
  }
}
