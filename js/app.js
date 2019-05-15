import AppCard from '/js/components/card/card.js';
import { openDB } from 'idb';
import checkConnectivity from '/js/connection.js';

(async function(document) {
  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const listPage = app.querySelector('[page=list]');
  const btnSubmitCard = app.querySelector('#btn-submit-card');
  const inputSubmitCard = app.querySelector('#input-form');
  const textAreaSubmitCard = app.querySelector('#input-textarea');

  const jsonServerHost = "http://127.0.0.1:3000";

  checkConnectivity(3, 1000);
  
  document.addEventListener('connection-changed', ({ detail }) => {

  });
  skeleton.removeAttribute('active');
  listPage.setAttribute('active', '');

  try {
    btnSubmitCard.addEventListener('click', onClickAddCard);


    const data = await fetch('/db.json');
    const json = await data.json();
    const task = await json.task;
    let contentTaskToPost = '';

    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('articles');
      }
    });

    if (navigator.onLine) {
      await database.put('articles', task, 'articles');
    }

    const articles = await database.get('articles', 'articles');

    const cards = task.map(item => {
      const cardElement = new AppCard();
  
      cardElement.initCard(
          item.title,
          item.id,
          item.content,
          item.author,
      );

      listPage.appendChild(cardElement);

      return cardElement;
    });

    function onClickAddCard(){
        let idTask = uuidv4();
        let jsonTask = {
            "id": idTask,
            "title": inputSubmitCard.value,
            "content": textAreaSubmitCard.value,
            "author": "Admin"
        };
        contentTaskToPost = JSON.stringify(jsonTask);
        let cardElement = new AppCard();
        cardElement.initCard(inputSubmitCard.value, idTask, textAreaSubmitCard.value, "Admin");
        listPage.appendChild(cardElement);
        postTask(contentTaskToPost);
        addTaskToIDB(database, task.concat(jsonTask));
    }


    document.addEventListener('add-favorit', async e => {
      const updatedArticle = articles.map(article => {
        article.content.title === e.detail.article ? article.favoris = true : article.favoris = false;
        return article;
      });

      await database.put('articles', updatedArticle, 'articles');
    });

    const callback = function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
        }
      });
    };
  
    const io = new IntersectionObserver(callback);
  
    cards.forEach(card => {
      io.observe(card);
    });
  } catch (error) {
    console.error(error, ':(');
  }

  const addTaskToIDB = async function (database, task) {
      await database.put('articles', task, 'articles');
  };

  // Json server
  const getAllTasks = async function () {
      try {
          const response = await fetch(jsonServerHost+'/task');
          if (response.ok) {
              const jsonData = await response.json();
              console.log(jsonData);
          } else {
              console.error('server response : ' + response.status);
          }
      } catch (error) {
          console.error(error);
      }
  };

  const postTask = async function (task) {
      try {
          const response = await fetch(jsonServerHost+'/task', {
              method: "POST",
              body: task,
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const jsonData = await response.json();
              console.log(jsonData);
          } else {
              console.error('server response : ' + response.status);
          }
      } catch (error) {
          console.error(error);
      }
  };

  function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})(document);
