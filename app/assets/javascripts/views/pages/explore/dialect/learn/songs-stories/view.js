/*
Copyright 2016 First People's Cultural Council

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React, {Component, PropTypes} from 'react';
import Immutable, { List, Map } from 'immutable';
import classNames from 'classnames';
import provide from 'react-redux-provide';
import selectn from 'selectn';

import ConfGlobal from 'conf/local.json';

import ProviderHelpers from 'common/ProviderHelpers';
import PromiseWrapper from 'views/components/Document/PromiseWrapper';

import Paper from 'material-ui/lib/paper';

import RaisedButton from 'material-ui/lib/raised-button';

const DEFAULT_LANGUAGE = 'english';

/**
* View word entry
*/
@provide
export default class View extends Component {

  static propTypes = {
    properties: PropTypes.object.isRequired,
    windowPath: PropTypes.string.isRequired,
    splitWindowPath: PropTypes.array.isRequired,
    pushWindowPath: PropTypes.func.isRequired,
    fetchBook: PropTypes.func.isRequired,
    computeBook: PropTypes.object.isRequired,
    fetchBookEntries: PropTypes.func.isRequired,
    computeBookEntries: PropTypes.object.isRequired,
    book: PropTypes.object,
    routeParams: PropTypes.object
  };

  constructor(props, context){
    super(props, context);

    this.state = {
      book: null,
      bookPath: null,
      children: null
    };

    // Bind methods to 'this'
    ['_onNavigateRequest'].forEach( (method => this[method] = this[method].bind(this)) );
  }

  fetchData(newProps) {

    let entryPath = newProps.routeParams.dialect_path + '/Stories & Songs/' + newProps.routeParams.bookName;

    this.setState({
      bookPath: entryPath
    });

    newProps.fetchBook(entryPath);
    newProps.fetchBookEntries(newProps.routeParams.dialect_path);
  }

  // Fetch data on initial render
  componentDidMount() {
    this.fetchData(this.props);
  }

  _onNavigateRequest(path) {
    this.props.pushWindowPath(path);
  }

  render() {

    const computeEntities = Immutable.fromJS([{
      'id': this.state.bookPath,
      'entity': this.props.computeBook
    },{
      'id': this.props.routeParams.dialect_path,
      'entity': this.props.computeBookEntries
    }])

    const computeBook = ProviderHelpers.getEntry(this.props.computeBook, this.state.bookPath);
    const computeBookEntries = ProviderHelpers.getEntry(this.props.computeBookEntries, this.props.routeParams.dialect_path);

    return <PromiseWrapper computeEntities={computeEntities}>
              <div className="row">
                <div className="col-xs-8">
                </div>
                <div className={classNames('col-xs-4', 'text-right')}>
                  <RaisedButton label="New Entry" onTouchTap={this._onNavigateRequest.bind(this, this.props.windowPath + '/create')} primary={true} />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">

                  <h1>{selectn('response.title', computeBook)}</h1>

                  {(selectn('response.entries', computeBookEntries) || []).map((tile, tileKey) => 

                    <div className="row" style={{marginBottom: '20px'}}>

                      <div className="col-xs-12">

                      	<Paper style={{padding: '15px', margin: '20px 0'}} zDepth={2}>

		                    <div className="row" style={{marginBottom: '20px'}}>

		                      <div className="col-xs-2">
		                      	{(() => {
		                      		return (selectn('properties.fv:related_pictures[0]', tile)) ? <img className="pull-left" style={{maxWidth: '300px', width: 'auto'}} src={ConfGlobal.baseURL + 'nxfile/default/' + selectn('properties.fv:related_pictures[0]', tile) + '?inline=true'} /> : ''
		                      	})()}
		                      </div>

		                      <div className="col-xs-10">
		                      	<p>
		                      		
		                      		{selectn('title', tile) || ''}<br/>

							                {selectn('properties.fvbookentry:dominant_language_text', tile).map(function(translation, i) {
		                              if (translation.language == DEFAULT_LANGUAGE) {
		                                return <span key={i}>
		                                  {translation.translation}
		                                </span>;
		                              }
	                            })}

							                {selectn('properties.fv:literal_translation', tile).map(function(translation, i) {
		                              if (translation.language == DEFAULT_LANGUAGE) {
		                                return <span key={i}>
		                                  {translation.translation}
		                                </span>;
		                              }
	                            })}

			                      	{(() => {
			                      		return (selectn('properties.fv:related_audio[0]', tile)) ? <audio src={ConfGlobal.baseURL + 'nxfile/default/' + selectn('properties.fv:related_audio[0]', tile) + '?inline=true'} controls /> : ''
			                      	})()}

		                      	</p>
		                      </div>

		                    </div>

                        </Paper>
                      </div>
                    </div>
                  )}

                </div>
              </div>
        </PromiseWrapper>;
  }
}
