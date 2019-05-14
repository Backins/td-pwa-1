import { LitElement, html, css } from 'lit-element';

export default class AppCard extends LitElement {
  constructor() {
    super();
    this.title = "";
    this.id = "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }

      .card {
        position: relative;
        margin-bottom: 12px;
        overflow: hidden;
        border-radius: 5px;
        box-shadow: var(--app-header-shadow);
        margin: 1rem;
      }
      .card a {
        text-decoration: none;
      }
      
      .card main {
        padding: 1rem;
        background-color: var(--app-card-color);
      }
      
      .btn {
        display: inline-block;
        padding: 5px;
        color: black;
        text-decoration: none;
        background-color: #DFDFDF;
        border-radius: 2.5px;
        transition: background-color .2s;
      }
      .btn-red {
        background-color: red;
        color: white;
      }
        .btn-red:hover, .btn-red:active {
          background-color: darkred;
        }
      .btn-green {
        background-color: green;
        color: white;
      }
        .btn-green:hover, .btn-green:active {
          background-color: darkgreen;
        }
      /**
        * Persist animation using : animation-fill-mode set to forward 
        * @see https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
        */
      .fade {
        -webkit-animation: fadeout 2s forwards; /* Safari and Chrome */
        -moz-animation: fadeout 2s forwards; /* Firefox */
        -ms-animation: fadeout 2s forwards; /* Internet Explorer */
        -o-animation: fadeout 2s forwards; /* Opera */
        animation: fadeout 2s forwards;
      }

      @media (min-width: 600px) {

      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout. */
      @media (min-width: 460px) {
        .card {
          flex-basis: 21%;
          margin: 2%;
        }
        .card figure {
          min-height: 20vh;
          height: 20vh;
          overflow: hidden;
        }
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      src: { type: String },
      placeholder: { type: String },
    };
  }

  initCard(title, id) {
    this.title = title;
    this.id = id;
  }

  render() {
    return html`
      <article class="card">
        <main>
          <h1>${this.title}</h1>
          <a href="#" class="btn btn-red" data-target="${this.id}">Delete</a>
        </main>
      </article>
    `;
  }
}

customElements.define('app-card', AppCard);