import React from 'react';

const Tabs = require('react-simpletabs');

export default function Lists(props) {
  let macros = [];
  let micros = [];
  let notifs = [];

  // Generate the nutrition lists
  for (const entry in props.macros) {
    const info = props.macros[entry];
    macros.push(<li>{info.name}: {info.quantity}</li>);
  }

  for (const entry in props.micros) {
    const info = props.micros[entry];
    micros.push(<li>{info.name}: {info.quantity}</li>);
  }

  for (const entry in props.notifs) {
    const info = props.notifs[entry];
    notifs.push(<li>{info}</li>);
  }

  return (
    <Tabs>
      <Tabs.Panel title="Macros">
        <ul>
          {macros}
        </ul>
      </Tabs.Panel>
      <Tabs.Panel title="Micros">
        <ul>
          {micros}
        </ul>
      </Tabs.Panel>
      <Tabs.Panel title="Notifications">
        <ul>
          {notifs}
        </ul>
      </Tabs.Panel>
    </Tabs>
  );
}
