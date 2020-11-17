import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('my-select-box-component')
export class MySelectBoxComponent extends LitElement {
  options: any;
  selected: any;

  constructor() {
    super();
    this.options = [];
    this.selected = []
  }

  static get styles(){
    return css`
    
    
    `;
  }

  render() {
    return html`
    <select @change="${this.onChange}">
    ${this.options.map(option => html`
    <option value="${option.value}" ?selected=${this.selected === option.value}>${option.text}</option>
    `)}
    </select>
  `;
  }

  private onChange(event) {
    this.dispatchEvent(new CustomEvent('onChange', {
      detail: {
        value: event.composedPath()[0].value
      }
    })
    );
  }

  

  static get properties() {
    return {
      options: { type: Array },
      selected: { type: String },
      onChange: { type: Function }
    }
  }
}
