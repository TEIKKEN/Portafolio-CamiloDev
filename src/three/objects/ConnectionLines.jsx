import { useMemo } from 'react';
import ConnectionLine from './ConnectionLine';

function distance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function buildConnections(modules, maxDistance = 0.75, maxPerNode = 2) {
  const connections = [];
  for (let i = 0; i < modules.length; i++) {
    let count = 0;
    for (let j = i + 1; j < modules.length && count < maxPerNode; j++) {
      if (distance(modules[i].position, modules[j].position) < maxDistance) {
        connections.push([modules[i].position, modules[j].position]);
        count++;
      }
    }
  }
  return connections;
}

const ConnectionLines = ({ modules }) => {
  const connections = useMemo(() => buildConnections(modules), [modules]);

  return (
    <group>
      {connections.map(([start, end], i) => (
        <ConnectionLine key={i} start={start} end={end} />
      ))}
    </group>
  );
};

export default ConnectionLines;