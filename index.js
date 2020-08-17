const searchButton = document.getElementById('search-btn')
const searchText = document.getElementById('search-txt');
const searchResult = document.getElementById('search-result');


/// api URL ///
const apiURL = 'https://api.lyrics.ovh';


/// adding event listener in form

searchButton.addEventListener('click', e => {
    e.preventDefault();
    let searchValue = searchText.value.trim()

    if (!searchValue) {
        alert("There is nothing to search")
    }
    else {
        searchSong(searchValue)
    }
})


//search song 
async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    // console.log(finaldata)
    showData(data)
}

//display final result in DO
function showData(data) {

    searchResult.innerHTML = `
    
      ${data.data.map(song => `
                <div class="single-result">
                        <div class="">
                            <h3 class="lyrics-name">Title : ${song.title}</h3>
                            <p class="author lead">Artist Name :<span>${song.artist.name}</span></p>
                        </div>
                        <div class="">
                            <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> <button
                            class="btn btn-success">Get Lyrics</button></span>
                        </div>
                </div>
            
            `)
            .join('')}
    
  `;
}




// event listener in get lyrics button
result.addEventListener('click', e => {
    const clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    searchResult.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
}