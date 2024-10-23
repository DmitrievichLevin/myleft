import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const SOCKET_URI = 'http://localhost:9021';

/**
 * @todo - Maybe add realtime?
 */
export default ({ id = null }) => {
  const client = useQueryClient();
  const [webSocketReady, setWebSocketReady] = useState(false);

  const [notif, setNotif] = useState(false);

  const webSocket = useMemo(() => {
    const socket = id ? new WebSocket(SOCKET_URI + `?id=${id}`) : undefined;

    if (socket) {
      socket.onopen = (event) => {
        setWebSocketReady(true);
      };

      socket.onmessage = function (event) {
        const dat = JSON.parse(event.data);
        // Check Sender
        // Invalidate Queries of non-patch-performers
        if (dat.from !== id) {
          if (dat.key === 'update_client') client.invalidateQueries();
          // Adds notif class pulser to sidebar icon
          document.getElementById('test-notif')?.classList.add('show');
        }
      };

      socket.onerror = function (err) {
        setWebSocketReady(false);
        socket.close();
      };
    }
    return socket;
  }, [id]);

  useEffect(() => {
    return () => {
      if (webSocket) webSocket.close();
    };
  }, [webSocket]);

  return { ready: webSocketReady };
};
