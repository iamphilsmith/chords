import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';

class ChordEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const song = {...this.props.song};
    song.chordpro = e.target.value;
    this.props.updateSong(song);
  }

  getChordMarkup(s) {
    let formatter = new ChordSheetJS.HtmlFormatter(),
    parser = new ChordSheetJS.ChordProParser(),
    song = parser.parse(s.chordpro);

    return { __html: formatter.format(song) };
  }

  render() {
    return (
      <div className="chord-editor">
        <div className="panel">
          <h3>Input</h3>
          <textarea
            style={{width: "100%", height: "100%"}}
            onChange={this.handleChange}
            defaultValue={this.props.song.chordpro} />

        </div>
        <div className="panel">
          <h3>Output</h3>
          <div
            style={{width: "100%", height: "100%", fontFamily: "monospace"}}
            className="chord-output"
            dangerouslySetInnerHTML={this.getChordMarkup(this.props.song)} />
        </div>
      </div>
    );
  }
}

export default ChordEditor;
