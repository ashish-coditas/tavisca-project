import { LitElement, html, css , property , customElement} from 'lit-element';

@customElement('my-toggle-component')
export class MyToggleButtonComponent extends LitElement {

  constructor() {
      super();
  }

  static get styles(){
    return css`
    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 25px;
    }
    
    .switch input { 
      opacity: 1;
      width: 33px;
      height: 20px;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: #2196F3;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 3px black;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(15px);
      -ms-transform: translateX(15px);
      transform: translateX(15px);
    }
    
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      border-radius: 50%;
    }

    .header-right {
      float: right;
      display: flex;
    }
    
    `;
  }

  render() {
    return html`
      <label class="switch" for="dark" title="Enable dark theme">
        <input type="checkbox" name="dark" id="dark" tabindex=0 @change="${this.handleInput}">
        <span class="slider round"></span>
      </label>
  `;
  }

  private handleInput(event) {
    this.dispatchEvent(new CustomEvent('isToggle', {
      detail: {
        value: event.composedPath()[0].checked
      }
    })
    );
  }

  

  static get properties() {
    return {
    }
  }
}
