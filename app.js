const searchButton = document.getElementById('search-btn')
const searchText = document.getElementById('search-txt');
const searchResult = document.getElementById('search-result');
const songName = document.getElementById('song');
const artistName = document.getElementById('artist');
const singleLyrics = document.getElementById('single-lyrics');
const modalView = document.getElementById('modal');


searchButton.addEventListener("click", () => {
    if (!searchText.value) {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        modalView.innerHTML = `<h2>There is nothing to search</h2>`;
    }
    else {
        fetchValue(searchText.value);
    }

});

searchText.addEventListener("keypress", (event) => {
    if (event.keyCode == 13) {
        fetchValue(searchText.value);
    }
})

function fetchValue(search) {
    fetch(`https://api.lyrics.ovh/suggest/${search}`)
        .then(response => response.json())
        .then(data => showData(data))
}

function showData(data) {

    searchResult.innerHTML = `

          ${data.data.map(song => `
                        <div class="single-result row align-items-center my-3 p-3">
                        
                            <div class="col-md-9">
                                <h3 class="lyrics-name">Title : ${song.title}</h3>
                                <p class="author lead">Artist :<span> ${song.artist.name}</span></p>
                                <p class="author lead">Album Name:<span> ${song.album.title}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button data-artist="${song.artist.name}" data-songtitle="${song.title}" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>
                    `)
            .join('')}
`;
}


searchResult.addEventListener('click', btn => {
    if (btn.target.innerHTML === 'Get Lyrics') {
        const artist = btn.target.getAttribute("data-artist");
        const songTitle = btn.target.getAttribute("data-songtitle");
        getLyrics(artist, songTitle);
    }
})


// Get lyrics for song
async function getLyrics(artist, songTitle) {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics;
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modalView.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <br/> <pre>${lyrics}</pre>`;
    // singleLyrics.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <p>${lyrics}</p>`;
    // searchResult.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <p>${lyrics}</p>`;

}