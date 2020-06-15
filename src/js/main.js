'use strict';


if (localStorage.filmList) {
    console.dir(JSON.parse(localStorage.getItem('filmList')));
    console.log(JSON.parse(localStorage.getItem('filmList')));
    document.querySelector('#allFilms')
        .addEventListener('click', () => {
            window.location.hash = '#list';
            //добавление обёртки для списка фильмов
            const newDiv = '<div id="wrapFilms" class="d-flex flex-wrap justify-content-around align-items-start align-content-start"></div>';
            content.insertAdjacentHTML("afterbegin", newDiv);

            //отрисовка страницы со списком фильмов
            fetch('./card.html')
                .then(res => res.text())
                .then(data => {
                    JSON.parse(localStorage.getItem('filmList'))
                    .forEach(element => {
                        const dataFilm = {
                            id: element.id,
                            title: element.title,
                            description: element.description,
                            rating: element.rating,
                            //imgPoster:element.imgPoster
                        }
                        const tplFilms = data;
                        const listOfFilms = template(dataFilm, tplFilms);
                        wrapFilms.insertAdjacentHTML("afterbegin", listOfFilms);
                        
                        if (document.querySelector('#wrapFilm')) {

                            document.querySelector('#wrapFilm').remove();
                        };
                        
                        if (document.querySelector('#search-none')) {

                            document.querySelector('#search-none').remove();
                        };

                        if (document.querySelector('#searchMatches')) {

                            document.querySelector('#searchMatches').remove();
                        };
                            
                    });
                    
                    //редактирование и удаление карточки фильма

                    document.querySelectorAll('[id^="edit-film_id_"]')
                                   .forEach((el) => {
                                        fetch('./add-new.html')
                                            .then(res => res.text())
                                            .then(data => {
                                                content.insertAdjacentHTML("afterbegin", data);
                                                 
                                                const strId=el.id.slice(5);
                                                const obj = JSON.parse(localStorage.getItem(`${strId}`));
                                                   
                                                            el.addEventListener('click',(e)=>{

                                                                
                                                                if (strId === obj.id) {

                                                                    document.getElementById('film_title').setAttribute('value',`${obj.title}`)
                                                                    document.getElementById('film_title_origin').setAttribute('value',`${obj.title_origin}`);
                                                                    document.getElementById('film_description').innerHTML=`${obj.description}`;
                                                                    document.getElementById('film_rating').setAttribute('value',`${obj.rating}`);
                                                                    //document.getElementById('film_imgPoster').innerHTML=`${filmObj.imgPoster}`;
                                                                    document.getElementById('film_year').setAttribute('value',`${obj.year}`);
                                                                    document.getElementById('film_country').setAttribute('value',`${obj.country}`);
                      
                                                                    document.getElementById('film_tagline').setAttribute('value',`${obj.tagline}`);
                                                                    document.getElementById('film_director').setAttribute('value',`${obj.director}`);
                                                                    document.getElementById('film_cast').innerHTML=`${obj.cast}`;
                                                                    document.getElementById('film_rating').setAttribute('value',`${obj.rating}`);
                                                                    console.log(document.getElementById('film_title'));
                                                                    console.log(obj);
                                                                }
                                                                
                                                                $('#add_modal').modal({

                                                                    keyboard: false

                                                                });

                                                            document.querySelector('#modal_close')
                                                                .addEventListener('click', () => {
                                                                    
                                                                    $('#add_modal').modal('hide');
                                                                });

                                                            document.querySelector('#modal_dismiss')
                                                                .addEventListener('click', () => {
                                                                    
                                                                    $('#add_modal').modal('hide');
                                                                });

                                                            document.getElementById("film_save").type = "submit";
                                                
                                                            document.forms.filmForm.addEventListener('submit', (e) => {
                                                                e.preventDefault();

                                                                const film_list = JSON.parse(localStorage.filmList);

                                                                const title = e.target.elements.film_title.value;
                                                                const title_origin = e.target.elements.film_title_origin.value;
                                                                const imgPoster = e.target.elements.upload_poster.value;
                                                                const year = e.target.elements.film_year.value;
                                                                const country = e.target.elements.film_country.value;
                                                                const tagline = e.target.elements.film_tagline.value;
                                                                const director = e.target.elements.film_director.value;
                                                                const cast = e.target.elements.film_cast.value;
                                                                const rating = e.target.elements.film_rating.value;
                                                                const description = e.target.elements.film_description.value;
                                                                const id = `${strId}`;

                                                                if ( film_list.id===`${strId}`) {
                                                                    film_list.push({
                                                                        id,
                                                                        title,
                                                                        title_origin,
                                                                        imgPoster,
                                                                        year,
                                                                        country,
                                                                        tagline,
                                                                        director,
                                                                        cast,
                                                                        rating,
                                                                        description
                                                                    });
                
                                                                    localStorage.setItem(`${strId}`, JSON.stringify({
                                                                        id,
                                                                        title,
                                                                        title_origin,
                                                                        imgPoster,
                                                                        year,
                                                                        country,
                                                                        tagline,
                                                                        director,
                                                                        cast,
                                                                        rating,
                                                                        description
                                                                    }));
                                                                }                                                  

                                                                localStorage.filmList = JSON.stringify(film_list);
                                                                $('#add_modal').modal('hide');
                                                            });

                                            });
                                            document.querySelectorAll('[id^="del-film_id_"]').forEach((el) =>{
                                                el.addEventListener('click', (e) => {
                                                  console.log ('rrr');
                                                  let remove = confirm("Выдействительно хотите удалить фильм?");
                                                  alert( remove );

                                                  if (confirm) {
                                                      film_list.filter((e) => {
                                                         return e.id != `${strId}`;
                                                      });
                                                      
                                                      localStorage.removeItem(`${strId}`,);
                                                  } 

                                                });         
                                    });
                               });
                           });
                                                     
                    
                    // отрисовка и вывод страницы фильма
                    const listFilms = document.querySelectorAll('main div a[href^="#list-film_id_"]')
                        .forEach((el) => {
                            el.addEventListener('click', () => {
                
                                    const strHash = '' + el.hash;
                                    fetch('./movie.html')
                                        .then(res => res.text())
                                        .then(data => {
                                            const idFilm = strHash.slice(6);
                                            const filmObj = JSON.parse(localStorage.getItem(`${idFilm}`));
                                            const dataFilm = {
                                                id: filmObj.id,
                                                title: filmObj.title,
                                                title_origin: filmObj.title_origin,
                                                description: filmObj.description,
                                                rating: filmObj.rating,
                                                //imgPoster:filmObj.imgPoster
                                                year: filmObj.year,
                                                country: filmObj.country,
                                                tagline: filmObj.tagline,
                                                director: filmObj.director,
                                                cast: filmObj.cast.split(','),
                                                rating: filmObj.cast,
                                            }
                                            let out = "";
                                            dataFilm.cast.forEach(function (item) {
                                                out += `<li>${item}</li>`;
                                                return out += out;
                                            });

                                            //добавление обёртки для фильмa
                                            const newDivFilm = document.createElement('div');
                                            newDivFilm.className = 'd-flex flex-wrap justify-content-around align-items-start align-content-start';
                                            newDivFilm.setAttribute('id', 'wrapFilm');
                                            content.append(newDivFilm);

                                            const tplFilm = data;
                                            const film = template(dataFilm, tplFilm);
                                            newDivFilm.insertAdjacentHTML("afterbegin", film);
                                            document.querySelector('.list-unstyled').innerHTML = out;


                                            if (document.querySelector('#wrapFilms')) {

                                                document.querySelector('#wrapFilms').remove();
                                            };

                                            
                                            if (document.querySelector('#search-none')) {
                    
                                                document.querySelector('#search-none').remove();
                                            };

                                            if (document.querySelector('#searchMatches')) {

                                                document.querySelector('#searchMatches').remove();
                                            };

                                            document.querySelector('#like')
                                                .addEventListener('click',(e)=>{

                                                    e.currentTarget.dataset.count=+e.currentTarget.dataset.count+1;
                                                });
                                            document.querySelector('#dislike')
                                                .addEventListener('click',(e)=>{

                                                    e.currentTarget.dataset.count++;
                                                });

                                        })
                            
                            })
                        })
                });
        });    
//поиск
    const allFilmsList = JSON.parse(localStorage.getItem('filmList'));


    document.forms.search
        .addEventListener('submit', (e) => {


            e.preventDefault();
            window.location.hash = '#search-list';

            const query = document.querySelector('#search input').value.toLowerCase();
            let newAllFilmsList = [];


            newAllFilmsList = allFilmsList.filter(e => {
                
                return `${e.title + e.description}`.toLowerCase().indexOf(query) != -1

            });

            if (!newAllFilmsList.length) {

                content.innerHTML = '<div id="search-none">No matches!:-(</div>';
            };

            fetch('./card.html')
                .then(res => res.text())
                .then(data => {
                    newAllFilmsList.forEach(element => {
                        const dataFilm = {
                            id: element.id,
                            title: element.title,
                            description: element.description,
                            rating: element.rating,
                            //imgPoster:element.imgPoster
                        }
                        const tplFilms = data;
                        const searchList = template(dataFilm, tplFilms);

                        if (document.querySelector('#wrapFilm')) {

                            document.querySelector('#wrapFilm').remove();
                        }
                        if (document.querySelector('#wrapFilms')) {

                            document.querySelector('#wrapFilms').remove();
                        }
                        

                        const prevDivFilm = document.createElement('div');
                        prevDivFilm.className = 'd-flex flex-wrap justify-content-around align-items-start align-content-start';
                        prevDivFilm.setAttribute('id', 'searchMatches');
                        content.append(prevDivFilm);
                        searchMatches.insertAdjacentHTML("afterbegin", searchList);
                        
                    });
                });
        });

    }
    //вызов модального окна и отправка данных в localStorage
    document.querySelector('#add_new')
        .addEventListener('click', () => {
        
            fetch('./add-new.html')
                .then(res => res.text())
                .then(data => {
                    content.insertAdjacentHTML("afterbegin", data);

                    $('#add_modal').modal({
                        keyboard: false
                    });


                    document.querySelector('#modal_close')
                        .addEventListener('click', () => {
                            const delModal = document.querySelector('#add_modal');
                            delModal.remove();
                        });

                    document.querySelector('#modal_dismiss')
                        .addEventListener('click', () => {
                            const delModal = document.querySelector('#add_modal');
                            delModal.remove();
                        });

                        //document.getElementById('load')
                        //   .addEventListener('click', () => {
                        //    function previewFile() {
                        //        var preview = document.querySelector('img');
                        //        var file    = document.querySelector('input[type=file]').files[0];
                        //         var reader  = new FileReader();
                        //       
                        //         reader.onloadend = function () {
                        //           preview.src = reader.result;
                        //         }
                        //       
                        //           reader.readAsDataURL(file);
                        //          } else {
                        //            preview.src = "";
                        //          }
                        //        }
                        //     })   

                    document.getElementById("film_save").type = "submit";

                    document.forms.filmForm.addEventListener('submit', (e) => {
                        e.preventDefault();

                        const film_list = localStorage.filmList ?
                            JSON.parse(localStorage.filmList) : [];

                        const title = e.target.elements.film_title.value;
                        const title_origin = e.target.elements.film_title_origin.value;
                        const imgPoster = e.target.elements.upload_poster.value;
                        const year = e.target.elements.film_year.value;
                        const country = e.target.elements.film_country.value;
                        const tagline = e.target.elements.film_tagline.value;
                        const director = e.target.elements.film_director.value;
                        const cast = e.target.elements.film_cast.value;
                        const rating = e.target.elements.film_rating.value;
                        const description = e.target.elements.film_description.value;

                        const id = `film_id_${Date.now()}`;

                        film_list.push({
                            id,
                            title,
                            title_origin,
                            imgPoster,
                            year,
                            country,
                            tagline,
                            director,
                            cast,
                            rating,
                            description
                        });

                        localStorage.setItem(id, JSON.stringify({
                            id,
                            title,
                            title_origin,
                            imgPoster,
                            year,
                            country,
                            tagline,
                            director,
                            cast,
                            rating,
                            description
                        }));

                        localStorage.filmList = JSON.stringify(film_list);
                        $('#add_modal').modal('hide');

                        document.querySelector('#add_modal').remove();

                    });

                })
        })


//"routing"
window.addEventListener('hashchange',(e)=>{

    if (window.location.hash) {

       if (document.querySelector('main h1')) {

            document.querySelector('main h1').remove();

        };
    };

});

//шаблоны функций

function template(data, tpl) {
    const f = (strings, ...values) => strings.reduce((res, item, index) => {
        return index === strings.length - 1 ?
            res += `${item}` :
            res += `${item}${data[values[index]]}`;
    }, '');
    return eval('f`' + tpl + '`');
}
