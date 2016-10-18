import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
const languages = [
'Hindi',
'English',
'Gujarati',
'Tamil',
'Malyalam',
'Telgu',
'Kannada',
'Punjabi',
'Bengali',
'Marathi',
'German',
'Assamese',
'Bodo',
'Dogri',
'Kashmiri',
'Konkani',
'Maithili',
'Manipuri',
'Nepali',
'Odia',
'Sanskrit',
'Santali',
'Sindhi',
'Urdu',
'Mundari',
'Khasi',
'Tulu',
'Kurukh',
'Khandeshi',
'Gondi',
'Bhili/Bhilodi',
];

const LanguageFilters = () => (
  <div className="SearchLang">
    <AutoComplete
      filter={AutoComplete.caseInsensitiveFilter}
      dataSource={languages}
      hintText="language"
      maxHeight= '200px'
    />
  </div>
);

export default LanguageFilters;
