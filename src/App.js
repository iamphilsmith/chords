import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChordEditor from './components/ChordEditor';


class App extends Component {
  constructor() {
    super();
    this.updateSong = this.updateSong.bind(this);
    this.state = {
      songs: {
        "1": { id: 1, chordpro: "Lyrics for song 1." },
        "2": { id: 2, chordpro: "Lyrics for song 2." }
      }
    };
  }

  updateSong(song) {
    const songs = {...this.state.songs};
    songs[song.id] = song
    this.setState({songs});
  }

/*
  addSong(songName) {

  }

  handleRemoveClick = (e) => {
    console.log("remove: " + e.target.id);
    this.setState({
      songs: this.state.songs.filter(s => s.id !== e.target.id)
    })
  }

  handleSongNameChange = () => {

  }

  handleSongAdd = () => {

  }
*/
  render() {

    return (
      <div className="wrapper">
        <Header />
        <BrowserRouter>
          <div className="main-content">
            <div className="workspace">
            <Route exact path="/songs" render={(props) => {
              const songIds = Object.keys(this.state.songs);
              return (
                <div>
                <ul>
                  {songIds.map((id) => {
                    return (
                      <li key={id}>
                        <Link to={`/songs/${id}`}>Song {id}</Link>
                        //<button id={id} onClick={this.handleRemoveClick}>Remove {id}</button>
                      </li>
                    )
                  })}
                </ul>
                <input type='text' value="new song" onChange={this.handleSongNameChange} />
                //<button onClick={this.handleAddSong}>Add Song</button>
                </div>
              )
            }} />
              <Route path="/songs/:songId" render={(props) => {
                const song = this.state.songs[props.match.params.songId];
                return (
                  song
                  ? <ChordEditor song={song} updateSong={this.updateSong} />
                  : <h1>Song not found</h1>
                )
              }} />
            </div>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
