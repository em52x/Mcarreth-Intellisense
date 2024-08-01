import React from 'react';
import { LiveCursorProps } from '../../types/type';
import Cursor from './Cursor';
import { COLORS } from '../../constants';

const LiveCursors = ({ others }: LiveCursorProps) => {
  // Verificar si others es un arreglo
  if (!Array.isArray(others)) {
    console.error('others is not an array:', others);
    return null;
  }

  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (!presence.cursor) return null;

        return (
          <Cursor
            key={connectionId}
            color={COLORS[Number(connectionId) % COLORS.length]}
            x={presence.cursor.x}
            y={presence.cursor.y}
            message={presence.message}
          />
        );
      })}
    </>
  );
};

export default LiveCursors;
