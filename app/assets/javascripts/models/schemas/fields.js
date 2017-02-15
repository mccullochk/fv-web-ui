import t from 'tcomb-form';

import Dublincore from 'models/schemas/Dublincore';
import FVCore from 'models/schemas/FVCore';

const fields = {
  FVAudio: {
  	'aud-duration' : t.Number
  },
  FVWord: Object.assign({}, Dublincore, FVCore, {
    'fv-word:categories' : t.list(t.String),
    'fv-word:pronunciation' : t.String,
    'fv-word:related_phrases' : t.list(t.String),
    'fv-word:part_of_speech' : t.String
  }),
  FVPhrase: Object.assign({}, Dublincore, FVCore, {
    'fv:literal_translation' : t.maybe(t.String), // make optional
    'fv-phrase:phrase_books' : t.list(t.String)
  }),
  FVBook: Object.assign({}, Dublincore, FVCore, {
    'fv:definitions' : t.maybe(t.String), // make optional
    'fv:literal_translation' : t.maybe(t.String), // make optional
    'fvbook:title_literal_translation' : t.list(t.struct({
      'translation': t.String,
      'language': t.String
    })),
    'fvbook:introduction' : t.maybe(t.String),
    'fvbook:introduction_literal_translation' : t.maybe(t.list(t.struct({
      'translation': t.String,
      'language': t.String
    }))),
    'fvbook:author' : t.list(t.String),
    'fvbook:type' : t.String
  }),
  FVBookEntry: Object.assign({}, Dublincore, FVCore, {
    'fv:definitions' : t.maybe(t.String), // make optional
    'fv:available_in_childrens_archive' : t.maybe(t.String),
    'fv:literal_translation' : t.String,
    'fvbookentry:dominant_language_text' : t.list(t.struct({
      'translation': t.String,
      'language': t.String
    })),
    'fvbookentry:sort_map': t.Number
  }),
  FVPortal : {
    'fv-portal:greeting': t.String,
    'fv-portal:about': t.String,
    'fv-portal:featured_audio' : t.maybe(t.String),
    'fv-portal:featured_words' : t.list(t.String),
    'fv-portal:background_top_image' : t.String,
    'fv-portal:logo' : t.String
  },
  FVGallery: Object.assign({}, Dublincore, {
	'fv:related_pictures' : t.list(t.String)
  }),
  FVCategory: Object.assign({}, Dublincore, {
	'fvcategory:parent_category' : t.maybe(t.String), // make optional  
	'fvcategory:image' : t.maybe(t.String), // make optional
  }),
  FVContributor: Object.assign({}, Dublincore),   
  FVDialect: Object.assign({}, Dublincore, {
    'fvdialect:country' : t.String,
    'fvdialect:dominant_language' : t.String,
    'fvdialect:region' : t.String,
    'fvdialect:contact_information' : t.String
  }),
  FVCharacter: Object.assign({}, {
    'dc:title': t.String,
    'fvcharacter:upper_case_character': t.String,
    'fvcharacter:alphabet_order': t.Number,
    'fvcharacter:related_words' : t.list(t.String),
    'fv:related_audio' : t.list(t.String)
  })
}

export default fields;

// Sample usage with tcomb
// const FVPortal = t.struct(selectn('FVPortal', fields));