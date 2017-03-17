import React from 'react';
import Lists from './Lists';
import Diagram from './Diagram';

export default function Home(props) {
  const data = props.data;
  const macros = data.macros;
  const micros = data.micros;
  const notifs = data.notifs;

  return (
    <div id="home">
      <Diagram macros={macros} />
      <Lists macros={macros} micros={micros} notifs={notifs} />
    </div>
  );
}
