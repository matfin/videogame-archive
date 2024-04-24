import React from 'react';

import { GlobalStyle } from '@styles/global';
import Games from '@views/games';

const App = (): React.ReactElement => {
  return (
    <>
      <Games />
      <GlobalStyle />
    </>
  );
};

export default App;
