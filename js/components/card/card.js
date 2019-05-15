import { LitElement, html, css } from 'lit-element';

export default class AppCard extends LitElement {
  constructor() {
    super();
    this.title = "";
    this.id = "";
    this.content = "";
    this.author = "";
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
        border: 1px solid transparent;
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
      content: { type: String },
      id: { type: String },
      author: { type: String },
    };
  }

  initCard(title, id, content, author) {
    this.title = title;
    this.id = id;
    this.content = content;
    this.author = author;
  }

  deleteCard()
  {
    let requestHeader = new Headers();

    let initFetch = {
        method: "DELETE",
        headers: requestHeader,
        mode: "cors"
    };
    fetch(`http://127.0.0.1:3000/task/${this.id}`,initFetch)
        .then(function(response) {
            return response.blob();
        });

    this.remove();
    return false;
  }

  render() {
    return html`
      <article class="card">
        <main>
          <h1>${this.title}</h1>
          <p>${this.content}</p>
          <p>Author : ${this.author}</p>
          <button class="btn btn-red" @click=${this.deleteCard} data-target="${this.id}">Delete</button>
        </main>
      </article>
    `;
  }
}

customElements.define('app-card', AppCard);